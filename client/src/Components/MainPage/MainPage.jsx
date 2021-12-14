import React, { useState, useContext } from 'react';
import { useHistory, Switch, Route } from 'react-router';
import { useDispatch } from 'react-redux';

import { Grid, Container, Button, AppBar, Box, IconButton } from '@material-ui/core';

import CropFreeIcon from '@material-ui/icons/CropFree';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { logout } from '../../Actions/user';

import Context from '../../Context/context';

import SideBar from '../SideBar/SideBar';
import Home from '../Home/Home';

import useStyles from './styles';

const MainPage = () => {
    const { darkMode } = useContext(Context);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const sidebar = document.getElementsByTagName('aside');
    
    const [hideSidebar, setHideSidebar] = useState(false)

    const setHideSidebarHandler = () => {

    };

    return (
        <Container className={classes.mainContainer} disableGutters maxWidth={false}>
            <SideBar/>
            <Container className={classes.secondaryContainer} disableGutters maxWidth={false} style={darkMode ? {backgroundColor: '#232b3e'} : {color: '#f0f3fb'}}>
                <AppBar position="static" className={classes.appBar} style={!darkMode ? {backgroundColor: '#fff'} : {backgroundColor: '#1A202E', boxShadow: 'none'}}>
                    <Box>
                        <IconButton className={classes.appBarButton}>
                            <ArrowBackIosIcon/>
                        </IconButton>
                    </Box>
                </AppBar>
                <Switch>
                    <Route exact path="/" component={Home}/>
                </Switch>
            </Container>
        </Container>
    )
}

export default MainPage
