const express = require('express')
require('dotenv').config()
const cors = require('cors')

const authRoutes = require('./routes/auth.routes')
const eventsRoutes = require('./routes/events.routes')
const db = require('./config/db')

const app = express()
const port = process.env.PORT

db()

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.use('/api/v2/auth', authRoutes)
app.use('/api/v2/events', eventsRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
