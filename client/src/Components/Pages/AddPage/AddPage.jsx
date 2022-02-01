import { useState, useContext } from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Context from '../../../Context/context';

import useStyles from './styles';

const AddPage = ({ header, createAction }) => {
    const { darkMode } = useContext(Context);
    const [postData, setPostData] = useState({ name: '', email: '', phone: '', password: ''});
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...postData }, history))
    }

    return (
        <Container className={classes.addPageContainer}>
            <Typography className={classes.addPageHeader}
                        variant="h2"
                        style={darkMode ? {color: '#fff'} : {color: '#000'}}>{`Добавить ${header}`}</Typography>
            <form onSubmit={handleSubmit}>
                <TextField name="name" variant="outlined" label="Имя" fullWidth onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
                <TextField name="email" variant="outlined" label="Логин" fullWidth onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
                <TextField name="phone" variant="outlined" label="Телефон" fullWidth onChange={(e) => setPostData({ ...postData, phone: e.target.value })} />
                <TextField name="password" variant="outlined" label="Пароль" fullWidth onChange={(e) => setPostData({ ...postData, password: e.target.value })} />
                <Button type="submit">Добавить</Button>
            </form>
        </Container>
    )
};

export default AddPage;
