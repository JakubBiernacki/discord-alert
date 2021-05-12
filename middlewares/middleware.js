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

export { requiredField }