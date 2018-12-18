import * as React from 'react';
import DroppableContainer from './DroppableContainer';
import Position from './Position';
import Tile from './Tile';

const WIDTH = 5;
const HEIGHT = 7;

export interface IPageProps {
    initialTiles: Map<Position, Tile>;
}

interface IPageState {
    layout: JSX.Element[][];
    currentTiles: Map<Position, Tile>;
}

class Page extends React.Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);

        this.state = { layout: [], currentTiles: this.props.initialTiles };
    }

    public render() {
        return (
            <div>
                <ul style={{display: 'flex'}}>
                    {this.state.layout.map((row) =>
                        <li key={row[0].key ? row[0].key : 0}>{row}</li>)}
                </ul>
            </div>
        );
    }

    public componentDidMount() {
        this.createLayout();
    }    

    private createLayout() {
        const arr: JSX.Element[][] = [];

        for (let x = 0; x < WIDTH; x++) {
            const row: JSX.Element[] = [];

            for (let y = 0; y < HEIGHT; y++) {
                const grey: boolean = (y+x) % 2 === 0
                const currentPosition: Position = new Position(x, y)
                const i = y + x*HEIGHT;

                const tile = this.state.currentTiles.get(currentPosition);
                if (tile) {
                    row.push(
                        <DroppableContainer grey={ grey } key={i}>
                            <Tile color={tile.props.color} id={tile.props.id} />
                        </DroppableContainer>
                    );
                } else {
                    row.push(<DroppableContainer grey={ grey } key={i}/>);
                }
            }
            arr.push(row);
        }
        this.setState({ layout: arr });
    }
}

export default Page;