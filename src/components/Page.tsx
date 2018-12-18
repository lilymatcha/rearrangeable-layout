import * as React from 'react';
import './../styles/Page.css';
import DroppableContainer from './DroppableContainer';
import Tile from './Tile';

export const WIDTH = 3;
export const HEIGHT = 5;

export interface IPageProps {
    initialTiles: Map<number, Tile>;
}

interface IPageState {
    currentTiles: Map<number, Tile>;
    layout: JSX.Element[][];
    selectedTileKey: string | undefined;
    tilePositions: Map<string, number>;
}

class Page extends React.Component<IPageProps, IPageState> {
    constructor(props: IPageProps) {
        super(props);

        const tilePositions: Map<string, number> = this.getTilePositions(this.props.initialTiles);
        this.state = {
            currentTiles: this.props.initialTiles,
            layout: [],
            selectedTileKey: undefined,
            tilePositions
        };
    }

    public render() {
        return (
            <div>
                <ul className='page'>
                    {this.state.layout.map((row) =>
                        <li key={row[0].key ? row[0].key : 0}>{row}</li>)}
                </ul>
            </div>
        );
    }

    public componentDidMount() {
        this.updateLayout();
    }

    private handleTileClick(e: React.MouseEvent, clickedTileId: string) {
        console.log('Clicked tile: ', clickedTileId);
        if (this.state.selectedTileKey === clickedTileId) {
            this.setState({selectedTileKey: undefined});
        } else {
            this.setState({selectedTileKey: clickedTileId});
        }
    }

    private handleContainerClick(e: React.MouseEvent, clickedContainerKey: number) {
        console.log('Clicked container: ', clickedContainerKey);
        console.log('Currently selected tile: ', this.state.selectedTileKey);
        if (this.state.selectedTileKey) {
            const selectedTileOldPosition = this.state.tilePositions.get(this.state.selectedTileKey);
            console.log('Selected tile\'s old position: ', selectedTileOldPosition);
            if (selectedTileOldPosition) {
                this.moveTile(selectedTileOldPosition, clickedContainerKey);
            }
        }
    }

    private moveTile(oldPosition: number, newPosition: number) {
        const tile = this.state.currentTiles.get(oldPosition);
        if (tile && this.state.currentTiles.delete(oldPosition)) {
            this.state.currentTiles.set(newPosition, tile);
            this.setState({selectedTileKey: undefined})
            this.updateTilePositionsMap();
            this.updateLayout();
        }   
    }

    private updateLayout() {
        const arr: JSX.Element[][] = [];

        for (let x = 0; x < WIDTH; x++) {
            const row: JSX.Element[] = [];

            for (let y = 0; y < HEIGHT; y++) {
                const grey: boolean = (y+x) % 2 === 0;
                const i = y + x*HEIGHT;
                const tile = this.state.currentTiles.get(i);

                if (tile) {
                    row.push(
                        <DroppableContainer
                        grey={grey}
                        key={i}
                        onClick={(e) => this.handleContainerClick(e, i)}>
                            <Tile
                            color={tile.props.color}
                            id={tile.props.id}
                            initialPosition={i}
                            onClick={(e) => this.handleTileClick(e, tile.props.id)} />
                        </DroppableContainer>
                    );
                } else {
                    row.push(<DroppableContainer
                        grey={grey}
                        key={i}
                        onClick={(e) => this.handleContainerClick(e, i)} />);
                }
            }
            arr.push(row);
        }
        this.setState({ layout: arr });
    }

    private updateTilePositionsMap() {
        const tilePositions: Map<string, number> = this.getTilePositions(this.state.currentTiles);
        this.setState({tilePositions});
    }

    private getTilePositions(positionToTileMap: Map<number, Tile>) {
        const tilePositions: Map<string, number> = new Map();
        positionToTileMap.forEach((tile: Tile, position: number) => {
            tilePositions.set(tile.props.id, position);
        })
        return tilePositions;
    }
}

export default Page;