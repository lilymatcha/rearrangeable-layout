import * as React from 'react';
import './../styles/DroppableContainer.css';
import { ITileProps } from './Tile';

export interface IDroppableContainerProps {
    grey?: boolean;
    key?: number;
    children?: React.ReactElement<ITileProps>;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

class DroppableContainer extends React.Component<IDroppableContainerProps, object> {
    constructor(props: IDroppableContainerProps) {
        super(props);
    }

    public render() {
        const shouldFill: React.CSSProperties = this.props.grey ? { backgroundColor: 'lightgrey' } : { backgroundColor: 'white' };
    
        return (
            <div className='droppableContainer'
            style={ shouldFill }
            onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default DroppableContainer;