import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import App from './App';

const history = createBrowserHistory();

// Listen for changes to the current location.
const unlisten = history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state);
  console.log(location.pathname);
  if (location.pathname === '/' || location.pathname === '/verifyEmail') {
    document.body.classList.add('flowers');
  } else {
    document.body.classList.remove('flowers');
  }
});

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById('root')
);
