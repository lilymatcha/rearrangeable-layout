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
        return (
            <div
            className={'droppableContainer' + (this.props.grey ? ' grey' : '')}>
                {this.props.children}
            </div>
        );
    }
}

export default DroppableContainer;