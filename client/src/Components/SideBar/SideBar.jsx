import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

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
        <div className={classes.sidebar} style={darkMode ? {backgroundColor: '#1A202E'} : {backgroundColor: '#fff'}}>
            <span className={classes.logo} style={darkMode ? {color: '#fff'} : {color: '#000'}}>UniShop</span>
            <Avatar className={classes.sidebarAvatar} variant="rounded" src={avatar} />
            <Typography align='center' style={darkMode ? {color: '#fff'} : {color: '#000'}}>{!user ? <Skeleton/> : user.name}</Typography>
            <p>ghbdn</p>
            <p>ffsdfsd</p>
            <p>dfsdf</p>
            <p>dfs</p>
            <p>dsfsdf</p>
            <button onClick={handleSubmit}>Выйти</button>
            <button onClick={handleDarkMode}>Смена темы</button>
        </div>
    )
}

export default SideBar;
