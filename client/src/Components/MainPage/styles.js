import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    secondaryContainer: {
        backgroundColor: '#f0f3fb',
        height: '100%',
        width: '100%',
        flex: '1'
    },
    appBar: {
        display: 'flex',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '35px',
        backgroundColor: '#fff',
        boxShadow: '5px 7px 26px -5px #cdd4e7'
    },
    appBarButton: {
        width: '40px',
        height: '40px'
    }
}));

export default useStyles;