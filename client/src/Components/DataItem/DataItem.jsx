import { useContext } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { Card, Box, Button, Typography, Avatar } from '@material-ui/core';

import Context from '../../Context/context';

import useStyles from './styles';

const DataItem = ({ item, setActive, setItemId, collectionName }) => {
    const { darkMode } = useContext(Context);
    const history = useHistory();
    const match = useRouteMatch();
    const classes = useStyles();
    let avatarBlock

    let avatar = item?.avatar

    if (avatar === undefined) {
        avatar = ''
    } else {
        avatar = `data:image/jpg;base64,${item?.avatar}`;
        avatar = avatar.replace(/^(javascript\:)/,"");
    }

    const callModalToDelete = () => {
        setItemId(item._id);
        setActive(true);
    }

    const openDetails = () => {
        history.push(`${match.path}/${item._id}`)
    }

    if (collectionName === 'couriers' || 'managers' || 'storekeepers' || 'customers' || 'categories') {
        avatarBlock = (
            <>
                <Avatar className={classes.dataItemImg} src={avatar}/>
            </>
        )
    }
    
    return (
        <Card className={classes.dataItem} 
              style={darkMode ? {backgroundColor: 'rgb(26, 32, 46)', color: '#fff'} : {backgroundColor: '#fff'}}>
            <Box className={classes.dataItemImgNameBlock}>
                {avatarBlock}
                <Typography>{item.name}</Typography>
            </Box>
            <Box className={classes.dataItemButtons}>
                <Button className={classes.openDetailsButton}
                        onClick={openDetails}
                        variant="contained"
                        style={darkMode ? {color: '#fff', backgroundColor: '#000'} : {color: '#000'}}>Изменить</Button>
                <Button onClick={() => callModalToDelete()}
                        variant="contained"
                        style={darkMode ? {color: '#fff', backgroundColor: '#000'} : {color: '#000'}}>Удалить</Button>
            </Box>
        </Card>
    )
}

export default DataItem
