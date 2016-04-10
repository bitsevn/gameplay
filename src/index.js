import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory, browserHistory } from 'react-router'
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './store/configureStore.dev';
import { List, Map } from 'immutable';
import { IndexRoute, Route } from 'react-router';
import BaseRoute from "./routes/BaseRoute";
import HomeRoute from "./routes/HomeRoute";
import ClubsRoute from "./routes/ClubsRoute";
import PlayersRoute from "./routes/PlayersRoute";
import EventsRoute from "./routes/EventsRoute";
import NotFoundRoute from "./routes/NotFoundRoute";
import DevTools from './containers/DevTools';

const initialState = Map({
	clubs: Map({
		fetching: false,
		invalidated: false,
		lastUpdated: 1439478405547,
		items: List()
	})
})

const store = configureStore(initialState);
//console.log("process.env.NODE_ENV: " + process.env.NODE_ENV)

const history = (process.env.NODE_ENV === 'production') ? browserHistory : hashHistory;
/*const history = syncHistoryWithStore(
	//(process.env.NODE_ENV === 'production') ? browserHistory : hashHistory,
	hashHistory,
	store	
);*/

const dev = (process.env.NODE_ENV !== 'production')

render(
	<Provider store={store}>
		<div>
			<Router history={history}>
				<Route path="/" component={BaseRoute}>
	      			<IndexRoute component={HomeRoute}></IndexRoute>
	      			<Route name="clubs" path="clubs" component={ClubsRoute}></Route>
			      <Route name="players" path="players" component={PlayersRoute}></Route>
			      <Route name="events" path="events" component={EventsRoute}></Route>

			      <Route path="*" component={NotFoundRoute} />
	      		</Route>
			</Router>
			<DevTools/>
		</div>
	</Provider>, 
	document.getElementById('app')
);