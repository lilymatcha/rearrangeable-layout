import * as React from 'react';
import './../styles/Tile.css';

export interface ITileProps {
    color: string;
    id: string;
    initialPosition: number;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    selected?: boolean;
}

interface ITileState {
    currentPosition: number;
}

class Tile extends React.Component<ITileProps, ITileState> {
    constructor(props: ITileProps) {
        super(props);

        this.state = { currentPosition: props.initialPosition }
    }

    public render() {
        const backgroundColor: React.CSSProperties = { backgroundColor: this.props.color };
        const draggable: boolean = true;

        return (
            <button draggable={ draggable }
            className='tile'
            style={ backgroundColor }
            id={ this.props.id }
            onClick={this.props.onClick} />
        );
    }
}

export default Tile;