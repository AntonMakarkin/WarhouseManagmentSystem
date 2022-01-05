import React, { useContext } from 'react';

import Context from '../../Context/context';

const Home = () => {
    const { darkMode } = useContext(Context); 
    return (
        <div>
            <h2 style={!darkMode ? {color: '#000'} : {color: '#fff'}}>Статистика</h2>
        </div>
    )
}

export default Home
