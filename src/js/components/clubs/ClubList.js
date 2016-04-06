import React from "react";
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class ClubList extends React.Component {

	// (must use immutable datastructures) provides cheap reference/equality comparisions for shouldComponentUpdate() method
	mixins: [PureRenderMixin]
    
    render() {
        return (
            <div>
            	<div className="row">
            		<div className="col-md-3">
						<h4>Clubs</h4>
            		</div>
            		<div className="col-md-9">
            			<button className="btn btn-mini btn-success pull-right">Join clubs</button>
            		</div>
            	</div>
            	<div className="row">
            		<div className="col-md-12">
            			<span className="muted">Nothing to show.</span>
            		</div>
            	</div>
            </div>
        );
    }
}