/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter
} from 'react-router-dom';

import EmailForm from './components/emailForm';
import VerifyEmail from './components/verifyEmailForm';
import './app.css';
import './fonts/DMSerifDisplay-Regular.ttf';
import './images/Flowers.png';
import './images/Flowers-darkmode.png';

let qs = require('qs');

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
  // dark mode
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { document.body.classList.add('dark-mode'); });
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { document.body.classList.remove('dark-mode'); });

export class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* <Route
            path="/verifyEmail"
            component={<VerifyEmail token={qs.parse(props.location.search)}/>}
          /> */}
          <Route path="/verifyEmail">
            <VerifyEmail queryParam={qs.parse(location.search, { ignoreQueryPrefix: true })} />
          </Route>
          <Route exact path="/">
            <div>
              <h1> Take your meds, bitch.</h1>
              <div>
                <EmailForm />
              </div>
            </div>
          </Route>
          <Route path="*">
            <div>
              <h4> 404 Not found</h4>
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default withRouter(App);
