import * as React from 'react';
import { DragDropContext, Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult } from 'react-beautiful-dnd';

import './../styles/Page.css';
import DroppableContainer from './DroppableContainer';
import Tile from './Tile';

export const WIDTH = 3;
export const HEIGHT = 5;

export interface IPageProps {
    initialTiles: Map<number, Tile>;
}

interface IPageState {
    currentTiles: Map<number, Tile>;
    layout: JSX.Element[][];
    selectedTileKey: string | undefined;
    tilePositions: Map<string, number>;
}

class Page extends React.Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);

        const tilePositions: Map<string, number> = this.getTilePositions(this.props.initialTiles);
        this.onDragEnd = this.onDragEnd.bind(this);

        this.state = {
            currentTiles: this.props.initialTiles,
            layout: [],
            selectedTileKey: undefined,
            tilePositions
        };
    }

    public render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <ul className='page'>
                    {this.state.layout.map((row) =>
                        <li key={row[0].key ? row[0].key : 0}>{row}</li>)}
                </ul>
            </DragDropContext>
        );
    }

    public componentDidMount() {
        this.updateLayout();
    }

    public onDragEnd(result: DropResult) {
        if (!result.destination || result.destination.droppableId === '') {
            console.log('There was no destination.');
            return;
        }

        if (result.destination.droppableId === result.source.droppableId) {
            return;
        }

        console.log('Source: ', result.source, ', Destination: ', result.destination);
        this.moveTile(Number(result.source.droppableId), Number(result.destination.droppableId));
        console.log('moveTile() finished.');
    }

    private tryMoveTile(attemptedPosition: number) {
        return !this.state.currentTiles.has(attemptedPosition); // this is buggy but okay for now
    }

    private moveTile(oldPosition: number, newPosition: number) {
        const tile = this.state.currentTiles.get(oldPosition);

        console.log('Old position: ', oldPosition, ', New Position: ', newPosition);

        if (tile && this.tryMoveTile(newPosition) && this.state.currentTiles.delete(oldPosition)) {
            this.state.currentTiles.set(newPosition, tile);
            this.setState({selectedTileKey: undefined})
            this.updateTilePositionsMap();
            this.updateLayout();
        }   
    }

    private updateLayout() {
        const arr: JSX.Element[][] = [];

        for (let x = 0; x < WIDTH; x++) {
            const row: JSX.Element[] = [];

            for (let y = 0; y < HEIGHT; y++) {
                const grey: boolean = (y+x) % 2 === 0;
                const i = y + x*HEIGHT;
                const tile = this.state.currentTiles.get(i);

                if (tile) {
                    row.push(
                        <Droppable droppableId={String(i)}>
                            {(providedDroppable: DroppableProvided) => (
                            <div ref={providedDroppable.innerRef}
                            {...providedDroppable.droppableProps}>
                                <DroppableContainer
                                key={i}
                                position={i}
                                grey={grey}>
                                    <Draggable draggableId={String(tile.props.id)} index={0}>
                                        {(providedDraggable: DraggableProvided) => (
                                            <div
                                            ref={providedDraggable.innerRef}
                                            {...providedDraggable.draggableProps}
                                            {...providedDraggable.dragHandleProps}>
                                                <Tile
                                                id={tile.props.id}
                                                initialPosition={i}
                                                index={0} />
                                                {providedDraggable.placeholder}
                                            </div>
                                        )}
                                    </Draggable>
                                </DroppableContainer>
                                {providedDroppable.placeholder}
                            </div>
                        )}
                        </Droppable>
                    );
                } else {
                    row.push(
                    <Droppable droppableId={String(i)}>
                        {(providedDroppable: DroppableProvided) => (
                            <div ref={providedDroppable.innerRef}
                            {...providedDroppable.droppableProps}>
                                <DroppableContainer
                                key={i}
                                position={i}
                                grey={grey} />
                                {providedDroppable.placeholder}
                            </div>
                        )}
                        
                    </Droppable>
                    
                    );
                }
            }
            arr.push(row);
        }
        this.setState({ layout: arr });
    }

    private updateTilePositionsMap() {
        const tilePositions: Map<string, number> = this.getTilePositions(this.state.currentTiles);
        this.setState({tilePositions});
    }

    private getTilePositions(positionToTileMap: Map<number, Tile>) {
        const tilePositions: Map<string, number> = new Map();
        positionToTileMap.forEach((tile: Tile, position: number) => {
            tilePositions.set(tile.props.id, position);
        })
        return tilePositions;
    }
}

export default Page;