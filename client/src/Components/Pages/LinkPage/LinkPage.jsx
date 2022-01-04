import React, { useEffect, useContext } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { auth } from '../../../Actions/user'

import Context from '../../../Context/context';

import useStyles from './styles';

const LinkPage = ({ header, arrayOfLinks }) => {
    //const users = useSelector((state) => state?.users)
    const { darkMode } = useContext(Context);
    const match = useRouteMatch();

    return (
        <div style={!darkMode ? {color: '#000'} : {color: '#fff'}}>
            <h2>{header}</h2>
            {arrayOfLinks?.map((link, i) => (
                <Link key={i} to={`${match.url}/${link.link}`}>{link.name}</Link>
            ))}
        </div>
    )
}

export default LinkPage;
