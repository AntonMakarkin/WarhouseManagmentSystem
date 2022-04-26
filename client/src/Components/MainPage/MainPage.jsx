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
import CategoriesLogo from '../../SvgIcons/CategoriesLogo';
import BrandsLogo from '../../SvgIcons/BrandsLogo';
import GoodsLogo from '../../SvgIcons/GoodsLogo';

import { logout } from '../../Actions/user';

import { getItems, getItemsBySearch, createItem, updateItem, deleteItem, getItemById } from '../../Actions/controllers';

import Context from '../../Context/context';

import SideBar from '../SideBar/SideBar';
//import Modal from '../Modals/Modal'
import Home from '../Home/Home';
import LinkPage from '../Pages/LinkPage/LinkPage';
import DataPage from '../Pages/DataPage/DataPage';
import AddPage from '../Pages/AddPage/AddPage';
import DetailsPage from '../Pages/DetailsPage/DetailsPage';
import ChangeDetailsPage from '../Pages/ChangeDetailsPage/ChangeDetailsPage';


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
    //const pageArray = [{link: 'catalog', name: 'Каталог'}, {link: 'personal', name: 'Персонал'}];

    const linksArray = [{link: 'couriers', type: 'personal', name: 'Курьеры', addName: 'курьера', logo: <DeliverLogo width="50px" height="50px" fill={fill}/>}, 
    {link: 'managers', type: 'personal', name: 'Менеджеры', addName: 'менеджера', logo: <ManagerLogo width="50px" height="50px" fill={fill}/>},
    {link: 'storekeepers', type: 'personal', name: 'Кладовщики', addName: 'кладовщика', logo: <StoreKeeperLogo width="50px" height="50px" fill={fill}/>},
    {link: 'customers', type: 'personal', name: 'Клиенты', addName: 'клиента', logo: <CustomerLogo width="50px" height="50px" fill={fill}/>}];

    const catalogLinksArray = [{link: 'categories', type: 'catalog', name: 'Категории', addName: 'категорию', infoName: 'категории', changeName: 'Изменить данные о категории', logo: <CategoriesLogo width="50px" height="50px" fill={fill}/>},
                             {link: 'brands', type: 'catalog', name: 'Бренды', addName: 'бренд', infoName: 'бренде', changeName: 'Изменить данные о бренде', logo: <BrandsLogo width="50px" height="50px" fill={fill}/>},
                             {link: 'goods', type: 'catalog', name: 'Товары', addName: 'товар', infoName: 'товаре', changeName: 'Изменить данные о товаре', logo: <GoodsLogo width="50px" height="50px" fill={fill}/>}]

    const pageArray = [{link: 'catalog', name: 'Каталог'}, {link: 'personal', name: 'Персонал'}];

    const employeeHeaderPage = 'Информация о сотруднике'
    const employeeChangeDataHeader = 'Изменить данные о сотруднике'

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
                    <Route exact path={`${match.path}/personal`} render={props => (<LinkPage {...props} header="Персонал" arrayOfLinks={linksArray}/>)}/>
                    <Route exact path={`${match.path}/catalog`} render={props => (<LinkPage {...props} header="Каталог" arrayOfLinks={catalogLinksArray}/>)}/>
                    {linksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}`}
                            render={props => (<DataPage {...props} header={item.name}
                                                                   searchAction={getItemsBySearch}
                                                                   getAllAction={getItems}
                                                                   deleteAction={deleteItem}
                                                                   collectionName={item.link}/>)}/>
                    ))}
                    {catalogLinksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}`}
                            render={props => (<DataPage {...props} header={item.name}
                                                                   getAllAction={getItems}
                                                                   collectionName={item.link}
                                                                   deleteAction={deleteItem}/>)}/>
                    ))}
                    {linksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}/add`}
                            render={props => (<AddPage {...props} header={item.addName}
                                                                  createAction={createItem}
                                                                  collectionName={item.link}/>)}/>
                    ))}
                    {catalogLinksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}/add`}
                            render={props => (<AddPage {...props} header={item.addName}
                                                                  createAction={createItem}
                                                                  collectionName={item.link}/>)}/>
                    ))}
                    {linksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}/:id`}
                            render={props => (<DetailsPage {...props} header={employeeHeaderPage}
                                                                      collectionName={item.link}/>)}/>
                    ))}
                    {catalogLinksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}/:id`}
                            render={props => (<DetailsPage {...props} header={item.infoName}
                                                                      collectionName={item.link}/>)}/>
                    ))}
                    {linksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}/changedata/:id`}
                            render={props => (<ChangeDetailsPage {...props} header={employeeChangeDataHeader}
                                                                            updateAction={updateItem}
                                                                            getItemById={getItemById}
                                                                            collectionName={item.link}
                                                                            collectionType='personal'/>)}/>
                    ))}
                    {catalogLinksArray.map((item, i) => (
                        <Route key={i} exact path={`${match.path}/${item.type}/${item.link}/changedata/:id`}
                            render={props => (<ChangeDetailsPage {...props} header={item.changeName}
                                                                            updateAction={updateItem}
                                                                            getItemById={getItemById}
                                                                            collectionName={item.link}
                                                                            collectionType='catalog'/>)}/>
                    ))}
                </Switch>
            </Container>
        </Container>
    )
}

export default MainPage
