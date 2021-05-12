import { Router } from "express";
import axios from 'axios'

import { requiredField } from "../middlewares/middleware.js";
import { catchAsync } from "../middlewares/errors.js";

const router = Router()

router.route('/')
  .get(catchAsync(async (req, res) => {

    const info = await axios.get(process.env.WEBHOOK_URL)

    res.json({
      method: 'POST',
      default: {
        message: '',
        username: process.env.DEFAULT_USERNAME || info.data.name,
        avatar_url: process.env.DEFAULT_AVATAR_IMG || info.data.avatar
      }
    })

  }))

  .post(requiredField, catchAsync(async (req, res) => {

    const {
      message,
      username = process.env.DEFAULT_USERNAME,
      avatar_url = process.env.DEFAULT_AVATAR_IMG
    } = req.body

    const data = {
      content: message,
      username: username,
      avatar_url: avatar_url,
    }

    await axios.post(process.env.WEBHOOK_URL, data)

    return res.status(200).json({ success: true })

  }))

export { router as sendRouter }