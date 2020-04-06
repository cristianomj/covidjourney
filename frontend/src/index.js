import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import configureStore, { history } from 'state/configureStore';
import theme from 'styles/theme/mui';
import Header from 'components/Header';
import Footer from 'components/Footer';

import App from './App';
import AuthDataProvider from "components/AuthDataProvider";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router history={history}>
        <AuthDataProvider>
          <Header />
          <App />
          <Footer />
        </AuthDataProvider>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
