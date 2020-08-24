import React from 'react';
import GameService from './service/game-service';

function App() {
  const div: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);

  React.useEffect(() => {
    const gameService: GameService = new GameService();
    if (div.current !== null) gameService.connectPortsToMessages(div.current);

    return () => {
      gameService.dispose();
    };
  }, []);

  return <div ref={div}> </div>;
}

export default App;
