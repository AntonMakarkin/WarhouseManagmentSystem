import React from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { logout } from '../../Actions/user';

const MainPage = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = () => {
        dispatch(logout(history));
    }

    return (
        <>
        <div>
            Main Dashboard
        </div>
        <button onClick={handleSubmit}>Выйти</button>
        </>
    )
}

export default MainPage
