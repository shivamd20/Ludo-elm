import express from 'express';
import {createServer} from 'http';
import path from 'path';
import socketio from 'socket.io';

const application = express();

const http = createServer(application);
const io = socketio(http);

const rooms = new Map<string, Room>();

application.use(
  '/app',
  express.static(path.resolve(__dirname, '..') + '/dist')
);

application.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('create_room', ({maxPlayers = 2}, fn) => {
    console.log('received event', maxPlayers);
    const newlyCreatedRoom = createNewRoom();
    rooms.set(newlyCreatedRoom, {
      maxPlayers,
      creationTime: new Date(),
      orderToBeFilled: 2,
    });
    socket.join(newlyCreatedRoom);
    if (fn) fn({roomName: newlyCreatedRoom});
    console.log('someone created a room', rooms.get(newlyCreatedRoom));
  });

  socket.on('join_room', ({roomName}, fn) => {
    if (rooms.has(roomName)) {
      socket.join(roomName);
      const roomData: Room = rooms.get(roomName) as Room;

      if (roomData.maxPlayers > roomData.orderToBeFilled) {
        fn({error: 'max player limit reached'});
      } else {
        fn({
          order: roomData?.orderToBeFilled,
        });
      }

      console.log('someone joined the room', roomData);

      rooms.set(roomName, {
        ...roomData,
        orderToBeFilled: roomData.orderToBeFilled + 1,
      });
    } else {
      fn({msg: 'room_not_found'});
    }
  });

  socket.on('game_event', (data) => {
    Object.keys(socket.rooms)
      .filter((r) => r !== socket.id)
      .forEach((room) => {
        io.to(room).emit('game_event', data);
        console.log('brodcasted', event);
      });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

interface Room {
  maxPlayers: number;
  creationTime: Date;
  orderToBeFilled: number;
}

let roomIdCounter = 0;
function createNewRoom() {
  roomIdCounter++;
  return roomIdCounter + '';
}
