import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper } from '@material-ui/core';

import { getCouriers } from '../../../Actions/Personal/couriers';

import DataItems from '../../DataItems/DataItems';
import Pagination from '../../Pagination/Pagination';
import useStyles from './styles';

const DataPage = ({ header, modal }) => {
    const [modalActive, setModalActive] = useState(true)
    const dispatch = useDispatch();
    const classes = useStyles();
    const AddItemModal = modal;
    const page = 1
    
    return (
        <div className={classes.dataPageContainer}>
            <h2>{header}</h2>
            <button>Добавить</button>
            <DataItems/>
            <Paper>
                <Pagination page={page}/>
            </Paper>
            <AddItemModal active={modalActive} setActive={setModalActive}/>
        </div>
    )
}

export default DataPage
