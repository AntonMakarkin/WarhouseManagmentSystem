import React from 'react';
import { useSelector } from 'react-redux';

import DataItem from '../DataItem/DataItem';
import useStyles from './styles';

const DataItems = () => {
    const { users } = useSelector((state) => state.courier);


    return (
        <div>
            {users.map(item => (
                <div key={item._id}>
                    <DataItem item={item}/>
                </div>
            ))}
        </div>
    )
}

export default DataItems;
