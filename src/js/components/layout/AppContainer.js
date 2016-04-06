import React from "react";
import { Link, IndexLink } from "react-router";
import { Map } from "immutable";

export default class AppContainer extends React.Component {
    
    constructor() {
        super()
        this.state = { data: Map({navigated: true}) };
    }

    setImmutableState(fn) {
        return this.setState(({data}) => ({ data: fn(data) }))
    }
    
    navigate() {
        this.setImmutableState(d => d.update("navigated", v => !this.state.data.get("navigated")));
    }
    
    render() {
        const { location } = this.props;
        const clubsClass = location.pathname.match(/^\/clubs/) ? "active" : "";
        const eventsClass = location.pathname.match(/^\/events/) ? "active" : "";
        const playersClass = location.pathname.match(/^\/players/) ? "active" : "";
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <IndexLink to="/" onClick={ () => { this.navigate(); } } className="navbar-brand">Gamifier</IndexLink>
                        </div>
                        <div className="nav navbar-nav">
                            <li className={ clubsClass }>
                                <Link to="clubs" onClick={ () => { this.navigate(); } }>Clubs</Link>
                            </li>
                            <li className={ playersClass }>
                                <Link to="players" onClick={ () => { this.navigate(); } }>Players</Link>
                            </li>
                            <li className={ eventsClass }>
                                <Link to="events" onClick={ () => { this.navigate(); } }>Events</Link>
                            </li>
                        </div>
                    </div>
                </nav>
                <div className="container app-body">
                    { this.props.children }
                </div>
            </div>
        );
    }
}