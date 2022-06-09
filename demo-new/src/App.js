import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import SwaggerConfigurator from "./SwaggerConfigurator";
import SwaggerSpec from "./SwaggerSpec";
import {Route as ROUTE} from './routes';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE.HOME} element={<SwaggerConfigurator/>}/>
          <Route path={ROUTE.CONFIG} element={<SwaggerSpec/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
