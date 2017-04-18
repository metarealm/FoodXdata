var winston = require('winston');
var constants = require('./constants')


var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ 'timestamp': true })
    ]
});
logger.level = constants.LOGLVEL;

module.exports = logger;
