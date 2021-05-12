const notFound = (req, res, next) => {
  const err = new Error('not found')
  err.status = 404
  next(err)
}

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(err => next(err))
  }
}

const catchErrors = (err, req, res, next) => {
  
  res.status(err.status || err.response.status || 500)
  .json({error: err.message})
  
}
  

export { notFound, catchAsync, catchErrors }