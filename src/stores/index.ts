import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import reducers from '../reducers/index';
import { IRootState, IRootAction } from '../roots';

const composeEnhancers = process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk as ThunkMiddleware<IRootState, IRootAction>)
));

export default store;