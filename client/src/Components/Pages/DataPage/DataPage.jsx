import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Container, TextField, Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import AddIcon from '@material-ui/icons/Add';

import { getCouriers } from '../../../Actions/Personal/couriers';
import { createCourier } from '../../../Actions/Personal/couriers';

import Context from '../../../Context/context'

import DataItems from '../../DataItems/DataItems';
import Pagination from '../../Pagination/Pagination';
import useStyles from './styles';

const DataPage = ({ header, modal, modalHeader }) => {
    const { isLoading } = useSelector((state) => state.courier);
    const { darkMode } = useContext(Context);
    const [postData, setPostData] = useState({ name: '', email: '', phone: '', password: ''});
    const [modalActive, setModalActive] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const AddItemModal = modal;
    const page = 1

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createCourier({ ...postData }))
    }
    
    return (
        <div className={classes.dataPageContainer}>
            <h2 style={darkMode ? {color: '#fff'} : {color: '#000'}}>{header}</h2>
                <Button variant="contained"
                        className={classes.addButton} 
                        endIcon={<AddIcon/>}
                        style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}} 
                        onClick={() => setModalActive(true)}>Добавить</Button>
                <Container className={classes.dataItemsContainer} disableGutters maxWidth={false}>
                    {isLoading ? <><Skeleton/><Skeleton/></> : <DataItems/>}
                    <Paper>
                        <Pagination page={page}/>
                    </Paper>
                </Container>
            <AddItemModal active={modalActive} setActive={setModalActive} header={modalHeader}>
                <form onSubmit={handleSubmit}>
                    <TextField name="name" variant="outlined" label="Имя" fullWidth onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
                    <TextField name="email" variant="outlined" label="Логин" fullWidth onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
                    <TextField name="phone" variant="outlined" label="Телефон" fullWidth onChange={(e) => setPostData({ ...postData, phone: e.target.value })} />
                    <TextField name="password" variant="outlined" label="Пароль" fullWidth onChange={(e) => setPostData({ ...postData, password: e.target.value })} />
                    <Button type="submit">Добавить</Button>
                </form>
            </AddItemModal>
        </div>
    )
}

export default DataPage