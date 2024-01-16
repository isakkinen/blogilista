const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send('something went wrong');
};

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'});
};

module.exports = {
    errorHandler,
    unknownEndpoint
};