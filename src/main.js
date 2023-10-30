import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import './index.css';
import './config/i18n/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { GoogleOAuthProvider } from '@react-oauth/google';

// https://duthanhduoc.com/blog/p5-giai-ngo-authentication-OAuth2
ReactDOM.render(
  <GoogleOAuthProvider clientId="284826516769-m68un90lufq46jkreg3ene4pvrkactk7.apps.googleusercontent.com">
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root'),
);
