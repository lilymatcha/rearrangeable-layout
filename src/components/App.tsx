import * as React from 'react';
import Page from './Page';
import Tile from './Tile';

class App extends React.Component {
  public render() {
    const tiles: Map<number, Tile> = new Map();
    tiles.set(0, new Tile({color: 'blue', id: 'blue'}));
    tiles.set(8, new Tile({color: 'red', id: 'red'}));

    return (
      <div className="App">
        <Page tiles={tiles} />
      </div>
    );
  }
}

export default App;
