import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { auth } from './Actions/user';

import { CssBaseline, createTheme, Switch as SwitchButton } from '@material-ui/core';

import ThemeProvider from './Context/context';

import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';

import AuthPage from './Components/AuthPage/AuthPage';
import MainPage from './Components/MainPage/MainPage';
import SideBar from './Components/SideBar/SideBar';

const App = () => {
    //const isAuth = JSON.parse(localStorage.getItem('token'));
    const isAuth = useSelector(state => state.user.isAuth);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        /*if (darkMode) {
            document.body.style.background = 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(26,32,46,1) 100%)'
        } else {
            document.body.style.background = 'linear-gradient(252.44deg, #16BDE7 0%, #2746D8 100%)'
        }*/
        //const theme = localStorage.getItem('darkTheme');

        /*if (theme) {
            const themePreference = localStorage.getItem('darkTheme')
            if (themePreference === "true") {
                setDarkMode(true);
                document.body.style.background = 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(26,32,46,1) 100%)'
            } else {
                setDarkMode(false);
                document.body.style.background = 'linear-gradient(252.44deg, #16BDE7 0%, #2746D8 100%)'
            }
        } else {
            localStorage.setItem('darkTheme', "false");
            setDarkMode(false);
            document.body.style.background = 'linear-gradient(252.44deg, #16BDE7 0%, #2746D8 100%)'
        }*/
        dispatch(auth());

    }, [dispatch]);

    return (
        <ThemeProvider.Provider value={{darkMode, setDarkMode}}>
            <BrowserRouter>
            <CssBaseline/>
            <Switch>
                <Route path="/login">
                    <AuthPage/>
                </Route>
                <ProtectedRoute path="/dashboard">
                    <MainPage/>
                </ProtectedRoute>
                <Route exact path="/">
                    <Redirect exact from="/" to="/dashboard" />
                </Route>
           </Switch>
           </BrowserRouter>
        </ThemeProvider.Provider>    
    )
}

export default App;
