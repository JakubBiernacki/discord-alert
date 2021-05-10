import { Router } from "express";
import axios from 'axios'

const router = Router()

const requiredField = (req, res, next) => {
  if (!req.body.message) {
    const requiredField = {
      message: 'required',
      username: 'optional',
      avatar_url: 'optional'

    }
    return res.status(400).json(requiredField)
  }
  next()
}

router.route('/')
  .get(async(req, res) => {
    try {
      const info = await axios.get(process.env.WEBHOOK_URL)
      
      res.json({
        method: 'POST',
        default: {
          message: '',
          username: process.env.DEFAULT_USERNAME || info.data.name,
          avatar_url: process.env.DEFAULT_AVATAR_IMG || info.data.avatar
      }
      })

    } catch (error) {
      res.status(error.status).json(error.data)
    }
    
    

  })

  .post(requiredField, async (req, res) => {

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

    try {
      await axios.post(process.env.WEBHOOK_URL, data)

      return res.status(200).json({ success: true })

    } catch (err) {
      return res.status(err.response.status).json(err.response.data)
    }

  })

export { router as sendRouter }