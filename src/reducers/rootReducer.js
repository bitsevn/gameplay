// redux-immutable: allows using immutbale object as react state (by default react expects state to be a plain js object)
import { combineReducers } from 'redux-immutable'
// react-router-redux routeReducer does not work with Immutable.js. You need to use a custom reducer
import routerReducer from './routerReducer'
import { List, Map, fromJS } from 'immutable';
import { 
	REQUEST_CLUBS, 
	RECEIVE_CLUBS, 
	REQUEST_EVENTS, 
	RECEIVE_EVENTS,
	REQUEST_PLAYERS,
	RECEIVE_PLAYERS 
} from '../constants/actions';

const clubs = (state={}, action) => {
	switch(action.type) {
		case REQUEST_CLUBS:
			return state.withMutations(map => map
				.set("fetching", true)
				.set("invalidated", false)
			);
		case RECEIVE_CLUBS:
			return state.withMutations(map => map
				.set("fetching", false)
				.set("invalidated", false)
				.set("items", fromJS(action.clubs))
				.set("lastUpdated", action.receivedAt)
			);
		default: return state;
	}
};


// Logs all actions and states after they are dispatched.
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

//Sends crash reports as state is updated and listeners are notified.
/*const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}*/

const rootReducer = combineReducers({
	clubs,
	logger,
	routing: routerReducer
	//crashReporter
});

export default rootReducer;