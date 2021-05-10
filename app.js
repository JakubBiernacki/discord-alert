import express from 'express';
import axios from 'axios'
import 'dotenv/config';

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.post('/send', async (req, res) => {

  const { message, username = 'webhook', avatar_url = process.env.DEFAULT_IMG} = req.body

  if(!message){
    const requiredField = {
      message: 'required',
      username: 'optional',
      avatar_url: 'optional'
      
    }
    return res.status(400).json(requiredField)
  }
  const data = {
    content: message,
    username: username,
    avatar_url: avatar_url,
  }
  
  try{
    await axios.post(process.env.WEBHOOK_URL, data)

    return res.status(200).json({success: true})

  } catch(err) {
    
    return res.status(err.response.status).json(err.response.data)
  }

})

app.use('*', (req, res) => {
  res.status(404).json({ error: 'not found' })
})

export default app