const express = require('express')
const { revalidateJWT } = require('../middlewares/revalidate-jwt')
const {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/events.controller')
const { checkEvent } = require('../middlewares/events-validations')

const router = express.Router()

router.use(revalidateJWT)

router.route('/').get(getEvents).post(checkEvent, createEvent)
router.route('/:id').get(getEvent).put(updateEvent).delete(deleteEvent)

module.exports = router
