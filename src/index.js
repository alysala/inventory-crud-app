import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios'

// When using CORS and utilizing cookies this must flag must be true for all axios requests
axios.defaults.withCredentials = true;

const root = document.getElementById('root'); // <- This is the correct method call for React version 17
render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  root
);
