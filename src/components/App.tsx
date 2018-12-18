import * as React from 'react';
import DroppableContainer from './DroppableContainer';
import Page from './Page';
import Position from './Position';
import Tile from './Tile';

class App extends React.Component {
  public render() {
    const tiles: Map<Position, Tile> = new Map();
    tiles.set(new Position(0,0), new Tile({color: 'purple', id: 'purple'}));
    tiles.set(new Position(2,3), new Tile({color: 'green', id: 'green'}));

    return (
      <div className="App">
        <Tile color='blue' id='blue' />
        <Tile color='red' id='red' />
        <Tile color='yellow' id='yellow' />

        <DroppableContainer grey={true}>
          <Tile color='pink' id='pink' />
        </DroppableContainer>

        <Page initialTiles={tiles} />
      </div>
    );
  }
}

export default App;
