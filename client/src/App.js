import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import AuthPage from './Components/AuthPage/AuthPage';
import MainPage from './Components/MainPage/MainPage';

const App = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={() => <Redirect to="/dashboard" />}/>
                <Route path="/dashboard" exact component={MainPage}/>
                <Route path="/auth" exact component={() => (!user ? <AuthPage/> : <Redirect to="/dashboard"/>)}/>
            </Switch>
        </BrowserRouter>    
    )
}

export default App;
