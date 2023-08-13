const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')

const checkLogin = [
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must be 6 characters or more').isLength({
    min: 6,
  }),
  validateFields,
]

const checkRegister = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email is required').isEmail(),
  check('password', 'Password must be 6 characters or more').isLength({
    min: 6,
  }),
  validateFields,
]

module.exports = { checkLogin, checkRegister }
