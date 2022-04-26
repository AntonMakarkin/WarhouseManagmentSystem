import React, { useEffect, useState, useContext } from 'react';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import { Avatar, Typography, Container } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import FormatListBulletedSharpIcon from '@material-ui/icons/FormatListBulletedSharp';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { refresh } from '../../Actions/user';
import { clearData } from '../../Actions/controllers';

import Context from '../../Context/context';

import useStyles from './styles';

const SideBar = () => {
    const data = useSelector(state => state.data.items);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const { darkMode } = useContext(Context);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const match = useRouteMatch();
    const classes = useStyles();

    let avatar = `data:image/jpg;base64,${user?.avatar}`;
    avatar = avatar.replace(/^(javascript\:)/,"");

    const refreshToken = () => {
        dispatch(refresh(history))
    }

    useEffect(() => {
        if (data?.length) {
            dispatch(clearData());
        }
        //console.log(location)
        /*const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) refreshToken();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));*/
    }, [location])

    return (
        <aside className={classes.sidebar} style={darkMode ? {backgroundColor: '#1A202E', boxShadow: 'none'} : {backgroundColor: '#fff'}}>
            <Container disableGutters>
                <span className={classes.logo} style={darkMode ? {color: '#fff'} : {color: '#000'}}>UniShop</span>
                <Container disableGutters>
                    <Avatar className={classes.sidebarAvatar} variant="rounded" src={avatar} />
                    <Typography className={classes.sidebarUserName} align='center' style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        {!user ? <Skeleton/> : user?.name}
                    </Typography>
                    <Typography className={classes.sidebarUserPosition} align='center' style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        {!user ? <Skeleton/> : user?.position}
                    </Typography>
                </Container>
                <Container className={classes.sidebarLinksContainer} disableGutters>
                    <Link className={classes.sidebarLinkContainer} style={darkMode ? {color: '#fff'} : {color: '#000'}} to='/'>
                        <HomeTwoToneIcon className={classes.sidebarLinkIcon}/>
                        <Typography className={classes.sidebarLinkText}>Главная</Typography>
                    </Link>
                    <Link className={classes.sidebarLinkContainer} style={darkMode ? {color: '#fff'} : {color: '#000'}} to={`${match.url}/catalog`}>
                        <FormatListBulletedSharpIcon className={classes.sidebarLinkIcon}/>
                        <Typography className={classes.sidebarLinkText}>Каталог</Typography>
                    </Link>
                    <Link className={classes.sidebarLinkContainer} style={darkMode ? {color: '#fff'} : {color: '#000'}} to={`${match.url}/personal`}>
                        <PermIdentityIcon className={classes.sidebarLinkIcon}/>
                        <Typography className={classes.sidebarLinkText}>Персонал</Typography>
                    </Link>
                </Container>
            </Container>
        </aside>
    )
}

export default SideBar;
