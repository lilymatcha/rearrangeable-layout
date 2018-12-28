import * as React from 'react';
import '../styles/HorizontalContainer.css';

export interface IHorizontalContainerProps {
    initialChildren: any
}

class HorizontalContainer extends React.Component<IHorizontalContainerProps, object> {
    constructor(props: IHorizontalContainerProps) {
        super(props);
    }

    public render() {
        return (
            <div className='horizontalContainer'>
                {this.props.children}
            </div>
        );
    }
}

export default HorizontalContainer;