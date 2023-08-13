const { isValidObjectId } = require('mongoose')

const validateObjectId = (id, res) => {
  if (!isValidObjectId(id)) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid id',
    })
  }
}

const handleNotFoundError = (entity, res) => {
  res.status(404).json({
    status: 'error',
    message: `${entity} not found`,
  })
}

const handleUnauthorizedError = (res) => {
  res.status(401).json({
    status: 'error',
    message: 'Unauthorized',
  })
}

const handleServerError = (res) => {
  res.status(500).json({
    status: 'error',
    message: 'An error occurred while processing your request',
  })
}

module.exports = {
  validateObjectId,
  handleNotFoundError,
  handleUnauthorizedError,
  handleServerError,
}
