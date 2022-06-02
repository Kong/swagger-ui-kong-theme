import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import FallbackPage from './fallbackPage';
import Configurator from './Configurator';
import SwaggerLoader from './SwaggerLoader';
import {Route as ROUTE} from './routes';

const App = () => {
    return (
        <React.Suspense fallback={<FallbackPage/>}>
            <BrowserRouter>
                <Routes>
                    <Route path={ROUTE.HOME} element={<Configurator/>}/>
                    {/*<Route path={Route.CONFIG} element={<SwaggerLoader/>}/>*/}
                </Routes>
            </BrowserRouter>
        </React.Suspense>
    )
}

export default App;
