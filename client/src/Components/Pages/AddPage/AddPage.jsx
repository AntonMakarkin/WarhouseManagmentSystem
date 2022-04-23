import { useState, useContext, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Box } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import FileInput from '../../FileInput/FileInput';
import decode from 'jwt-decode';

import Input from '../../AuthPage/Input';

import { refresh } from '../../../Actions/user';

import Context from '../../../Context/context';

import useStyles from './styles';

const initialState = { email: '', password: '' };

const AddPage = ({ header, createAction, collectionName }) => {
    const { darkMode } = useContext(Context);
    const [postData, setPostData] = useState({ name: '', email: '', phone: '', password: ''});
    const [img, setImg] = useState('');
    const [fileError, setFileError] = useState(false);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
    const [categoryData, setCategoryData] = useState({ name: '', link: '', img})
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    const allowedFormats = ["image/png", "image/jpg"];
    const fileSize = 1048576;
    const fileErrorMessage = 'Ошибка! Проверьте формат и вес';

    console.log(collectionName)

    let form

    const handleShowPassword = () => setShowPassword(!showPassword);

    const personalHandleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...postData }, history, collectionName))
    }

    const categoriesHandleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...categoryData }, history, collectionName))
    }

    const refreshToken = () => {
        dispatch(refresh(history));
    }

    if (collectionName === 'couriers' || 'managers' || 'storekeepers' || 'customers') {
        form = (
            <form onSubmit={personalHandleSubmit}>
                <Grid container spacing={3} style={{ marginBottom: '10px' }}>
                    <Input name="name" value={postData.name} className={classes.addPageInput} label="Имя" handleChange={(e) => setPostData({ ...postData, name: e.target.value })}/>
                    <Input name="email" value={postData.email} className={classes.addPageInput} label="Логин" handleChange={(e) => setPostData({ ...postData, email: e.target.value })}/>
                    <Input name="phone" value={postData.phone} className={classes.addPageInput} label="Телефон" handleChange={(e) => setPostData({ ...postData, phone: e.target.value })}/>
                    <Input name="password"
                           value={postData.password}
                           className={classes.addPageInput} 
                           label="Пароль" 
                           handleChange={(e) => setPostData({ ...postData, password: e.target.value })}
                           type={showPassword ? 'text' : 'password'}
                           handleShowPassword={handleShowPassword}/>
                </Grid>
                <Button variant="contained" type="submit">Добавить</Button>
            </form>
        )
    }

    if (collectionName === 'categories') {
        form = (
            <form onSubmit={categoriesHandleSubmit}>
                <Grid container spacing={3} style={{ marginBottom: '10px' }}>
                    <Input name="name" value={postData.name} className={classes.addPageInput} label="Имя" handleChange={(e) => setPostData({ ...postData, name: e.target.value })}/>
                    <Input name="email" value={postData.email} className={classes.addPageInput} label="Логин" handleChange={(e) => setPostData({ ...postData, email: e.target.value })}/>
                    <Input name="phone" value={postData.phone} className={classes.addPageInput} label="Телефон" handleChange={(e) => setPostData({ ...postData, phone: e.target.value })}/>
                    <Box className={classes.loadImgInputBox}>
                        <FileInput allowedFormats={allowedFormats}
                                   fileSize={fileSize}
                                   setFile={setImg}
                                   setFileError={setFileError}
                                   setSendButtonDisabled={setSendButtonDisabled}/>
                    </Box>
                </Grid>
                <Button variant="contained" type="submit">Добавить</Button>
            </form>
        )
    }

    /*useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) refreshToken();
        }
    })*/

        return (
            <Container className={classes.addPageContainer}>
                <Typography className={classes.addPageHeader}
                            variant="h2"
                            style={darkMode ? {color: '#fff'} : {color: '#000'}}>{`Добавить ${header}`}</Typography>
                {form}
            </Container>
        )

};

export default AddPage;
