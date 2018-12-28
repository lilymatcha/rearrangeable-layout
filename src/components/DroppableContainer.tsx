import * as React from 'react';
import './../styles/DroppableContainer.css';

export interface IDroppableContainerProps {
    key: number;
    position: number;
    grey?: boolean;
    children?: React.ReactChild;
}

interface IDroppableContainerState {
    children: any[];
}

class DroppableContainer extends React.Component<IDroppableContainerProps, IDroppableContainerState> {
    constructor(props: IDroppableContainerProps) {
        super(props);

        const childrenAsArray: React.ReactChild[] = React.Children.toArray(props.children);
        this.state = {children: childrenAsArray ? childrenAsArray : []}
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