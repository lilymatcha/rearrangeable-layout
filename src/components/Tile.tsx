import * as React from 'react';
import './../styles/Tile.css';
import Position from './Position';

export interface ITileProps {
    color: string;
    id: string;
    initialPosition?: Position;
}

interface ITileState {
    currentPosition: Position;
}

class Tile extends React.Component<ITileProps, ITileState> {
    constructor(props: ITileProps) {
        super(props);
        this.state = { currentPosition: props.initialPosition || new Position(0,0) }
    }

    public updatePosition(currentPosition: Position) {
        this.setState({ currentPosition });
    }

    public render() {
        const backgroundColor: React.CSSProperties = { backgroundColor: this.props.color };
        const draggable: boolean = true;

        return (
            <button draggable={ draggable } className='tile' style={ backgroundColor } id={ this.props.id } />
        );
    }
}

export default Tile;