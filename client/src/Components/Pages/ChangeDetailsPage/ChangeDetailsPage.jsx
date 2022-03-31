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
    const dispatch = useDispatch();
    const classes = useStyles();

    let postDataDefaultItemType = ''

    if (collectionType === 'personal') {
        postDataDefaultItemType = 'user'
    }

    const postDataDefault = useSelector(state => state[collectionType]);
    const postDataDefaultItem = postDataDefault[postDataDefaultItemType];
    const postDataDefaultItemNew = { ...postDataDefaultItem }

    useEffect(() => {
        if (postDataDefaultItem === []) {
            dispatch(getItemById(collectionName, id));
        }
        setPostData(postDataDefaultItem) 
        //dispatch(getItemById(collectionName, id));
    },[collectionName, dispatch, getItemById, id, postDataDefaultItem]);

    console.log(id, postDataDefaultItem, postData)

    const handleSubmit = async (e) => {
        dispatch()
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
                                <Input name="name" label="Имя" value={postData.name} handleChange={(e) => setPostData({ ...postData, name: e.target.value })}/>
                        </Grid>
                    </form>
                </Container>
            )
        default:
            return null;
    }
}

export default ChangeDetailsPage;