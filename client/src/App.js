import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from './Components/AuthPage/AuthPage';
import MainPage from './Components/MainPage/MainPage';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    {user ? <Redirect to="/dashboard"/> : <AuthPage />}
                </Route>
                <Route exact path="/dashboard" component={MainPage}/>
            </Switch>
        </BrowserRouter>    
    )
}

export default App;
