const jwt = require('jsonwebtoken')

const revalidateJWT = async (req, res, next) => {
  const token = req.header('x-token')
  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'No token provided',
    })
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = uid
    req.name = name
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token',
    })
  }
  next()
}

module.exports = { revalidateJWT }
