import * as React from 'react';
import DroppableRow from './DroppableRow';
import Item from './Item';
import RevisedTile from './RevisedTile';

import {
    DragDropContext,
    Draggable,
    DraggableLocation,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
    DropResult } from 'react-beautiful-dnd';

export const ROW1 = 'row1';
export const ROW2 = 'row2';

// key is what row they start out in, value is the item itself
export interface IHorizontalPageProps {
    initialItems: Map<string, Item[]>
}

export interface IHorizontalPageState {
    itemsInRow1: Item[],
    itemsInRow2: Item[]
}

export interface IMoveResult {
    itemsInRow1: Item[],
    itemsInRow2: Item[]
}

class HorizontalPage extends React.Component<IHorizontalPageProps, IHorizontalPageState> {
    constructor(props: IHorizontalPageProps) {
        super(props);

        this.onDragEnd = this.onDragEnd.bind(this);
        this.move = this.move.bind(this);
        this.reorder = this.reorder.bind(this);

        let itemsToPutInRow1: Item[] = [];
        let itemsToPutInRow2: Item[] = [];
        this.props.initialItems.forEach((items, key) => {
            if (key === ROW1) {
                itemsToPutInRow1 = items;
            } else if (key === ROW2) {
                itemsToPutInRow2 = items;
            } else {
                console.log('An item in initialItems was in neither row 1 nor row 2.');
            }
        });
        this.state = { itemsInRow1: itemsToPutInRow1, itemsInRow2: itemsToPutInRow2 };
    }

    public render() {
        const horizontalStyling: React.CSSProperties = { display: 'flex', flexDirection: 'column' };

        return(
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div style={horizontalStyling}>
                    <Droppable droppableId={ROW1} direction='horizontal'>
                        {(providedDroppable: DroppableProvided, snapshotDroppable: DroppableStateSnapshot) => (
                            <div 
                            ref={providedDroppable.innerRef}
                            {...providedDroppable.droppableProps}>
                                <DroppableRow>
                                    {this.state.itemsInRow1.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                                                <div>
                                                    <div ref={providedDraggable.innerRef}
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}>
                                                        <RevisedTile color={item.content} />
                                                    </div>
                                                    {providedDraggable.placeholder}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </DroppableRow>
                            </div>
                        )}
                    </Droppable>
                    <Droppable droppableId={ROW2} direction='horizontal'>
                        {(providedDroppable: DroppableProvided, snapshotDroppable: DroppableStateSnapshot) => (
                            <div 
                            ref={providedDroppable.innerRef}
                            {...providedDroppable.droppableProps}>
                                <DroppableRow>
                                    {this.state.itemsInRow2.map((item, index) => (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                                                <div>
                                                    <div ref={providedDraggable.innerRef}
                                                    {...providedDraggable.draggableProps}
                                                    {...providedDraggable.dragHandleProps}>
                                                        <RevisedTile color={item.content} />
                                                    </div>
                                                    {providedDraggable.placeholder}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                </DroppableRow>
                            </div>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>

        )
    }

    public onDragEnd(result: DropResult): void {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = this.reorder(this.getList(source.droppableId), source.index, destination.index);
            let state: IHorizontalPageState = {...this.state};

            if (source.droppableId === ROW1) {
                state = {...this.state, itemsInRow1: items};
            } else if (source.droppableId === ROW2) {
                state = {...this.state, itemsInRow2: items};
            }

            this.setState(state);
        } else {
            const resultFromMove: IMoveResult = this.move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );

            this.setState({
                itemsInRow1: resultFromMove.itemsInRow1,
                itemsInRow2: resultFromMove.itemsInRow2
            })
        }
    }

    private move(source: Item[], destination: Item[], droppableSource: DraggableLocation, droppableDestination: DraggableLocation) {

        console.log(source);
        console.log(destination);
        const sourceClone = [...source];
        const destinationClone = [...destination];
        const [removed] = sourceClone.splice(droppableSource.index, 1);

        destinationClone.splice(droppableDestination.index, 0, removed);

        let result = {};
        if (droppableSource.droppableId === ROW1) {
            result = { itemsInRow1: sourceClone, itemsInRow2: destinationClone};
        } else if (droppableSource.droppableId === ROW2) {
            result = { itemsInRow1: destinationClone, itemsInRow2: sourceClone }
        }

        return result as IMoveResult;
    }

    private reorder(list: Item[], startIndex: number, endIndex: number) {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    private getList(droppableId: string) {
        if (droppableId === ROW1) {
            return this.state.itemsInRow1;
        } else {
            return this.state.itemsInRow2;
        }
    }
}

export default HorizontalPage;