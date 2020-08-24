import React from 'react';
import io from 'socket.io-client';

// @ts-ignore

// @ts-ignore
const Game = window.Elm.Game;
function App() {
  const div: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);

  React.useEffect(() => {
    const app = Game.init({
      node: div.current,
    });

    var diceRoll = sound('diceRoll.mp3');

    //@ts-ignore
    var socket = io('https://ludo-galaxy.herokuapp.com/');

    app.ports.rollDice.subscribe(function () {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      diceRoll.play();

      app.ports.diceRolledReceiver.send(randomNumber);

      socket.emit('game_event', {type: 'roll_dice', data: randomNumber});
    });

    socket.on('game_event', ({type, data}: {type: string; data: string}) => {
      diceRoll.play();
      switch (type) {
        case 'roll_dice':
          diceRoll.play();
          app.ports.diceRolledReceiver.send(data);
          break;
        case 'move_coins':
          app.ports.moveCoinsReceiver.send(data);
          break;
      }
    });

    app.ports.moveCoins.subscribe(function (message: any) {
      diceRoll.play();
      socket.emit('game_event', {type: 'move_coins', data: message});
      app.ports.moveCoinsReceiver.send(message);
    });

    app.ports.joinGame.subscribe(function (roomName: any) {
      socket.emit(
        'join_room',
        {roomName},
        (data: {error: any; order: any; maxPlayers: any}) => {
          console.log(data);
          if (data.error) {
            app.ports.errorReceiver.send(data.error);
          } else {
            app.ports.joinGameReceiver.send([
              roomName,
              data.order,
              data.maxPlayers,
            ]);
          }
        }
      );
    });

    app.ports.createNewGame.subscribe(function (maxPlayers: any) {
      console.log(maxPlayers);

      socket.emit(
        'create_room',
        {maxPlayers},
        (data: {error: any; roomName: any}) => {
          console.log(data);
          if (data.error) {
            app.ports.errorReceiver.send(data.error);
          } else {
            app.ports.newGameReceiver.send(data.roomName);
          }
        }
      );
    });

    return () => {};
  }, []);

  return <div ref={div}> </div>;
}

export default App;

function sound(src: string) {
  const soundDiv = document.createElement('audio');
  soundDiv.src = src;
  soundDiv.setAttribute('preload', 'auto');
  soundDiv.setAttribute('controls', 'none');
  soundDiv.style.display = 'none';
  document.body.appendChild(soundDiv);
  const play = () => soundDiv.play();
  const stop = () => soundDiv.pause();

  return {play, stop};
}
