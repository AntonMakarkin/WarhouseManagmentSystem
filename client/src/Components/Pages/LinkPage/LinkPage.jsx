import React, { useContext } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Context from '../../../Context/context';

import useStyles from './styles';

const LinkPage = ({ header, arrayOfLinks }) => {
    const users = useSelector((state) => state?.users)
    const { darkMode } = useContext(Context)
    const match = useRouteMatch();

    return (
        <div style={!darkMode ? {color: '#000'} : {color: '#fff'}}>
            <h2>{header}</h2>
            {arrayOfLinks?.map(link => (
                <Link to={`${match.url}/${link.link}`}>{link.name}</Link>
            ))}
        </div>
    )
}

export default LinkPage;
