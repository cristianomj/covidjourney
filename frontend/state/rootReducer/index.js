import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import blogPosts from 'state/modules/blogPosts';
import auth from 'state/modules/auth';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  blogPosts,
  auth,
});

export default createRootReducer;
