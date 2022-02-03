import { useContext } from "react";
import { Box, CircularProgress } from "@material-ui/core";

import Context from '../../Context/context';

import useStyles from "./styles";

const Loader = () => {
    const { darkMode } = useContext(Context);
    const classes = useStyles();
    return (
        <Box className={classes.loaderContainer}>
            <CircularProgress style={darkMode ? { 'color': '#fff' } : { 'color': '#000'}} size={80} className={classes.loader}/>
        </Box>
    )
};

export default Loader;
