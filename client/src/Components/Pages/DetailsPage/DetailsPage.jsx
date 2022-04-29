import { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { Avatar, Container, Box, Typography, Button, TextField } from '@material-ui/core';

import Context from '../../../Context/context';

import { getItemById, uploadPersonalAvatar } from '../../../Actions/controllers';

import Modal from '../../Modals/Modal';
import Loader from '../../Loader/Loader';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import FileInput from '../../FileInput/FileInput';

import useStyles from './styles';

const DetailsPage = ({ header, collectionName }) => {
    const { darkMode } = useContext(Context);
    const personalData = useSelector((state) => state.data.item);
    const { isLoading, isLoadingAvatar, isError, errorMessage } = useSelector((state) => state.data);
    const [modalActive, setModalActive] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [fileError, setFileError] = useState(false);
    const [sendButtonDisabled, setSendButtonDisabled] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const match = useRouteMatch();
    const { id } = useParams();
    const classes = useStyles();
    let showInfoBlock

    const allowedFormats = ["image/png", "image/jpg"];
    const fileSize = 1048576;
    const fileErrorMessage = 'Ошибка! Проверьте формат и вес';

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

    const uploadAvatar = () => {
        dispatch(uploadPersonalAvatar(avatarFile, collectionName, id))
    };

    const openChangeDetails = () => {
        history.push(`${match.path.slice(0, -4)}/changedata/${id}`)
    }

    const deleteItem = () => {
        dispatch()
    }

    useEffect(() => {
        dispatch(getItemById(collectionName, id));
    },[collectionName, id, dispatch]);

    if (isError) {
        return (
            <ErrorMessage message={errorMessage}/>
        )
    }

    if (collectionName === 'couriers' || 'managers' || 'storekeepers' || 'customers') {
        showInfoBlock = (
            <>
                <Box className={classes.detailsBlock}>
                        <Typography className={classes.detailsDescription}>Имя:</Typography>
                        <Typography>{personalData.name}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock}>
                        <Typography className={classes.detailsDescription}>Почта (логин):</Typography>
                        <Typography>{personalData.email}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock}>
                        <Typography className={classes.detailsDescription}>Телефон:</Typography>
                        <Typography>{personalData.phone}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock}>
                        <Typography className={classes.detailsDescription}>Должность:</Typography>
                        <Typography>{personalData.role}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock}>
                        <Typography className={classes.detailsDescription}>Добавлен:</Typography>
                        <Typography>{createdTime}</Typography>
                    </Box>
                    <Box className={classes.detailsBlock} style={{ marginBottom: '30px' }}>
                        <Typography className={classes.detailsDescription}>Изменен:</Typography>
                        <Typography>{updatedTime}</Typography>
                </Box>
            </>
        )
    }

    if (collectionName === 'categories') {
        showInfoBlock = (
            <>
                <Box className={classes.detailsBlock}>
                    <Typography className={classes.detailsDescription}>Название:</Typography>
                    <Typography>{personalData.name}</Typography>
                </Box>
                <Box className={classes.detailsBlock}>
                    <Typography className={classes.detailsDescription}>Ссылка:</Typography>
                    <Typography>{personalData.link}</Typography>
                </Box>
                <Box className={classes.detailsBlock}>
                    <Typography className={classes.detailsDescription}>Добавлен:</Typography>
                    <Typography>{createdTime}</Typography>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '30px' }}>
                    <Typography className={classes.detailsDescription}>Изменен:</Typography>
                    <Typography>{updatedTime}</Typography>
                </Box>
            </>
        )
    }

    if (collectionName === 'brands') {
        showInfoBlock = (
            <>
                <Box className={classes.detailsBlock}>
                    <Typography className={classes.detailsDescription}>Название:</Typography>
                    <Typography>{personalData.name}</Typography>
                </Box>
                <Box className={classes.detailsBlock}>
                    <Typography className={classes.detailsDescription}>Добавлен:</Typography>
                    <Typography>{createdTime}</Typography>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '30px' }}>
                    <Typography className={classes.detailsDescription}>Изменен:</Typography>
                    <Typography>{updatedTime}</Typography>
                </Box>
            </>
        )
    }

    if (collectionName === 'goods') {
        showInfoBlock = (
            <>
                <Box className={classes.detailsBlock} style={{ marginBottom: '15px' }}>
                    <Typography className={classes.detailsDescription}>Название:</Typography>
                    <Typography>{personalData.name}</Typography>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '15px' }}>
                    <Typography className={classes.detailsDescription}>Бренд:</Typography>
                    <Typography>{personalData.brand}</Typography>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '15px' }}>
                    <Typography className={classes.detailsDescription}>Категория:</Typography>
                    <Typography>{personalData.category}</Typography>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '15px' }}>
                    <Typography className={classes.detailsDescription}>Описание:</Typography>
                    <TextField variant='outlined'
                               readOnly={true}
                               fullWidth
                               multiline
                               rows={4}
                               value={personalData.description}/>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '15px' }}>
                    <Typography className={classes.detailsDescription}>Кол-во на складе:</Typography>
                    <Typography>{personalData.quantity}</Typography>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '15px' }}>
                    <Typography className={classes.detailsDescription}>Цена:</Typography>
                    <Typography>{personalData.price}₽</Typography>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '15px' }}>
                    <Typography className={classes.detailsDescription}>Добавлен:</Typography>
                    <Typography>{createdTime}</Typography>
                </Box>
                <Box className={classes.detailsBlock} style={{ marginBottom: '30px' }}>
                    <Typography className={classes.detailsDescription}>Изменен:</Typography>
                    <Typography>{updatedTime}</Typography>
                </Box>
            </>
        )
    }

    return (
        <Container className={classes.detailsPageContainer}>
            <Typography className={classes.detailsPageHeader}
                        variant="h2"
                        style={darkMode ? {color: '#fff'} : {color: '#000'}}>{`Информация о ${header}`}</Typography>
            {isLoading ? <Loader/> : 
            <Container className={classes.detailsContainer} disableGutters maxWidth={false} style={darkMode ? {color: '#fff'} : {color: '#000'}}>
                <Container className={classes.avatarContainer} disableGutters maxWidth={false}>
                    <Avatar className={classes.detailsAvatar} variant="rounded" src={avatar} />
                    <Box className={classes.uploadAvatarBlock}>
                        <FileInput allowedFormats={allowedFormats} 
                                fileSize={fileSize}
                                setFile={setAvatarFile}
                                setFileError={setFileError}
                                setSendButtonDisabled={setSendButtonDisabled} />
                        <Button className={classes.sendAvatarButton}
                                disabled={sendButtonDisabled}
                                variant="contained"
                                onClick={uploadAvatar} 
                                style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>{isLoadingAvatar ? 'Отправляем' : 'Отправить'}</Button>
                        <Typography className={classes.errorMessage}>{fileError ? fileErrorMessage : errorMessage}</Typography>
                    </Box>
                </Container>
                <Container disableGutters maxWidth={false}>
                    {showInfoBlock}
                    <Box className={classes.actionButtons}>
                        <Button variant="contained"
                                className={classes.actionButton}
                                onClick={openChangeDetails} 
                                style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>Изменить данные</Button>
                        <Button variant="contained"
                                className={classes.actionButton} 
                                style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>Удалить</Button>
                    </Box>
                </Container>
            </Container>}
            <Modal active={modalActive} setActive={setModalActive} header={'Удалить? Вы уверены?'}>
                <Button onClick={() => setModalActive(false)}>Нет</Button>
                <Button onClick={deleteItem}>Да</Button>
            </Modal>
        </Container>
    )
}

export default DetailsPage;