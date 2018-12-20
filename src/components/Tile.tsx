import * as React from 'react';
import './../styles/Tile.css';

export interface ITileProps {
    color: string;
    id: string;
    index: number;
    initialPosition: number;
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
        const style: React.CSSProperties = {
            backgroundColor: this.props.color
        };

        return (
            <div className='tile'
            style={ style }
            id={ this.props.id } />
        );
    }
}

export default Tile;