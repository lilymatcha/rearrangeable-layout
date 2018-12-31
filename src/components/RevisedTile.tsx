import * as React from 'react';
import './../styles/Tile.css';

export interface IRevisedTileProps {
    color: string
}

class RevisedTile extends React.Component<IRevisedTileProps, object> {
    constructor(props: IRevisedTileProps) {
        super(props);
    }

    public render() {
        const style: React.CSSProperties = { backgroundColor: this.props.color };

        return (
            <div className='tile' style={ style } />
        );
    }
}

export default RevisedTile;