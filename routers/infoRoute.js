import { Router } from "express";
import axios from 'axios'

import { catchAsync } from "../middlewares/errors.js";

const router = Router()

router.route('/')
  .get(catchAsync(async (req, res) => {

    const info = await axios.get(process.env.WEBHOOK_URL)

    res.status(info.status).json(info.data)

  }))

export { router as infoRouter }