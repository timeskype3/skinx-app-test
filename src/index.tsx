import React from 'react';
import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

const AppWithRouter = () => (
  <Router>
    <ConfigProvider
      theme={{ token: { colorPrimary: '#f3a6a6', colorInfo: '#57cac0' } }}
    >
      <App />
    </ConfigProvider>
  </Router>
)

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <AppWithRouter />
    </QueryClientProvider>
  </Provider>
);