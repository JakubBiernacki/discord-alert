# Discord-alert
Api napisane w Express.js służące do wysyłania wiadomości na kanał tekstowy serwera discord
## Wymagania
- Node.js(14<)
- npm(6<)
## Instalacja

```bash
$ npm i
```
## Konfiguracja
### utwórz discord webhook
1. W Discord przejdź do serwera i wybierz kanał tekstowy.
2. Edytuj kanał > Integracje > Webhooki > Nowy webhook.
3. Nadaj nazwę botowi i prześlij obraz.
4. Skopiuj adres URL elementu webhook do zasobnika.
5. Kliknij opcję Zapisz.
### ustawienia serwera
Utwórz plik `.env` w głównym katalogu projektu i uzupełnij go zgodnie ze wzorem z pliku `.env_example`

## Uruchomienie
```bash
# development
$ npm start

# watch mode
$ npm i -g nodemon
$ npm run start-dev
```
## Użytkowanie
GET `.../info/` - informacje o webhooku<br />
GET `.../send/` - informacje o domyślnych wartościach<br />
POST `.../send/` - wysyłanie wiadomości<br />
