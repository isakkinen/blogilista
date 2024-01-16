const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info('connected to MongoDB')
}).catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
})

app.use(cors())
app.use(express.json())
app.use(blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = config.PORT
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
})
