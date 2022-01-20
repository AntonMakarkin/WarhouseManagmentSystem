import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        display: 'flex',
        width: '100%',
        height: '100%'
    },
    secondaryContainer: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f0f3fb',
        height: '100%',
        width: '100%',
        flex: '1',
        transition: 'background-color 0.4s'
    },
    appBar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '35px',
        paddingRight: '35px',
        backgroundColor: '#fff',
        boxShadow: '5px 7px 26px -5px #cdd4e7',
        transition: 'background-color 0.4s'
    },
    appBarButtonBox: {
        display: 'flex',
        alignItems: 'center'
    },
    appBarButton: {
        width: '40px',
        height: '40px'
    },
    darkThemeButton: {
        display: 'flex',
        alignItems: 'center',
        marginRight: '15px'
    },
    logoutButtonIcon: {
        width: '30px',
        height: '30px'
    }
}));

export default useStyles;