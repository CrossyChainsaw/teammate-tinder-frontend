import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Swiping from './swiping/swiping'; // Import the Swiping component

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes> 
        <Route path="/" Component={App} /> {/* Define a route for the App component */}
        <Route path="/swiping" Component={Swiping} /> {/* Define a route for the Swiping component */}
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
