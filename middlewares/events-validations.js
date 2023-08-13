const { check } = require('express-validator')
const { isDate } = require('../helpers/events')
const { validateFields } = require('../middlewares/validate-fields')

const checkEvent = [
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'Start date is required').custom(isDate),
  check('end', 'End date is required').custom(isDate),
  validateFields,
]

module.exports = { checkEvent }
