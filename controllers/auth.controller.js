const bcrypt = require('bcryptjs')
const User = require('../models/user.model')
const { generateJWT } = require('../helpers/jwt')

const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({
        status: 'error',
        message: 'User or password incorrect',
      })
    }
    const token = await generateJWT(user.id)
    res.status(200).json({
      status: 'success',
      message: 'User logged in',
      data: {
        uid: user.id,
        name: user.name,
        token,
      },
    })
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'User not logged in',
    })
  }
}

const register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = new User({ name, email, password })
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    await user.save()
    const token = await generateJWT(user.id)
    res.status(201).json({
      status: 'success',
      message: 'User registered',
      data: {
        uid: user.id,
        name: user.name,
        token,
      },
    })
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      message: 'User not registered',
    })
  }
}

const renewToken = async (req, res) => {
  const { uid, name } = req
  const token = await generateJWT(uid)
  res.status(200).json({
    status: 'success',
    message: 'Token renewed',
    data: {
      uid,
      name,
      token,
    },
  })
}

module.exports = { login, register, renewToken }
