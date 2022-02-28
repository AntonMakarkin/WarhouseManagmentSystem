import { useContext } from 'react';

import { Card, Box, Button, Typography, Avatar } from '@material-ui/core';

import Context from '../../Context/context';

import useStyles from './styles';

const DataItem = ({ item, setActive, setItemId }) => {
    const { darkMode } = useContext(Context);

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

    const classes = useStyles();
    
    return (
        <Card className={classes.dataItem} 
              style={darkMode ? {backgroundColor: 'rgb(26, 32, 46)', color: '#fff'} : {backgroundColor: '#fff'}}>
            <Box className={classes.dataItemImgNameBlock}>
                <Avatar className={classes.dataItemImg} src={avatar}/>
                <Typography>{item.name}</Typography>
            </Box>
            <Box className={classes.dataItemButtons}>
                <Button>Изменить</Button>
                <Button onClick={() => callModalToDelete()}>Удалить</Button>
            </Box>
        </Card>
    )
}

export default DataItem
