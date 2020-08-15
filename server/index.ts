import express from 'express';
import {createServer} from 'http';
import socketio, {Socket} from 'socket.io';

const application = express();

const http = createServer(application);
const io = socketio(http);

const rooms = new Map<string, Room>();

let roomIdCounter = 1000;

application.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('create_room', ({maxPlayers, playerData}) => {
    console.log('received event', maxPlayers);
    const newlyCreatedRoom = createNewRoom();
    rooms.set(newlyCreatedRoom, {
      maxPlayers,
      creationTime: new Date(),
      players: [{playerData, socket}],
      roomName: newlyCreatedRoom,
    });
    socket.join(newlyCreatedRoom);
    socket.emit('create_room_result', {roomName: newlyCreatedRoom});
  });

  socket.on('join_room', (msg) => {
    if (rooms.has(msg.roomName)) {
      socket.join(msg.roomName);
      socket.emit('join_room_sucess', {});
    } else {
      socket.emit('join_room_failure', {msg: 'room_not_found'});
    }
  });

  socket.on('game_event', (msg) => {
    if (rooms.has(msg.roomName)) {
      io.to(msg.roomName).emit('game_event', msg.event);
    } else {
      socket.emit('game_event_failure', {msg: 'room_not_found'});
    }
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

interface Room {
  roomName: string;
  maxPlayers: number;
  players: Player[];
  creationTime: Date;
}

interface Player {
  playerData: any;
  socket: Socket;
}

function createNewRoom() {
  roomIdCounter++;
  return roomIdCounter + '';
}
