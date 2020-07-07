import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import AuthProvider from './providers/AuthProvider/AuthProvider';
import InvoicesProvider from './providers/InvoicesProvider/InvoicesProvider';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <InvoicesProvider>
        <App />
      </InvoicesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
