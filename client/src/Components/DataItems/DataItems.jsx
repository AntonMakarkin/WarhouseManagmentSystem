import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';

import DataItem from '../DataItem/DataItem';
import useStyles from './styles';

const DataItems = () => {
    const { users } = useSelector((state) => state.personal);
    const classes = useStyles();
    
    return (
        <div className={classes.dataItemsBlocksContainer}>
            {users.map(item => (
                <DataItem key={item._id} item={item}/>
            ))}
        </div>
    )
}

export default DataItems;
