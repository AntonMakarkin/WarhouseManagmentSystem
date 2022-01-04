import React from 'react';
import { Card, Typography } from '@material-ui/core';

import useStyles from './styles';

const DataItem = ({ item }) => {
    const classes = useStyles();
    
    return (
        <Card>
            <Typography>{item.name}</Typography>
        </Card>
    )
}

export default DataItem
