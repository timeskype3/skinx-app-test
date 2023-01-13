import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
)

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <AppWithRouter />
    </React.StrictMode>
  </Provider>
);