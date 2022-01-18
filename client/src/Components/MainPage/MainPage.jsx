import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Switch, Route, useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { Grid, Container, Button, AppBar, Box, IconButton, Switch as SwitchButton } from '@material-ui/core';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import NightsStay from '@material-ui/icons/NightsStay';
import LightMode from '@material-ui/icons/WbSunny'
import DeliverLogo from '../../SvgIcons/CourierLogo'
import ManagerLogo from '../../SvgIcons/ManagerLogo';
import StoreKeeperLogo from '../../SvgIcons/StoreKeeperLogo';
import CustomerLogo from '../../SvgIcons/CustomerLogo';

import { logout } from '../../Actions/user';

import Context from '../../Context/context';

import SideBar from '../SideBar/SideBar';
import Modal from '../Modals/Modal'
import Home from '../Home/Home';
import LinkPage from '../Pages/LinkPage/LinkPage';
import DataPage from '../Pages/DataPage/DataPage';

import useStyles from './styles';

const MainPage = () => {
    const { darkMode, setDarkMode } = useContext(Context);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const classes = useStyles();

    const fill = darkMode ? '#fff' : '#000';

    //const sidebar = document.getElementsByTagName('aside');
    const linksArray = [{link: 'couriers', name: 'Курьеры', logo: <DeliverLogo width="50px" height="50px" fill={fill}/>}, 
    {link: 'managers', name: 'Менеджеры', logo: <ManagerLogo width="50px" height="50px" fill={fill}/>},
    {link: 'storekeepers', name: 'Кладовщики', logo: <StoreKeeperLogo width="50px" height="50px" fill={fill}/>},
    {link: 'customers', name: 'Клиенты', logo: <CustomerLogo width="50px" height="50px" fill={fill}/>}];

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkTheme', !darkMode);
    }

    const handleLogout = () => {
        dispatch(logout(history));
    }

    return (
        <Container className={classes.mainContainer} disableGutters maxWidth={false}>
            <SideBar/>
            <Container className={classes.secondaryContainer} disableGutters maxWidth={false} style={darkMode ? {backgroundColor: '#232b3e'} : {color: '#f0f3fb'}}>
                <AppBar position="static" className={classes.appBar} style={!darkMode ? {backgroundColor: '#fff'} : {backgroundColor: '#1A202E', boxShadow: 'none'}}>
                    <IconButton className={classes.appBarButton}>
                        <ArrowBackIosIcon/>
                    </IconButton>
                    <Box className={classes.appBarButtonBox}>
                        <Box className={classes.darkThemeButton}>
                            <LightMode style={darkMode ? {color: '#fff'} : {color: '#000'}}/>
                            <SwitchButton color="default" checked={darkMode} onChange={handleDarkMode}/>
                            <NightsStay style={darkMode ? {color: '#fff'} : {color: '#000'}}/>
                        </Box>
                        <IconButton className={classes.appBarButton} onClick={handleLogout}>
                            <LogoutIcon style={darkMode ? {color: '#fff'} : {color: '#000'}} className={classes.logoutButtonIcon}/>
                        </IconButton>
                    </Box>
                </AppBar>
                <Switch>
                    <Route exact path={`${match.path}`} component={Home}/>
                    <Route exact path={`${match.path}/catalog`}
                        render={props => (<LinkPage {...props} header={'Каталог'} arrayOfLinks={linksArray} />)}/>
                    <Route exact path={`${match.path}/personal`} 
                        render={props => (<LinkPage {...props} header={'Персонал'} arrayOfLinks={linksArray} />)}/>
                    <Route exact path={`${match.path}/personal/couriers`}
                        render={props => (<DataPage {...props} header={linksArray[0].name} modal={Modal} modalHeader={'Добавить курьера'} />)}/>
                    <Route exact path={`${match.path}/personal/managers`}
                        render={props => (<DataPage {...props} header={linksArray[1].name} modal={Modal} modalHeader={'Добавить менеджера'} />)}/>
                    <Route exact path={`${match.path}/personal/storekeepers`}
                        render={props => (<DataPage {...props} header={linksArray[2].name} modal={Modal} modalHeader={'Добавить кладовщика'} />)}/>
                    <Route exact path={`${match.path}/personal/customers`}
                        render={props => (<DataPage {...props} header={linksArray[3].name} modal={Modal} modalHeader={'Добавить клиента'} />)}/>
                </Switch>
            </Container>
        </Container>
    )
}

export default MainPage
