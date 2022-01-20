import React, { useEffect, useContext } from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Container, Typography, Card, Grid, Box } from '@material-ui/core';

import Context from '../../../Context/context';

import useStyles from './styles';

const LinkPage = ({ header, arrayOfLinks }) => {
    const { darkMode } = useContext(Context);
    const match = useRouteMatch();
    const classes = useStyles();

    return (
        <Container style={!darkMode ? {color: '#000'} : {color: '#fff'}}>
            <Typography className={classes.linkPageHeader} 
                        variant='h2'>{header}</Typography>
                <Grid container alignItems="stretch" spacing={6}>
                    {arrayOfLinks?.map((link, i) => (
                        <Grid key={i} item xs={12} sm={12} md={6} lg={6}>
                            <Card style={darkMode ? {backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}
                                  className={darkMode ? `${classes.linkPageLinkCard}` : `${classes.linkPageLinkCardLight}`}>
                                <Link style={darkMode ? {color: '#fff'} : {color: '#000'}}
                                className={classes.linkPageLink}
                                to={`${match.url}/${link.link}`}>
                                    <Box>
                                        {link.logo}
                                    </Box>
                                    <Typography>
                                        {link.name}
                                    </Typography>
                                </Link>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
        </Container>
    )
}

export default LinkPage;
