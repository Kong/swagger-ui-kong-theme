import React from "react";
import {render} from 'react-dom';
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";
import {BrowserRouter} from "react-router-dom";


const root = document.getElementById('root');
if (!root) {
    throw new Error("Root element not found. Unable to render");
}

if (root) {
    render(
        <BrowserRouter>
            <App/>
        </BrowserRouter>, root
    )
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
