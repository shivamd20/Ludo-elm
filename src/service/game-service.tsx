import io from 'socket.io-client';

export default class GameService {
  socket: SocketIOClient.Socket;
  diceRoll: {play: () => void; stop: () => void};

  constructor() {
    this.socket = io('https://ludo-galaxy.herokuapp.com/');
    this.diceRoll = sound('diceRoll.mp3');
  }

  connectPortsToMessages(element: HTMLElement) {
    //@ts-ignore
    const Game = window.Elm.Game;

    const app = Game.init({
      node: element,
    });

    app.ports.rollDice.subscribe(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      this.diceRoll.play();

      app.ports.diceRolledReceiver.send(randomNumber);

      this.socket.emit('game_event', {type: 'roll_dice', data: randomNumber});
    });

    this.socket.on(
      'game_event',
      ({type, data}: {type: string; data: string}) => {
        this.diceRoll.play();
        switch (type) {
          case 'roll_dice':
            this.diceRoll.play();
            app.ports.diceRolledReceiver.send(data);
            break;
          case 'move_coins':
            app.ports.moveCoinsReceiver.send(data);
            break;
        }
      }
    );

    app.ports.moveCoins.subscribe((message: any) => {
      this.diceRoll.play();
      this.socket.emit('game_event', {type: 'move_coins', data: message});
      app.ports.moveCoinsReceiver.send(message);
    });

    app.ports.joinGame.subscribe((roomName: any) => {
      this.socket.emit(
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

    app.ports.createNewGame.subscribe((maxPlayers: any) => {
      console.log(maxPlayers);

      this.socket.emit(
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
  }
}

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
