import * as React from 'react';
import './../styles/DroppableContainer.css';

class DroppableContainer extends React.Component<React.Props<any>, object> {

    public onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    public onDrop = (e: React.DragEvent) => {
        e.stopPropagation();
        console.log("tile dropped");
    }

    public render() {
        return(
            <div className="droppableContainer"
            onDragOver={this.onDragOver}                    
            onDrop={this.onDrop} />
        );
    }
}

export default DroppableContainer;