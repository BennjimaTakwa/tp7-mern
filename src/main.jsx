import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    {/* TODO Volet 1 - Etape 1 : Envelopper <App /> dans <BrowserRouter> */}
    <App />
    </BrowserRouter>
  </React.StrictMode>
);
