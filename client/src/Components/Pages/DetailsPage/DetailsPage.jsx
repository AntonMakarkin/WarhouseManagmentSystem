import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@material-ui/core';

import Context from '../../../Context/context';

import useStyles from './styles';

const DetailsPage = ({ header }) => {
    const { darkMode } = useContext(Context);
    const { id } = useParams();
    const classes = useStyles();

    useEffect(() => {});

    return (
        <Container className={classes.detailsPageContainer}>
            <Typography className={classes.detailsPageHeader}
                        variant="h2"
                        style={darkMode ? {color: '#fff'} : {color: '#000'}}>{header}</Typography>
            <Box>
                <Button>Изменить данные</Button>
                <Button>Поменять пароль</Button>
                <Button>Удалить</Button>
            </Box>
        </Container>
    )
}

export default DetailsPage;