import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Typography, AppBar, Button, Container, CssBaseline, Paper, Grid } from '@material-ui/core';

import Input from './Input';
import useStyles from './styles';

const initialState = { email: '', password: '' };

const AuthPage = () => {
    const [form, setForm] = useState(initialState);
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleChange = (e) => console.log(e.target.value);

    return (
        <>
            <CssBaseline/>
            <AppBar className={classes.appBar}>
                <Typography variant="h2" className={classes.headerLabel}>
                    UniShop
                </Typography>
            </AppBar>
            <main>
                <Container maxWidth="sm" className={classes.authContainer}>
                    <Typography variant="h1" align="center" className={classes.pageHeader}>
                        Управление складом
                    </Typography>
                    <Paper className={classes.authFormPaper}>
                        <Typography variant="h3" align="center" className={classes.authFormHeader}>
                            Вход
                        </Typography>
                        <form className={classes.authForm}>
                            <Grid container spacing={3}>
                                <Input name="email" 
                                       className={classes.emailInput}
                                       label="Электронная почта" 
                                       handleChange={handleChange} 
                                       type="email"/>
                                <Input name="password" 
                                       label="Пароль" 
                                       handleChange={handleChange} 
                                       type={showPassword ? 'text' : 'password'}
                                       handleShowPassword={handleShowPassword}/>
                            </Grid>
                            <Button type="submit" fullWidth className={classes.submit}>
                                Войти
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </main>
        </>
    );
}

export default AuthPage;