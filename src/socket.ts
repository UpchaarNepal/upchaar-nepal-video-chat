import { Server, Socket, Namespace  } from 'socket.io';
import logger from '../src/features/logger_module/winston-logger';


// export function initializeSocket(server: Server): void {
//   const io = new Server(server);

//   io.on('connection', (socket: Socket) => {
//     logger.debug('New socket connection:', socket.id);
//     // Handle socket events and logic
//     // ...
//   });
// }


export function initializeSocket(server: any, streamHandler: any): void {
    console.log("🚀 ~ file: socket.ts:17 ~ initializeSocket ~ streamHandler:", streamHandler)
    const io = new Server(server);
    // Rest of your socket.io logic goes here
    const streamNamespace: Namespace = io.of('/stream');
    console.log("🚀 ~ file: socket.ts:21 ~ initializeSocket ~ streamNamespace:", streamNamespace);
    streamNamespace.on('connect', streamHandler);
  }

// export function initializeSocket(server: any): void {
//   console.log("🚀 ~ file: socket.ts:24 ~ initializeSocket ~ server:", server);
//   const io = new Server(8000, {
//   });
//   // Rest of your socket.io logic goes here
//   io.on('connect', (socket: Socket) => {
//   logger.debug('New socket connection:', socket.id);
//   // Handle socket events and logic
//   // ...
//   // socket.on('join_room', (roomId, userId) => {
//   //     socket.join(roomId);
//   //     socket.to(roomId).emit('user_connected', userId);

//   //     socket.on('disconnected', () => {
//   //         socket.to(roomId).emit('user_disconnected', userId);
//   //     });
//   // });
// });
// }