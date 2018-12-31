import * as React from 'react';
import Item from './Item';

import '../styles/DroppableRow.css';

export interface IDroppableRowProps {
    initialItems?: Map<string, Item>
}

class DroppableRow extends React.Component<IDroppableRowProps, object> {
    constructor(props: IDroppableRowProps) {
        super(props);
    }

    public render() {
        return (
            <div className='droppableRow'>
                {this.props.children}
            </div>
        );
    }
}

export default DroppableRow;