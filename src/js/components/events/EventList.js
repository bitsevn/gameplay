import React from "react";
import {Map} from "immutable";
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default class EventList extends React.Component {

	// (must use immutable datastructures) provides cheap reference/equality comparisions for shouldComponentUpdate() method
    mixins: [PureRenderMixin]

    constructor() {
        super();
        this.state = { data: Map({text: "Hola"}) }
    }

    go() {
        this.setState({ data: this.state.data.set("text", this.state.data.get("Hola")) });
    }
    
    render() {
        
        return (
            <div>
            	<h4>Events</h4>
            	<div className="row">
            		<div className="col-md-12">
            			<span className="muted">Nothing to show.</span>
                        <br/>
                        <button className="btn btn-mini btn-success" onClick={() => {this.go()}}>Go</button> 
                        &nbsp; <Test text={this.state.data.get("text")}/>
            		</div>
            	</div>
            </div>
        );
    }
}

class Test extends React.Component {

    static propTypes = {
        text: React.PropTypes.string
    }

    static defaultProps = {
        text: null
    }

    constructor(props) {
        super(props);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("props: " + this.props + " -> " + nextProps + " -> " + (nextProps === this.props))
        console.log("state: " + this.state + " -> " + nextState + " -> " + (nextState === this.state))
        return nextProps !== this.props || nextState !== this.state;
    }

    render() {
        return(
            <span>{this.props.text}</span>
        );
    }
}