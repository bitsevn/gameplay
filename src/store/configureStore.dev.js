import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers/rootReducer'
import DevTools from '../containers/DevTools'

const loggerMiddleware = createLogger();

const enhancer = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
);

export default function configureStore(initialState) {
  const store = createStore(
  	rootReducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
    enhancer
  );
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () =>
      store.replaceReducer(require('../reducers/rootReducer').default)
    );
  }
  return store;
}
