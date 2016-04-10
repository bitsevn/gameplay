import React from 'react';

export default class NotFoundRoute extends React.Component {

    render() {
        return(
            <div>
                <h4>404 - Not Found</h4>
                { this.props.children }
            </div>
        );
    }
}