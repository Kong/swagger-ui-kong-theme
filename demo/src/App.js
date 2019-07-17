import React from 'react';
import SwaggerLoader from './SwaggerLoader';
import Configerator from './Configerator'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router className="App">
      <Route component={SwaggerLoader} path="/swagger/:specUrl/:config" />
      <Route exact component={Configerator} path="/" />

    </Router>
  );
}


export default App;
