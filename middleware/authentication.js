

const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // throw new UnauthenticatedError('Invaild credentials...!')
    return res.status(400).json({
     message:"Invaild credentials...!"
    })
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, "ratnakiran123")
    // attach the user to the job routes
    req.user = { userId: payload.id}
    next()
  } catch (error) {
    // throw new UnauthenticatedError('Authentication invalid')
    return res.status(400).json({      
      message:"Invaild credentials...!"
    })
  }
}




module.exports = auth
