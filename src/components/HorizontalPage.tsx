import * as React from 'react';
import Tile from './Tile';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';

export interface IHorizontalPageProps {
    initialTiles: Map<string, Tile>
}

class HorizontalPage extends React.Component<IHorizontalPageProps, object> {
    constructor(props: IHorizontalPageProps) {
        super(props);
    }

    render() {
        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div className='horizontalPage'>
                </div>
            </DragDropContext>
            
        )
    }

    public onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }
  
      this.setState(
        reorderQuoteMap({
          quoteMap: this.state.quoteMap,
          source: result.source,
          destination: result.destination,
        }),
      );
    }
}

export default HorizontalPage;