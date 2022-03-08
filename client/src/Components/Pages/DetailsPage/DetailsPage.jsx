import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Avatar, Container, Box, Typography, Button } from '@material-ui/core';

import Context from '../../../Context/context';

import { getPersonalById, uploadPersonalAvatar } from '../../../Actions/controllers';

import Loader from '../../Loader/Loader';
import FileInput from '../../FileInput/FileInput';

import useStyles from './styles';

const DetailsPage = ({ header, collectionName }) => {
    const { darkMode } = useContext(Context);
    const personalData = useSelector((state) => state.personal.user);
    const { isLoading } = useSelector((state) => state.personal);
    const [avatarFile, setAvatarFile] = useState(null);
    const dispatch = useDispatch();
    const { id } = useParams();
    const classes = useStyles();

    let avatar = `data:image/jpg;base64,${personalData?.avatar}`;
    avatar = avatar.replace(/^(javascript\:)/,"");

    const months = ['Янв','Февр','Март','Апр','Май','Июнь','Июль','Авг','Сент','Окт','Нояб','Дек'];

    let createdTime = personalData?.createdAt;
    let updatedTime = personalData?.updatedAt;

    const timeConvert = new Date(createdTime);
    const updTimeConvert = new Date(updatedTime);
    let year = timeConvert.getFullYear();
    let month = timeConvert.getMonth();
    let day = timeConvert.getDate();

    createdTime = `${day} ${months[month]} ${year}`;

    year = updTimeConvert.getFullYear();
    month = updTimeConvert.getMonth();
    day = updTimeConvert.getDate();

    updatedTime = `${day} ${months[month]} ${year}`;

    const uploadAvatar = (e) => {

    };

    useEffect(() => {
        dispatch(getPersonalById(collectionName, id));
    }, [collectionName, id, dispatch]);

    return (
        <Container className={classes.detailsPageContainer}>
            <Typography className={classes.detailsPageHeader}
                        variant="h2"
                        style={darkMode ? {color: '#fff'} : {color: '#000'}}>{header}</Typography>
            {isLoading ? <Loader/> : 
            <Container className={classes.detailsContainer} disableGutters maxWidth={false}>
                <Container className={classes.avatarContainer} disableGutters maxWidth={false}>
                    <Avatar className={classes.detailsAvatar} variant="rounded" src={avatar} />
                    <FileInput/>
                </Container>
                <Container disableGutters maxWidth={false}>
                    <Box className={classes.detailsBlock} style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        <Typography className={classes.detailsDescription}>Имя:</Typography>
                        <Typography>{personalData.name}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock} style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        <Typography className={classes.detailsDescription}>Почта (логин):</Typography>
                        <Typography>{personalData.email}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock} style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        <Typography className={classes.detailsDescription}>Телефон:</Typography>
                        <Typography>{personalData.phone}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock} style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        <Typography className={classes.detailsDescription}>Должность:</Typography>
                        <Typography>{personalData.role}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock} style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        <Typography className={classes.detailsDescription}>Добавлен:</Typography>
                        <Typography>{createdTime}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock} style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                        <Typography className={classes.detailsDescription}>Изменен:</Typography>
                        <Typography>{updatedTime}</Typography>
                    </Box>
                    <Box>
                        <Button variant="contained" 
                                style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>Изменить данные</Button>
                        <Button variant="contained" 
                                style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>Поменять пароль</Button>
                        <Button variant="contained" 
                                style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>Удалить</Button>
                    </Box>
                </Container>
            </Container>}
        </Container>
    )
}

export default DetailsPage;