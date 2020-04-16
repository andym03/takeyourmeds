/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import EmailForm from './components/emailForm';
import './app.css';
import './fonts/DMSerifDisplay-Regular.ttf';
import './images/Flowers.png';
import './images/Flowers-darkmode.png';

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.classList.add('dark-mode');
  // dark mode
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { document.body.classList.add('dark-mode'); });
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => { document.body.classList.remove('dark-mode'); });

export default class App extends Component {
  render() {
    return (
      <div>
        <h1> Take your meds, bitch.</h1>
        <div>
          <EmailForm />
        </div>
      </div>
    );
  }
}
