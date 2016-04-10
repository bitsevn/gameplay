import React from "react";
import { List, Map } from "immutable";

export default class ToDoList extends React.Component {

	static propTypes = {
        callback: React.PropTypes.func
    }

    static defaultProps = {
    	callback: null
    }

	constructor(props) {
		super(props);
		this.state = { data: Map({ todos: List(), filter: "All" }) };
	}

	setImmutableState(fn) {
	    return this.setState(({data}) => ({ data: fn(data) }));
	}

	callback(todo) {
		if(this.props.callback) this.props.callback(todo);
		this.setImmutableState(d => d.update("todos", list => list.update(
				list.findIndex(item => item === todo), item => 
				item.withMutations(map => map.set("completed", !map.get("completed")))
			)));
	}

	add(e) {
		let todoText = e.target.value;
		// onEnter
		if((e.keyCode == 13) && todoText && (todoText=todoText.trim()).length > 0) {
			e.target.value = '';
			const todo = Map({ text: todoText, completed: false, lastUpdated: Date.now() });
			this.setImmutableState(d => d.withMutations(map => map.update("todos", list => list.push(todo)).update("text", v => "")));
		}
	}

	filter(filter) {
		if(this.state.data.get("filter") != filter) {
			this.setImmutableState(d => d.update("filter", filter))
		}
	}

	render() {
		let cnt = 1;
		const filter = this.state.data.get("filter");
		const todos = this.state.data.get("todos")
				.filter(todo => filter == 'Uncompleted' ? !todo.completed : filter == 'Completed' ? todo.completed : true )
				.sort((a, b) => a.get("lastUpdated") <= b.get("lastUpdated"))
				.map(todo => <ToDo key={`todo-${cnt++}`} todo={todo} callback={() => { this.callback(todo) }}/> );
		return(
			<div className="list-group">
			  <a href="javascript: void(0)" className="list-group-item active">
			    <input type="text" className="form-control" placeholder="What needs to be done?" 
			    	onKeyDown={ (e) => this.add(e) }/>
			  </a>
			  { todos }
			</div>
		);
	}
}


class ToDo extends React.Component {

	static propTypes = {
        todo: React.PropTypes.instanceOf(Map).isRequired,
        callback: React.PropTypes.func.isRequired
    }

    static defaultProps = {
    	todo: null,
    	callback: null
    }

	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		console.log("props: " + this.props + " -> " + nextProps + " -> " + (nextProps === this.props))
		console.log("state: " + this.state + " -> " + nextState + " -> " + (nextState === this.state))
		return nextProps.todo !== this.props.todo || nextState !== this.state;
	}

	callback(todo) {
		if(this.props.callback) this.props.callback(todo);
	}

	render() {
		const todo = this.props.todo;
		return(
			<a href="javascript: void(0)" className="list-group-item" onClick={() => { this.callback(todo) }}>
				{todo.get("text")} { todo.get("completed") ? <span className="fa fa-check pull-right"></span> : null }
			</a>
		);
	}
}