import * as React from 'react';
import DroppableContainer from './DroppableContainer';
import Tile from './Tile';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Tile color='blue' />
        <Tile color='red' />
        <Tile color='yellow' />

        <DroppableContainer />
      </div>
    );
  }
}

export default App;
