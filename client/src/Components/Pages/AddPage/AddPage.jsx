import { useState, useContext, useEffect } from 'react';
import { Container, Typography, TextField, Button, Grid, Box, InputLabel,
         FormControl, Select } from '@material-ui/core';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import decode from 'jwt-decode';

import Input from '../../AuthPage/Input';
import MultilineInput from '../../Inputs/MultilineInput/MultilineInput';
import SelectInput from '../../Inputs/SelectInput/SelectInput';

import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import { refresh } from '../../../Actions/user';
import { getInfoForAddingGoods } from '../../../Actions/controllers';

import Context from '../../../Context/context';

import useStyles from './styles';

const initialState = { email: '', password: '' };

const AddPage = ({ header, createAction, collectionName }) => {
    const { darkMode } = useContext(Context);
    const { isLoading, isError, brandsForAddingGoods, categoriesForAddingGoods } = useSelector(state => state.data);
    const [postData, setPostData] = useState({ name: '', email: '', phone: '', password: ''});
    const [categoryData, setCategoryData] = useState({ name: '', link: ''});
    const [brandData, setBrandData] = useState({ name: '' })
    const [goodsData, setGoodsData] = useState({ name: '', brand: '', category: '', description: '', quantity: '', price: ''})
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    let form

    useEffect(() => {
        if (collectionName === 'goods') {
            dispatch(getInfoForAddingGoods())
        }
    }, [dispatch, collectionName])

    const handleShowPassword = () => setShowPassword(!showPassword);

    const personalHandleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...postData }, history, collectionName))
    }

    const categoriesHandleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...categoryData }, history, collectionName))
    }

    const brandHandleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...brandData }, history, collectionName))
    }

    const goodsHandleSubmit = async (e) => {
        e.preventDefault();

        dispatch(createAction({ ...goodsData }, history, collectionName))
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
                    <Input name="name" value={categoryData.name} className={classes.addPageInput} label="Название" handleChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}/>
                    <Input name="link" value={categoryData.link} className={classes.addPageInput} label="Ссылка" handleChange={(e) => setCategoryData({ ...categoryData, link: e.target.value })}/>
                </Grid>
                <Button variant="contained" 
                        type="submit"
                        style={darkMode ? {color: '#fff', backgroundColor: '#000'} : {color: '#000'}}>Добавить</Button>
            </form>
        )
    }

    if (collectionName === 'brands') {
        form = (
            <form onSubmit={brandHandleSubmit}>
                <Grid container spacing={3} style={{ marginBottom: '10px' }}>
                    <Input name="name" value={goodsData.name} className={classes.addPageInput} label="Название" handleChange={(e) => setBrandData({ ...brandData, name: e.target.value })}/>
                </Grid>
                <Button variant="contained" 
                        type="submit" 
                        style={darkMode ? {color: '#fff', backgroundColor: '#000'} : {color: '#000'}}>Добавить</Button>
            </form>
        )
    }

    if (collectionName === 'goods') {
        form = (
            <form onSubmit={goodsHandleSubmit}>
                <Grid container spacing={3} style={{ marginBottom: '10px' }}>
                    <SelectInput value={goodsData.brand || ''} label="Бренд" items={brandsForAddingGoods} className={classes.addPageInput} handleChange={(e) => setGoodsData({ ...goodsData, brand: e.target.value })}/>
                    <SelectInput value={goodsData.category || ''} label="Категория" items={categoriesForAddingGoods} className={classes.addPageInput} handleChange={(e) => setGoodsData({ ...goodsData, category: e.target.value })}/>
                    <Input name="name" type="text" value={goodsData.name || ''} className={classes.addPageInput} label="Название" handleChange={(e) => setGoodsData({ ...goodsData, name: e.target.value })}/>
                    <MultilineInput name="description" value={goodsData.description || ''} label="Описание" handleChange={(e) => setGoodsData({ ...goodsData, description: e.target.value })}/>
                    <Input name="quantity" type="number" value={goodsData.quantity || ''} className={classes.addPageInput} label="Количество" handleChange={(e) => setGoodsData({ ...goodsData, quantity: Number(e.target.value)})}/>
                    <Input name="price" type="number" value={goodsData.price || ''} className={classes.addPageInput} label="Цена" handleChange={(e) => setGoodsData({ ...goodsData, price: Number(e.target.value)})}/>
                </Grid>
                <Button variant="contained" 
                        type="submit" 
                        style={darkMode ? {color: '#fff', backgroundColor: '#000'} : {color: '#000'}}>Добавить</Button>
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
    /*if (isLoading) {
        return (
            <Loader/>
        )
    }*/

    if (isError) {
        return (
            <ErrorMessage/>
        )
    }

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
