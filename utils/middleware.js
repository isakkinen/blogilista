const logger = require('./logger')

const tokenParser = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.replace('bearer ', '')
    }
    next()
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack)
    res.status(500).send('something went wrong')
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = {
    tokenParser,
    errorHandler,
    unknownEndpoint
}
