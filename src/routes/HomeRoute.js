import React from 'react';

export default class HomeRoute extends React.Component {

    render() {
    	console.log("rendering HomeRoute")
        return(
            <div>
                <h4>Home</h4>
                { this.props.children }
            </div>
        );
    }
}