import { useContext } from "react";
import { Box, Typography } from "@material-ui/core";

import Context from '../../Context/context';

import useStyles from './styles';

const ErrorMessage = ({ message }) => {
    const { darkMode } = useContext(Context);
    const classes = useStyles();
    return (
        <Box className={classes.loaderContainer}>
            <Typography style={darkMode ? { 'color': '#fff' } : { 'color': '#000'}}>{message}</Typography>
        </Box>
    )
};

export default ErrorMessage;