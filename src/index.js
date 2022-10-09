import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {Provider} from 'react-redux'
import { store } from './redux/store'
import {BrowserRouter as Router} from 'react-router-dom'
import {MoralisProvider} from 'react-moralis'
import {ApolloProvider} from '@apollo/client'
import { apolloClient } from './graphql/apolo/apoloClient';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <MoralisProvider appId="IJhM2iOMPsr9DBMdVIW2Sm1oYDlr8y6qJbVzp79D" serverUrl="https://xgctflxeycdz.usemoralis.com:2053/server">
      <Router>
      <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
    </Router>
    </MoralisProvider>
    </Provider>
    
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

