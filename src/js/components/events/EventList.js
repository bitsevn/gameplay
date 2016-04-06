import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class EventList extends React.Component {

	// (must use immutable datastructures) provides cheap reference/equality comparisions for shouldComponentUpdate() method
    mixins: [PureRenderMixin]
    
    render() {
        return (
            <div>
            	<h4>Events</h4>
            	<div className="row">
            		<div className="col-md-12">
            			<span className="muted">Nothing to show.</span>
            		</div>
            	</div>
            </div>
        );
    }
}