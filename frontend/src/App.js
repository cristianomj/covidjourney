import React from 'react';
import { Router, Route } from 'react-router-dom'

import { createBrowserHistory, createMemoryHistory } from 'history';

const history = typeof window !== 'undefined' ? createBrowserHistory() : createMemoryHistory();

import Test from './components/App';
import Test2 from './components/App2';

export default function App() {
  return (
    <Router history={history}>
      <>
        <Route exact path="/" component={Test} />
        <Route exact path="/test" component={Test2} />
      </>
    </Router>
  );
}
