import * as React from 'react';
import Page from './Page';
import Tile from './Tile';

class App extends React.Component {
  public render() {
    const tiles: Map<number, Tile> = new Map();
    tiles.set(1, new Tile({id: 'blue', initialPosition: 1, index: 0}));
    tiles.set(0, new Tile({id: 'red', initialPosition: 0, index: 0}));

    return (
      <div className="App">
        <Page initialTiles={tiles} />
      </div>
    );
  }
}

export default App;
