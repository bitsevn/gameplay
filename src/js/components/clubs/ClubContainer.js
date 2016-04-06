import React from "react";
import { Map } from "immutable";
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class ClubContainer extends React.Component {

	// (must use immutable datastructures) provides cheap reference/equality comparisions for shouldComponentUpdate() method
	mixins: [PureRenderMixin]

    constructor() {
        super();
        this.state = { data: Map({ clubs:[], mode: "list_clubs" }) };
    }

    setImmutableState(fn) {
        return this.setState(({data}) => ({ data: fn(data) }))
    }
    
    onAddClub() {
        this.setImmutableState(d => d.update("mode", v => "add_club"));
    }
    
    render() {
        return (
            <div>
            	<div className="row">
            		<div className="col-md-8">
						<h4>My clubs</h4>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="muted">Nothing to show.</span>
                            </div>
                        </div>
            		</div>
            		<div className="col-md-4">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>{ this.state.data.get("mode") == "add_club" ? "New club" : "All clubs" }</h4>
                            </div>
                            <div className="col-md-8">
                                { this.renderAddClubButton() }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                { (this.state.data.get("mode") == "add_club") ? this.renderAddClubForm() : this.renderAllClubs() }
                            </div>
                        </div>
            		</div>
            	</div>
            </div>
        );
    }

    renderAddClubButton() {
        if(this.state.data.get("mode") == "add_club") return null;
        return <button className="btn btn-mini btn-success pull-right" onClick={ () => { this.onAddClub() } }>New club</button>;
    }

    renderAddClubForm() {
        return <span className="muted">Add new club.</span>
    }

    renderAllClubs() {
        <span className="muted">Nothing to show.</span>
    }
}