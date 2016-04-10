import React from 'react';

export default class PlayersRoute extends React.Component {

    render() {
    	console.log("rendering PlayersRoute")
        return(
            <div>
                <h4>Players</h4>
                { this.props.children }
            </div>
        );
    }
}