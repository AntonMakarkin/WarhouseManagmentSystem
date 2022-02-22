import { useState, useContext } from 'react';
import { Container, Typography, TextField, Button, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../AuthPage/Input';

import Context from '../../../Context/context';

import useStyles from './styles';

const initialState = { email: '', password: '' };

const AddPage = ({ header, createAction, collectionName }) => {
    const { darkMode } = useContext(Context);
    const [postData, setPostData] = useState({ name: '', email: '', phone: '', password: ''});
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();

    console.log(collectionName)

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...postData }, history, collectionName))
    }

    return (
        <Container className={classes.addPageContainer}>
            <Typography className={classes.addPageHeader}
                        variant="h2"
                        style={darkMode ? {color: '#fff'} : {color: '#000'}}>{`Добавить ${header}`}</Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
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
                {/*<TextField name="name" variant="outlined" label="Имя" fullWidth onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
                    <TextField name="email" variant="outlined" label="Логин" fullWidth onChange={(e) => setPostData({ ...postData, email: e.target.value })} />
                    <TextField name="phone" variant="outlined" label="Телефон" fullWidth onChange={(e) => setPostData({ ...postData, phone: e.target.value })} />
                    <TextField name="password" variant="outlined" label="Пароль" fullWidth onChange={(e) => setPostData({ ...postData, password: e.target.value })} />*/}
                <Button type="submit">Добавить</Button>
            </form>
        </Container>
    )
};

export default AddPage;
