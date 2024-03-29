import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './components/App';
import rootReducer from './reducers';

//curriedfunction lo(gger(obj, next, action)
//logger (obj)(next)(action)
// const logger = function({dispatch, action}){
//   return function(next){
//     return function(action){
//       //middleware code
//       console.log('ACTION_TYPE = ', action.type);
//       next(action);
//     }
//   }
// }

const logger = ({dispatch, action }) => (next) => (action) => {

  if(typeof action !== 'function') {
    console.log('ACTION_TYPE = ', action.type);
  }
  next(action);
}

// const thunk = ({dispatch, action }) => (next) => (action) => {

//   if(typeof action === 'function'){
//     // console.log('ACTION_TYPE = ', action.type);
//     action(dispatch);
//     return;
//   }
//   next(action);
// }

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log('Store', store);
// console.log('Before Store', store.getState());

// store.dispatch({
//   type : 'ADD_MOVIES',
//   movies : [{ name : 'Superman'}]
// });

// console.log('After Store', store.getState());

ReactDOM.render(<App store={ store } />, document.getElementById('root'));

