import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { auth } from './Actions/user';

import { Grid } from '@material-ui/core';

import AuthPage from './Components/AuthPage/AuthPage';
import MainPage from './Components/MainPage/MainPage';
import SideBar from './Components/SideBar/SideBar';

const App = () => {
    //const isAuth = JSON.parse(localStorage.getItem('token'));
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();
    const history = useHistory(); 

    useEffect(() => {
        dispatch(auth())
    }, []);

    return (
        <BrowserRouter>
            <Switch>
               <Route exact path="/">
                    {isAuth ? <Redirect to="/dashboard"/> : <AuthPage />}
               </Route>
               <Route exact path="/dashboard" component={MainPage}/>
           </Switch>
        </BrowserRouter>    
    )
}

export default App;
