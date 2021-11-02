import React from 'react';
import { useHistory, Switch, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import { Grid, Container, Button } from '@material-ui/core';

import { logout } from '../../Actions/user';
import SideBar from '../SideBar/SideBar';

import useStyles from './styles';

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.mainContainer}>
        <SideBar/>
        <div className={classes.secondaryContainer}>
            <p>Hello</p>
            <Switch>
                <Route/>
            </Switch>
        </div>
        </div>
    )
}

export default MainPage
