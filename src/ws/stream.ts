import { Socket, Server } from 'socket.io';

export const stream = (socket: Socket) => {
    const io: Server = socket.nsp.server as Server; // Get the server instance from the socket
    // const io = socket.server;
    socket.on('subscribe', (data: { room: string, socketId: string }) => {
        //subscribe/join a room
        socket.join(data.room);
        socket.join(data.socketId);

        //Inform other members in the room of new_user's arrival
        // const room = io.sockets.adapter.rooms.get(data.room);
        if (io.sockets.adapter.rooms.has(data.room)) {
            socket.to(data.room).emit('new_user', { socketId: data.socketId });
        }
    });

    socket.on('newUserStart', (data: { to: string, sender: string }) => {
        socket.to(data.to).emit('newUserStart', { sender: data.sender });
    });

    socket.on('sdp', (data: { to: string, description: string, sender: string }) => {
        socket.to(data.to).emit('sdp', { description: data.description, sender: data.sender });
    });

    socket.on('ice_candidates', (data: { to: string, candidate: string, sender: string }) => {
        socket.to(data.to).emit('ice_candidates', { candidate: data.candidate, sender: data.sender });
    });

    socket.on('chat', (data: { room: string, sender: string, msg: string }) => {
        socket.to(data.room).emit('chat', { sender: data.sender, msg: data.msg });
    });
};
