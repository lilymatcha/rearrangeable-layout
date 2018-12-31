import * as React from 'react';
import HorizontalPage, { ROW1, ROW2 } from './HorizontalPage';
import Item from './Item';
import Page from './Page';
import Tile from './Tile';

class App extends React.Component {
  public render() {
    const tiles: Map<number, Tile> = new Map();
    tiles.set(1, new Tile({id: 'blue', initialPosition: 1, index: 0}));
    tiles.set(0, new Tile({id: 'red', initialPosition: 0, index: 0}));

    const itemsInRow1: Item[] = [];
    itemsInRow1.push({id: 'a', content: 'lightblue'} as Item);
    itemsInRow1.push({id: 'b', content: 'pink'} as Item);
    itemsInRow1.push({id: 'c', content: 'orange'} as Item);

    const itemsInRow2: Item[] = [];
    itemsInRow2.push({id: 'x', content: 'yellow'} as Item);
    itemsInRow2.push({id: 'y', content: 'purple'} as Item);
    itemsInRow2.push({id: 'z', content: 'green'} as Item);

    const items: Map<string, Item[]> = new Map();
    items.set(ROW1, itemsInRow1);
    items.set(ROW2, itemsInRow2);

    return (
      <div className="App">
        <Page initialTiles={tiles} />

        <HorizontalPage initialItems={items} />
      </div>
    );
  }
}

export default App;
