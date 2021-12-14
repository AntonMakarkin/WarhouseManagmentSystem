import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Typography, Container } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import FormatListBulletedSharpIcon from '@material-ui/icons/FormatListBulletedSharp';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';

import { logout } from '../../Actions/user';

import Context from '../../Context/context';

import useStyles from './styles';

const SideBar = () => {
    const user = useSelector(state => state.user.currentUser);
    const { darkMode, setDarkMode } = useContext(Context);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    let avatar = `data:image/jpg;base64,${user?.avatar}`;
    avatar = avatar.replace(/^(javascript\:)/,"");

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkTheme', !darkMode);
    }

    const handleSubmit = () => {
        dispatch(logout(history));
    }

    return (
        <aside className={classes.sidebar} style={darkMode ? {backgroundColor: '#1A202E', boxShadow: 'none', borderRight: '1px solid #1A202E'} : {backgroundColor: '#fff'}}>
            <Container disableGutters>
                <span className={classes.logo} style={darkMode ? {color: '#fff'} : {color: '#000'}}>UniShop</span>
                <Container disableGutters>
                    <Avatar className={classes.sidebarAvatar} variant="rounded" src={avatar} />
                    <Typography className={classes.sidebarUserName} align='center' style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        {!user ? <Skeleton/> : user.name}
                    </Typography>
                    <Typography className={classes.sidebarUserPosition} align='center' style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        {!user ? <Skeleton/> : user.position}
                    </Typography>
                </Container>
                <Container className={classes.sidebarLinksContainer} disableGutters>
                    <Link className={classes.sidebarLinkContainer} style={darkMode ? {color: '#fff'} : {color: '#000'}} to='/'>
                        <HomeTwoToneIcon className={classes.sidebarLinkIcon}/>
                        <Typography className={classes.sidebarLinkText}>Главная</Typography>
                    </Link>
                    <Link className={classes.sidebarLinkContainer} style={darkMode ? {color: '#fff'} : {color: '#000'}} to='/'>
                        <FormatListBulletedSharpIcon className={classes.sidebarLinkIcon}/>
                        <Typography className={classes.sidebarLinkText}>Каталог</Typography>
                    </Link>
                    <Link className={classes.sidebarLinkContainer} style={darkMode ? {color: '#fff'} : {color: '#000'}} to='/'>
                        <PermIdentityIcon className={classes.sidebarLinkIcon}/>
                        <Typography className={classes.sidebarLinkText}>Персонал</Typography>
                    </Link>
                </Container>
                <button onClick={handleSubmit}>Выйти</button>
                <button onClick={handleDarkMode}>Смена темы</button>
            </Container>
        </aside>
    )
}

export default SideBar;
