import * as React from 'react';
import './../styles/DroppableContainer.css';

export interface IDroppableContainerProps {
    key: number;
    position: number;
    grey?: boolean;
    children?: any;
}

class DroppableContainer extends React.Component<IDroppableContainerProps, object> {
    constructor(props: IDroppableContainerProps) {
        super(props);
    }

    public render() {
        const shouldFill: React.CSSProperties = this.props.grey ? { backgroundColor: 'lightgrey' } : { backgroundColor: 'white' };

        return (
            <div
            className='droppableContainer'
            style={ shouldFill }>
                {this.props.children}
            </div>
        );
    }
}

export default DroppableContainer;