import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    logo: {
        display: 'block',
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: '24px',
        color: "#000",
        marginBottom: '35px'
    },
    sidebar: {
        paddingTop: '15px',
        backgroundColor: '#FFFFFF',
        width: '350px',
        height: '100%'
    },
    sidebarAvatar: {
        width: '75px',
        height: '75px',
        margin: '0 auto'
    },
    sidebarUserName: {
        fontSize: '11px'
    }
}));

export default useStyles;