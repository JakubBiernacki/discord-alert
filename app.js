import express from 'express';
import cors from 'cors'
import 'dotenv/config';

import { notFound, catchErrors } from "./middlewares/errors.js";

import { sendRouter } from './routers/sendRoute.js'
import { infoRouter } from './routers/infoRoute.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use('/send', sendRouter)
app.use('/info', infoRouter)


app.use(notFound)
app.use(catchErrors)

export default app