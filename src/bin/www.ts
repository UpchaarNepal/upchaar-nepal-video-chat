import * as http from 'http';
import logger from '../features/logger_module/winston-logger';
import App from '../index';
// import { connectDB } from '../database_connection/connect';


const server = http.createServer(App);

function normalizePort(val: number | string): number | string | boolean {
	const normolizedPort = typeof val === 'string' ? parseInt(val, 10) : val;
	if (isNaN(normolizedPort)) {
		return val;
	}

	if (normolizedPort >= 0) {
		return normolizedPort;
	}

	return false;
}

const port = normalizePort(process.env.PORT || 8080);
App.set('port', port);

// eslint-disable-next-line no-undef
const onError = (error: NodeJS.ErrnoException) => {
	if (error.syscall !== 'listen') {
		throw error;
	}
	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			logger.error(`${bind} requires elevated privileges`);
			break;

		case 'EADDRINUSE':
			logger.error(`${bind} is already in use`);
			break;
		case 'SIGINT':
			logger.error('\nGracefully shutting down from SIGINT (Ctrl-C)');
			process.exit(0);
			break;
		default:
			throw error;
	}
	process.exit(1);
};

const onListening = async () => {
	const addr = server.address()!;
	const bind = typeof addr === 'string' ? `pipe ${addr}` : `${addr.port}`;
	logger.info(`Server is listening at http://localhost:${bind}`);
	// await connectDB();

};

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

process.on('SIGINT', () => process.exit(1));
