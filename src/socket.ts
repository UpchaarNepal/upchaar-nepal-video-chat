import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

// const uniqueId: string = uuidv4();
// console.log('Generated UUID:', uniqueId);

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { });

// Your code logic with Express and Socket.IO goes here

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room", (req, resp) => {
  resp.render("room", { roomId: req.params.room });
})




export default app;