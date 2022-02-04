import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, AppBar, Button, Container, CssBaseline, Paper, Grid } from '@material-ui/core';

import { login } from '../../Actions/user';

import Context from '../../Context/context';

import Input from './Input';
import useStyles from './styles';

const initialState = { email: '', password: '' };

const AuthPage = () => {
    const [form, setForm] = useState(initialState);
    const { darkMode } = useContext(Context);
    const isAuthError = useSelector(state => state.user.authError);
    const dispatch = useDispatch();
    const history = useHistory();
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(login(form, history));
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    return (
        <Container disableGutters
                   maxWidth={false} 
                   className={classes.authPageContainer} 
                   style={darkMode ? {background: 'rgba(26,32,46,1)'} : {background: 'linear-gradient(252.44deg, #16BDE7 0%, #2746D8 100%)'}}>
            <CssBaseline/>
            <AppBar className={classes.appBar}>
                <Typography variant="h2" className={classes.headerLabel}>
                    UniShop
                </Typography>
            </AppBar>
            <main>
                <Container maxWidth="sm" className={classes.authContainer}>
                    <Typography variant="h1" align="center" className={classes.pageHeader}>
                        Управление магазином
                    </Typography>
                    <Paper className={classes.authFormPaper} style={darkMode ? {background: 'rgba(255, 255, 255, 0.12)'} : {background: '#fff'}}>
                        <Typography variant="h3" align="center" className={classes.authFormHeader} style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                            Вход
                        </Typography>
                        <Typography align="center" className={classes.authFormErrorMessage} style={isAuthError ? {opacity: '1'} : {opacity: '0'}}>
                            Ошибка! Неверный логин или пароль
                        </Typography>
                        <form className={classes.authForm} onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Input name="email" 
                                       className={classes.emailInput}
                                       label="Электронная почта" 
                                       handleChange={handleChange} 
                                       type="email"
                                       color="#fff"/>
                                <Input name="password" 
                                       label="Пароль" 
                                       handleChange={handleChange} 
                                       type={showPassword ? 'text' : 'password'}
                                       handleShowPassword={handleShowPassword}/>
                            </Grid>
                            <Button type="submit" fullWidth className={classes.submit} style={darkMode ? {background: 'gray'} : {background: '#16bde7'}}>
                                Войти
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </main>
        </Container>
    );
}

export default AuthPage;