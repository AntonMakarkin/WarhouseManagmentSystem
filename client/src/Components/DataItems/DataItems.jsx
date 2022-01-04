import React from 'react';
import { useSelector } from 'react-redux';

import DataItem from '../DataItem/DataItem';
import useStyles from './styles';

const DataItems = () => {
    const { users } = useSelector((state) => state.courier);


    return (
        <div>
            {users.map(item => (
                <DataItem key={item._id} item={item}/>
            ))}
        </div>
    )
}

export default DataItems;
