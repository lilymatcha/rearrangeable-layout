import * as React from 'react';
import './../styles/Tile.css';

export interface ITileProps {
    color: string;
}

class Tile extends React.Component<ITileProps, object> {
    public render() {
        const backgroundColor: React.CSSProperties = { backgroundColor: this.props.color };
        const dragAndDrop: boolean = true;

        return (
            <button draggable={ dragAndDrop } className="tile" style={ backgroundColor } />
        );
    }
}

export default Tile;