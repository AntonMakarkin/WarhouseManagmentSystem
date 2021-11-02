import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    secondaryContainer: {
        backgroundColor: 'grey',
        height: '100%',
        width: '100%'
    }
}));

export default useStyles;