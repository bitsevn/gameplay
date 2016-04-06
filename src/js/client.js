import React from "react";
import { render } from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import AppContainer from "./components/layout/AppContainer";
import Home from "./components/home/Home";
import ClubContainer from "./components/clubs/ClubContainer";
import GlobalPlayerList from "./components/players/GlobalPlayerList";
import EventList from "./components/events/EventList";

const app = document.getElementById('app');

render(
	<Router history={hashHistory}>
	    <Route path="/" component={AppContainer}>
	    	<IndexRoute component={Home}></IndexRoute>
	      	<Route name="clubs" path="clubs" component={ClubContainer}></Route>
	      	<Route name="players" path="players" component={GlobalPlayerList}></Route>
	      	<Route name="events" path="events" component={EventList}></Route>
	    </Route>
	</Router>
	, app); 
