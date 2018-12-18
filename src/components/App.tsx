import * as React from 'react';
import Page from './Page';
import Tile from './Tile';

class App extends React.Component {
  public render() {
    const tiles: Map<number, Tile> = new Map();
    tiles.set(1, new Tile({color: 'blue', id: 'blue', initialPosition: 1}));

    return (
      <div className="App">
        <Page initialTiles={tiles} />
      </div>
    );
  }
}

export default App;
