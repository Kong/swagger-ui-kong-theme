import React from 'react';
import './App.css';
import {Route as ROUTE} from './routes';
import {
    Routes,
    Route,
} from 'react-router-dom';
import SwaggerConfigurator from './SwaggerConfigurator';
import SwaggerLoader from "./SwaggerLoader";


const App = () => {
    return (
            <Routes>
                <Route path={ROUTE.HOME} element={<SwaggerConfigurator/>}/>
                <Route path={ROUTE.CONFIG} element={<SwaggerLoader/>}/>
            </Routes>
    );
}

export default App;
