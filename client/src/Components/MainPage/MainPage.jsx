import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Switch, Route, useRouteMatch } from 'react-router';
import { useDispatch } from 'react-redux';
import { auth } from '../../Actions/user';

import { Grid, Container, Button, AppBar, Box, IconButton } from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import Context from '../../Context/context';

import SideBar from '../SideBar/SideBar';
import Modal from '../Modals/Modal'
import Home from '../Home/Home';
import LinkPage from '../Pages/LinkPage/LinkPage';
import DataPage from '../Pages/DataPage/DataPage';

import useStyles from './styles';

const MainPage = () => {
    const { darkMode } = useContext(Context);
    const dispatch = useDispatch();
    const location = useLocation();
    //const history = useHistory();
    const match = useRouteMatch();
    const classes = useStyles();

    //const sidebar = document.getElementsByTagName('aside');
    const linksArray = [{link: 'couriers', name: 'Курьеры'}];

    //you have to validate token in localstorage
    useEffect(() => {
        dispatch(auth());
    }, [dispatch])

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
                    <Route exact path={`${match.path}`} component={Home}/>
                    <Route exact path={`${match.path}/personal`} 
                        render={props => (<LinkPage {...props} header={'Персонал'} arrayOfLinks={linksArray} />)}/>
                    <Route exact path={`${match.path}/personal/couriers`}
                        render={props => (<DataPage {...props} header={linksArray[0].name} modal={Modal} modalHeader={'Добавить курьера'} />)}/>
                </Switch>
            </Container>
        </Container>
    )
}

export default MainPage
