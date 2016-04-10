import Request from 'superagent';

export const INIT_APP = 'INIT_APP';
export function init() {
	return { type: INIT_APP }
}

/*** Club Action Creators ***/

export const REQUEST_CLUBS = 'REQUEST_CLUBS';
export function requestClubs() {
	return {
		type: REQUEST_CLUBS
	}
}

export const RECEIVE_CLUBS = 'RECEIVE_CLUBS';
export function receiveClubs(clubs) {
	return {
		type: RECEIVE_CLUBS,
		clubs,
		receivedAt: Date.now()
	}
}

export function fetchClubs(api) {

	// Thunk middleware knows how to handle functions.
	// It passes the dispatch method as an argument to the function,
	// thus making it able to dispatch actions itself.

	return (dispatch) => {
		// First dispatch: the app state is updated to inform
    	// that the API call is starting.
		dispatch(requestClubs({}));

		// The function called by the thunk middleware can return a value,
	    // that is passed on as the return value of the dispatch method.

	    // In this case, we return a promise to wait for.
	    // This is not required by thunk middleware, but it is convenient for us.
	    return Request
	    	.get('http://api.themoviedb.org/3/tv/on_the_air?api_key=0a85bfad58bfced1b7e4d5209aedd35b')
	    	.then(response => { 
	    		const clubs = response.body.results.map(club => { return { id: club.id, name: club.name } })
        		dispatch(receiveClubs(clubs))
	    	})

	    	// In a real world app, you also want to
      		// catch any error in the network call.
	};
}

const shouldFetchClubs = (state) => {
	const clubs = state.get("clubs");
	if(!clubs || clubs.size == 0) {
		return true;
	} else if(clubs.fetching) {
		return false;
	} else {
		return true
	}
}

export const fetchClubsIfNeeded = () => {
	return (dispatch, getState) => {
		if(shouldFetchClubs(getState())) {
			return dispatch(fetchClubs())
		}
	}
}