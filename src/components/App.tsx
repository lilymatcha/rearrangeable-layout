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
        <p style={{maxWidth: '600px'}}>The below example demonstrates drag-and-drop. The biggest problem is that while touch works in Chrome, it doesn't work in Edge; meanwhile, narrator works in Edge but doesn't work in Chrome. This is due to the fact that the API I'm using makes use of Touch events and Mouse events instead of Pointer events, which encapsulates both and is what Edge uses. For this reason, I'm trying to patch the API to respond to Pointer events in addition to the existing events, which hopefully will allow us to test the feasibility of touch narration accessibility.</p>
        <HorizontalPage initialItems={items} />
        
        <div style={{height: '50px'}} />

        <p style={{maxWidth: '600px'}}>The below example was my initial attempt at getting an interface to work. It's not really what we're looking for, but it demonstrates how to deal with the edge case of moving a displaced tile to another area of the grid (in this case, the lower right corner to the upper left corner) when another tile is moved in its place.</p>
        <Page initialTiles={tiles} />
      </div>
    );
  }
}

export default App;
