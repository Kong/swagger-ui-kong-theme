import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import {BrowserRouter} from "react-router-dom";

const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error('Root element not found. Unable to render');
}

ReactDOM.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
    , rootElement);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
