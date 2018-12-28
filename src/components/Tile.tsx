import * as React from 'react';
import './../styles/Tile.css';

export interface ITileProps {
    id: string;
    index: number;
    initialPosition: number;
    selected?: boolean;
}

interface ITileState {
    containerId: number;
    index: number;
}

class Tile extends React.Component<ITileProps, ITileState> {
    constructor(props: ITileProps) {
        super(props);

        this.state = { containerId: props.initialPosition, index: props.index }
    }

    public render() {
        const style: React.CSSProperties = {
        };

        return (
            <div className='tile'
            style={ style }
            id={ this.props.id } />
        );
    }
}

export default Tile;