import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from '../../AuthPage/Input';

import Context from '../../../Context/context';

import useStyles from './styles';

const ChangeDetailsPage = ({ header, updateAction, collectionType, collectionName, getItemById }) => {
    const { darkMode } = useContext(Context);
    const { id } = useParams();
    const [postData, setPostData] = useState({ name: '', email: '', phone: ''});
    const [changePassword, setChangePassword] = useState({ password: ''});
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const classes = useStyles();

    console.log(collectionName, collectionType)

    let postDataDefaultItemType = ''

    /*if (collectionType === 'personal') {
        postDataDefaultItemType = 'user'
    }*/

    const postDataDefault = useSelector(state => state.data);
    const postDataDefaultItem = postDataDefault;
    let newDataObjForSending = {}

    if (collectionType === 'personal') {
        const { name, email, phone } = postDataDefaultItem;
        newDataObjForSending = { name, email, phone };
    }

    useEffect(() => {
        if (postDataDefaultItem.length === 0) {
            dispatch(getItemById(collectionName, id));
        }
        setPostData(newDataObjForSending)
    },[postDataDefaultItem, collectionName, id, dispatch, getItemById]);

    console.log(id, collectionName, postDataDefaultItem, postData)
    console.log(changePassword)

    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(postData);
        dispatch(updateAction({ ...postData }, id, collectionName))
    }

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        dispatch(updateAction({ ...changePassword }, id, collectionName))
    }

    switch (collectionType) {
        case "personal":
            return (
                <Container className={classes.changeDetailsPageContainer}>
                    <Typography className={classes.changeDetailsPageHeader}
                                variant="h2"
                                style={darkMode ? {color: '#fff'} : {color: '#000'}}>{header}</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                                <Input name="name" label="Имя" value={postData.name || ''} handleChange={(e) => setPostData({ ...postData, name: e.target.value })}/>
                                <Input name="email" label="Логин" value={postData.email || ''} handleChange={(e) => setPostData({ ...postData, email: e.target.value })}/>
                                <Input name="phone" label="Телефон" value={postData.phone || ''} handleChange={(e) => setPostData({ ...postData, phone: e.target.value })}/>
                        </Grid>
                        <Button type="submit">Сохранить изменения</Button>
                    </form>
                    <Typography className={classes.changeDetailsPageHeader}
                                variant="h2"
                                style={darkMode ? {color: '#fff'} : {color: '#000'}}>Изменить пароль сотрудника</Typography>
                    <form onSubmit={handleSubmitPassword}>
                        <Grid container spacing={3}>
                            <Input name="password"
                                   value={postData.password}
                                   className={classes.addPageInput} 
                                   label="Пароль" 
                                   handleChange={(e) => setChangePassword({ ...changePassword, password: e.target.value })}
                                   type={showPassword ? 'text' : 'password'}
                                   handleShowPassword={handleShowPassword}/>
                        </Grid>
                        <Button type="submit">Сохранить пароль</Button>
                    </form>
                </Container>
            )
        case "catalog":
            return (
                <Container className={classes.changeDetailsPageContainer}>
                    <Typography className={classes.changeDetailsPageHeader}
                                variant="h2"
                                style={darkMode ? {color: '#fff'} : {color: '#000'}}>{header}</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                                <Input name="name" label="Имя" value={postData.name || ''} handleChange={(e) => setPostData({ ...postData, name: e.target.value })}/>
                                <Input name="email" label="Логин" value={postData.email || ''} handleChange={(e) => setPostData({ ...postData, email: e.target.value })}/>
                                <Input name="phone" label="Телефон" value={postData.phone || ''} handleChange={(e) => setPostData({ ...postData, phone: e.target.value })}/>
                        </Grid>
                        <Button type="submit">Сохранить изменения</Button>
                    </form>
                </Container>
            )
        default:
            return null;
    }
}

export default ChangeDetailsPage;