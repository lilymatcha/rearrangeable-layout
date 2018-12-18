import * as React from 'react';
import './../styles/DroppableContainer.css';
import { ITileProps } from './Tile';

export interface IDroppableContainerProps {
    key?: number;
    grey?: boolean;
    children?: React.ReactElement<ITileProps>;
}

function DroppableContainer({grey, children}: IDroppableContainerProps) {
    const shouldFill: React.CSSProperties = grey ? { backgroundColor: 'lightgrey' } : { backgroundColor: 'white' };

    return (
        <div className='droppableContainer' style={ shouldFill }>
            {children}
        </div>
    );
}

export default DroppableContainer;