import app from "./app.js";
import { existsSync } from "fs";
import axios from 'axios'

const port = process.env.PORT || 5000



if (!process.env.WEBHOOK_URL) {
  const message = existsSync('.env') ? 'Uzupełnij plik .env' : 'Utwórz plik .env'
  console.error(message);

} else {

  axios.get(process.env.WEBHOOK_URL)
    .then(() => {
      
      app.listen(port, () => {
        console.log(`listening on port ${port}`);
      })

    })
    .catch((err) => console.error('.env WEBHOOK_URL jest niepoprawny', err))

}