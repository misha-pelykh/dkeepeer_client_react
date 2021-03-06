import { 
  createStore, 
  applyMiddleware }            from 'redux';
import thunk                   from 'redux-thunk';
import createLogger            from 'redux-logger';
import { ROUTER_STATE_CHANGE } from '../constants/actions';
import reducer                 from '../reducers';

export function createRedux(initialState) {
  let middleware = [thunk];
  let reduxDevtools;

  if (process.env.NODE_ENV !== 'production') {
    reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
    
    middleware.push(createLogger({
      collapsed: true,
      predicate: (getState, action) => !(action.type === ROUTER_STATE_CHANGE)
    }));
  }

  const finalCreateStore = applyMiddleware(...middleware)(createStore);
  const store = finalCreateStore(
    reducer, 
    initialState, 
    reduxDevtools
  );

  if (module.hot) {
    const nextReducer = require('../reducers');
    module.hot.accept('../reducers',
      () => { store.replaceReducer(nextReducer); });
  }

  return store;
}
