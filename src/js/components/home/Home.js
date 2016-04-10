import React from "react";
import ToDoList from "./ToDoList";

export default class Home extends React.Component {
    
    render() {
        return (
            <div>
                <h3>Welcome to Gamifier!</h3>
                <div className="row">
                	<div className="col-md-3">
                		<ToDoList/>
                	</div>
                </div>
            </div>
        );
    }
}