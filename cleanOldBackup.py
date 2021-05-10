import os
import time
import argparse
import shutil
import requests

url = 'http://localhost:5000/send'
free_size_alert = 10  # GB
max_day = 8

parser = argparse.ArgumentParser(description="add path")
parser.add_argument("--path", required=True)

path = str(parser.parse_args()).split("'")[1]

now = time.time()

live_time = now - (max_day * 84600)

dirs = os.listdir(path)

for one_dir in dirs:
    dir_path = os.path.join(path, one_dir)

    if not os.path.isdir(dir_path):
        continue

    dir_created = os.stat(dir_path).st_mtime
    if dir_created < live_time:
        shutil.rmtree(dir_path)

total, used, free = shutil.disk_usage(path)

if (free / (2 ** 30)) <= free_size_alert:
    data = {
        'username': 'DeleteOldBackup',
        'message': f''':exclamation:Alert: Na dysku kończy sie miejsce:exclamation: 

      :warning: Free size alert: {free_size_alert} GiB
      
      :floppy_disk: Disk info:  
                  Total: {(total // (2 ** 30))} GiB
                  Used: {(used // (2 ** 30))} GiB
                  Free: {(free // (2 ** 30))} GiB'''
    }

    requests.post(url, json=data)
