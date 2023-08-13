const express = require('express')

const {
  login,
  register,
  renewToken,
} = require('../controllers/auth.controller')
const { checkLogin, checkRegister } = require('../middlewares/auth-validations')
const { revalidateJWT } = require('../middlewares/revalidate-jwt')

const router = express.Router()

router.route('/login').post(checkLogin, login)
router.route('/register').post(checkRegister, register)
router.route('/renew').get(revalidateJWT, renewToken)

module.exports = router
