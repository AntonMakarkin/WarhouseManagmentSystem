import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import decode from 'jwt-decode';

import { Paper, Container, TextField, Button, Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Link, useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import AddIcon from '@material-ui/icons/Add';

import Context from '../../../Context/context'

import Modal from '../../Modals/Modal';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import DataItems from '../../DataItems/DataItems';
import Pagination from '../../Pagination/Pagination';

import { refresh } from '../../../Actions/user';

import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const DataPage = ({ header, modal, modalHeader, getAllAction, searchAction, deleteAction, collectionName }) => {
    const { isAuth } = useSelector((state) => state.user);
    const { isLoading, isError, errorMessage } = useSelector((state) => state.data);
    const { darkMode } = useContext(Context);
    const [modalActive, setModalActive] = useState(false);
    const [itemId, setItemId] = useState(null);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const match = useRouteMatch();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const [search, setSearch] = useState('');
    const history = useHistory();

    /*const refreshToken = () => {
        dispatch(refresh(history))
    }*/

    /*useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) history.push('/login');
        }
    })*/

    const searchPost = () => {
        if (search.trim()) {
            dispatch(searchAction({ search }, collectionName))
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
        }
    }

    const deletePersonal = () => {
        dispatch(deleteAction(collectionName, itemId));
        setModalActive(false)
    }

    if (isError) {
        return (
            <ErrorMessage message={errorMessage}/>
        )
    }
    
    return (
        <Container className={classes.dataPageContainer}>
            <Typography className={classes.dataPageHeader} 
                        variant="h2" 
                        style={darkMode ? {color: '#fff'} : {color: '#000'}}>{header}</Typography>
                <Box className={classes.dataPageButtonsPanel}>
                    <Link to={`${match.url}/add`} variant="contained" className={classes.addButton}>
                        <Button variant="contained"
                                className={classes.addButton} 
                                endIcon={<AddIcon/>}
                                style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>
                        Добавить 
                        </Button>
                    </Link>
                    <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Поиск" fullWidth value={search} onChange={(e) => setSearch(e.target.value)}/>
                </Box>
                <Container className={classes.dataItemsContainer} disableGutters maxWidth={false}>
                    {isLoading ? <Loader/> :  <DataItems deleteAction={deleteAction} 
                                                         collection={collectionName}
                                                         setActive={setModalActive}
                                                         setItemId={setItemId}/>}
                    <Paper>
                        <Pagination page={page} collection={collectionName} getAllItems={getAllAction}/>
                    </Paper>
                </Container>
            <Modal active={modalActive} setActive={setModalActive} header={'Вы действительно хотите удалить сотрудника из базы данных?'}>
               <Button onClick={() => setModalActive(false)}>Нет</Button>
               <Button onClick={deletePersonal}>Да</Button>
            </Modal>
        </Container>
    )
}

export default DataPage
