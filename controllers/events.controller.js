const Event = require('../models/event.model')
const {
  validateObjectId,
  handleNotFoundError,
  handleUnauthorizedError,
  handleServerError,
} = require('../helpers')

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('user', 'name')
    res.status(200).json({
      status: 'success',
      events,
    })
  } catch (error) {
    return handleServerError(res)
  }
}

const getEvent = async (req, res) => {
  const { id } = req.params
  if (validateObjectId(id, res)) return
  try {
    const event = await Event.findById(id).populate('user', 'name')
    if (!event) return handleNotFoundError('Event', res)
    res.status(200).json({
      status: 'success',
      event,
    })
  } catch (error) {
    return handleServerError(res)
  }
}

const createEvent = async (req, res) => {
  const event = new Event(req.body)
  try {
    event.user = req.uid
    const eventSaved = await event.save()
    res.status(201).json({
      status: 'success',
      event: eventSaved,
    })
  } catch (error) {
    return handleServerError(res)
  }
}

const updateEvent = async (req, res) => {
  const { id } = req.params
  const { uid } = req
  if (validateObjectId(id, res)) return
  try {
    const event = await Event.findById(id)
    if (!event) return handleNotFoundError('Event', res)
    if (event.user.toString() !== uid) return handleUnauthorizedError(res)
    const newEvent = {
      ...req.body,
      user: uid,
    }
    const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    })
    res.status(200).json({
      status: 'success',
      event: eventUpdated,
    })
  } catch (error) {
    return handleServerError(res)
  }
}

const deleteEvent = async (req, res) => {
  const { id } = req.params
  const { uid } = req
  if (validateObjectId(id, res)) return
  try {
    const event = await Event.findById(id)
    if (!event) return handleNotFoundError('Event', res)
    if (event.user.toString() !== uid) return handleUnauthorizedError(res)
    await Event.findByIdAndDelete(id)
    res.status(200).json({
      status: 'success',
      message: 'Event deleted',
    })
  } catch (error) {
    return handleServerError(res)
  }
}

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent }
