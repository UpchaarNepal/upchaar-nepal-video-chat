import express from 'express';
import cors from 'cors';
// import { Server as SocketServer, Socket } from 'socket.io';
import http from 'http';
import helmet from 'helmet';
import favicon from 'serve-favicon';
import path from 'path';

// import { errorHandler, errorConverter } from './errorhandler/error';
import morganMiddleWare from './features/logger_module/morgan';
// import routerModule from './routers';
// import swaggerDocs from './swagger/swagger';
// import logger from '../src/features/logger_module/winston-logger';
import { initializeSocket } from './socket';
import { errorHandler, notAvailableRouteErrorHandler } from './errorhandler/handler.error';
import { stream } from './ws/stream';

// import * as socketio from "socket.io";

const app = express();

app.use(cors());

// set security HTTP headers
app.use(helmet.hsts({ maxAge: 31536000 }));


app.use(
	express.json({
		// verify: (req: Request, res: Response, buffer) => (req.body = buffer),
		limit: '3000mb',
	}),
);

if (process.env.NODE_ENV !== 'test') {
	app.use(morganMiddleWare.successHandler);
	app.use(morganMiddleWare.errorHandler);
}

app.use(express.urlencoded({ limit: '3000mb', extended: true }));
app.use( favicon( path.join( __dirname, 'favicon.ico' ) ) );
app.use( '/assets', express.static( path.join( __dirname, 'assets' ) ) );

// Configure for socket connection
// let http = require("http").Server(app);

const server = http.createServer(app);

// let io = require("socket.io")(http);

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/index.html' );
} );
// Connect Socket.IO
initializeSocket(server ,stream);


app.use(errorHandler);
app.use(notAvailableRouteErrorHandler);


export default app;