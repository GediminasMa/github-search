import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from '@auth0/auth0-react';
import { store } from './context/store';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-nlay-tty.us.auth0.com'
      clientId='OXFYDlwvcEmB6vC6UdViLElOG9vDaFfP'
      redirectUri={window.location.origin}
      cacheLocation='localstorage'
    >
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0Provider>
  </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
