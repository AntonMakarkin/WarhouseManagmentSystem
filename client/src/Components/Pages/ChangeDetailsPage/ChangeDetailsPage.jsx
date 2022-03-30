import { useState, useContext, useEffect } from "react";
import { Container, Typography, Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Input from '../../AuthPage/Input';

import Context from '../../../Context/context';

import useStyles from './styles';

const ChangeDetailsPage = ({ header, collectionType }) => {
    const { darkMode } = useContext(Context);
    let postDataDefault = {};
    
    const [postData, setPostData] = useState()
    const classes = useStyles();

    const ChangeEmployeeData = () => {
        return (
            <Container className={classes.changeDetailsPageContainer}>
                <Typography className={classes.changeDetailsPageHeader}
                            variant="h2"
                            style={darkMode ? {color: '#fff'} : {color: '#000'}}>{header}</Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                            <Input name="name" label="Имя"/>
                            <Input name="email" label="Логин"/>
                            <Input name="phone" label="Телефон"/>
                    </Grid>
                </form>
            </Container>
        )
    }

    const handleSubmit = async (e) => {

    }

    switch (collectionType) {
        case "personal":
            return <ChangeEmployeeData/>
        default:
            return null;
    }
}

export default ChangeDetailsPage;