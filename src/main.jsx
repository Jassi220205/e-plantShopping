// src/main.jsx or src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux'; // Step 1
import store from './store'; // Step 2

// Step 3: Wrap App with Provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
