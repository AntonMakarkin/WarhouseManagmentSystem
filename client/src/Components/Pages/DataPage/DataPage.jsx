import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Container, TextField, Button, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useHistory, useLocation } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';

import Context from '../../../Context/context'

import DataItems from '../../DataItems/DataItems';
import Pagination from '../../Pagination/Pagination';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const DataPage = ({ header, modal, modalHeader, getAllAction, searchAction, createAction }) => {
    const { isLoading } = useSelector((state) => state.personal);
    const { darkMode } = useContext(Context);
    const [postData, setPostData] = useState({ name: '', email: '', phone: '', password: ''});
    const [modalActive, setModalActive] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const AddItemModal = modal;
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const history = useHistory();

    const searchPost = () => {
        if (search.trim()) {
            dispatch(searchAction({ search }))
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...postData }))
    }

    /*useEffect(() => {
        dispatch(getAllAction(page))
    }, [dispatch, page, getAllAction]);*/
    
    return (
        <Container className={classes.dataPageContainer}>
            <Typography className={classes.dataPageHeader} 
                        variant="h2" 
                        style={darkMode ? {color: '#fff'} : {color: '#000'}}>{header}</Typography>
                <Button variant="contained"
                        className={classes.addButton} 
                        endIcon={<AddIcon/>}
                        style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}} 
                        onClick={() => setModalActive(true)}>Добавить</Button>
                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Поиск" fullWidth value={search} onChange={(e) => setSearch(e.target.value)}/>
                <Container className={classes.dataItemsContainer} disableGutters maxWidth={false}>
                    {isLoading ? <><Skeleton style={{flex: '1 0 auto'}}/><Skeleton/></> :  <DataItems/>}
                    <Paper>
                        <Pagination page={page} getAllItems={getAllAction}/>
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
        </Container>
    )
}

export default DataPage
