import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import {Link, IndexLink} from "react-router";
import classNames from 'classnames';

export default class BaseRoute extends React.Component {

    render() {
        return(
            <div>
                <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                    <div className="container">
                        <div className="navbar-header">
                            <IndexLink to="/" className="navbar-brand">Gamifier</IndexLink>
                        </div>
                        <div className="nav navbar-nav">
                            <NavItem to="/clubs" title="Clubs"/>
                            <NavItem to="/players" title="Players"/>
                            <NavItem to="/events" title="Events"/>
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

class NavItem extends React.Component {

    static contextTypes = {
        router: function() { return React.PropTypes.func.isRequired; }
    }

    static propTypes = {
        to: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }

    render() {
        var { router } = this.context;
        var isActive = router.isActive(this.props.to, this.props.params, this.props.query);
        return(
            <li className={classNames({
                active: isActive
            })}>
                <Link to={this.props.to}>{this.props.title}</Link>
            </li>
        );
    }
}