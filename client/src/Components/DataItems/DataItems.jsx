import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';

import DataItem from '../DataItem/DataItem';
import useStyles from './styles';

const DataItems = () => {
    const { users } = useSelector((state) => state.personal);
    const classes = useStyles();

    const columns = [
        {field: 'name', headerName: 'Имя', width: 300},
        {field: 'email', headerName: 'Логин', width: 200},
        {field: 'phone', headerName: 'Телефон', width: 200}
    ];
    return (
        <div className={classes.dataItemsBlocksContainer}>
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={r => r._id}
            />
            {/*{users.map(item => (
                <DataItem key={item._id} item={item}/>
            ))}*/}
        </div>
    )
}

export default DataItems;
