import * as React from 'react';
import './../styles/Tile.css';

import { Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';

export interface ITileProps {
    color: string;
    id: string;
    index: number;
    initialPosition: number;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
    selected?: boolean;
}

interface ITileState {
    currentPosition: number;
}

class Tile extends React.Component<ITileProps, ITileState> {
    constructor(props: ITileProps) {
        super(props);

        this.state = { currentPosition: props.initialPosition }
    }

    public render() {
        const style: React.CSSProperties = {
            backgroundColor: this.props.color
        };

        return (
            <Draggable draggableId={this.props.id} index={this.props.index}>
                {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                    <div
                    className='tile'
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                    style={ style }
                    id={ this.props.id }
                    onClick={this.props.onClick}>
                        {providedDraggable.placeholder}
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Tile;