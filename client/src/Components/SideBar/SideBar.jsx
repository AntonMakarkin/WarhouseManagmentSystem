import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import useStyles from './styles';

const SideBar = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    return (
        <div className={classes.sidebar}>
            <p>ghbdn</p>
            <p>ffsdfsd</p>
            <p>dfsdf</p>
            <p>dfs</p>
            <p>dsfsdf</p>
        </div>
    )
}

export default SideBar;
