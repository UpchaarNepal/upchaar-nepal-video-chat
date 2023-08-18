const { createLogger, transports, format } = require('winston');

const defaultLevel = process.env.LOG_LEVEL || 'info';

const defaultOptions = {
	exitOnError: false,
	level: defaultLevel,
};

const options = {
	transports: [new transports.Console()],
	format: format.combine(format.colorize({ all: true }), format.simple()),
};

let loggerOptions = {};

if (process.env.NODE_ENV!.trim() === 'development') {
	loggerOptions = { ...defaultOptions, ...options };
}

const logger = (module.exports = createLogger(loggerOptions));

export default logger;
