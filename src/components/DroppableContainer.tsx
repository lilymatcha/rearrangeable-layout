import * as React from 'react';
import './../styles/DroppableContainer.css';

import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { ITileProps } from './Tile';

export interface IDroppableContainerProps {
    key: number;
    position: number;
    grey?: boolean;
    children?: React.ReactElement<ITileProps>;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

class DroppableContainer extends React.Component<IDroppableContainerProps, object> {
    constructor(props: IDroppableContainerProps) {
        super(props);
    }

    public render() {
        const shouldFill: React.CSSProperties = this.props.grey ? { backgroundColor: 'lightgrey' } : { backgroundColor: 'white' };
        const position: string = this.props.position.toString();

        return (
            <Droppable droppableId={position}>
                {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        <div
                        className='droppableContainer'
                        style={ shouldFill }
                        onClick={this.props.onClick}>
                            {this.props.children}
                        </div>
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            
        );
    }
}

export default DroppableContainer;