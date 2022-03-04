import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Switch, Route, useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

import { getPersonal } from '../../Actions/controllers';
import { getPersonalBySearch } from '../../Actions/controllers';
import { createPersonal } from '../../Actions/controllers';
import { deletePersonal } from '../../Actions/controllers';

import Context from '../../Context/context';

import SideBar from '../SideBar/SideBar';
//import Modal from '../Modals/Modal'
import Home from '../Home/Home';
import LinkPage from '../Pages/LinkPage/LinkPage';
import DataPage from '../Pages/DataPage/DataPage';
import AddPage from '../Pages/AddPage/AddPage';
import DetailsPage from '../Pages/DetailsPage/DetailsPage';

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
    const pageArray = [{link: 'catalog', name: 'Каталог'}, {link: 'personal', name: 'Персонал'}];

    const linksArray = [{link: 'couriers', type: 'personal', name: 'Курьеры', addName: 'курьера', logo: <DeliverLogo width="50px" height="50px" fill={fill}/>}, 
    {link: 'managers', type: 'personal', name: 'Менеджеры', addName: 'менеджера', logo: <ManagerLogo width="50px" height="50px" fill={fill}/>},
    {link: 'storekeepers', type: 'personal', name: 'Кладовщики', addName: 'кладовщика', logo: <StoreKeeperLogo width="50px" height="50px" fill={fill}/>},
    {link: 'customers', type: 'personal', name: 'Клиенты', addName: 'клиента', logo: <CustomerLogo width="50px" height="50px" fill={fill}/>}];

    const employeeHeaderPage = 'Информация о сотруднике'

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
                    {pageArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.link}`}
                            render={props => (<LinkPage {...props} header={`${item.name}`} arrayOfLinks={linksArray}/>)}/>
                    ))}
                    {linksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}`}
                            render={props => (<DataPage {...props} header={item.name}
                                                                   searchAction={getPersonalBySearch}
                                                                   getAllAction={getPersonal}
                                                                   deleteAction={deletePersonal}
                                                                   collectionName={item.link}/>)}/>
                    ))}
                    {linksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}/add`}
                            render={props => (<AddPage {...props} header={item.addName}
                                                                  createAction={createPersonal}
                                                                  collectionName={item.link}/>)}/>
                    ))}
                    {linksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}/:id`}
                            render={props => (<DetailsPage {...props} header={employeeHeaderPage}
                                                                      collectionName={item.link}/>)}/>
                    ))}
                </Switch>
            </Container>
        </Container>
    )
}

export default MainPage
