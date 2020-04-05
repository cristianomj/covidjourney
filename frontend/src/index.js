import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import configureStore from 'state/configureStore';
import theme from 'styles/theme/mui';

import App from './App';

const store = configureStore();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
};

render();
