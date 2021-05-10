import express from 'express';
import 'dotenv/config';

import { sendRouter } from './routers/sendRoute.js'
import { infoRouter } from './routers/infoRoute.js'

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/send', sendRouter)
app.use('/info', infoRouter)

app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' })
})

export default app