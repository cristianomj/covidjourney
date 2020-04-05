import React from 'react';
import { Router, Route } from 'react-router-dom'

import { createBrowserHistory, createMemoryHistory } from 'history';

const history = typeof window !== 'undefined' ? createBrowserHistory() : createMemoryHistory();

import BlogPost from './BlogPost';

export default function App() {
  return (
    <Router history={history}>
      <>
        <Route exact path="/post/:id" component={BlogPost} />
      </>
    </Router>
  );
}
