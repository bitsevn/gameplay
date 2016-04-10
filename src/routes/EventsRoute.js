import React from 'react';

export default class EventsRoute extends React.Component {

    render() {
    	console.log("rendering EventsRoute")
        return(
            <div>
                <h4>Events</h4>
                { this.props.children }
            </div>
        );
    }
}