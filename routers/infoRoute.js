import { Router } from "express";
import axios from 'axios'

const router = Router()

router.route('/')
  .get(async (req, res) => {
    try {
      const info = await axios.get(process.env.WEBHOOK_URL)
      res.status(info.status).json(info.data)

    } catch (error) {
      res.status(error.response.status).json(error.response.data)
    }
  })

export { router as infoRouter }