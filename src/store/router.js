//这个文件 在启用 react-router-redux 时有用。

import { createStore, combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';


const reducer = (state = '/', action) => {
  // console.log('state', state);
  // console.log('action', action);
  const {payload} = action;
  if(payload){
    return payload.pathname;
  }
  return state;
};

export default createStore(combineReducers({
  parentPath: reducer,
  routing: routerReducer
}));
