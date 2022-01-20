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
        width: '250px',
        height: '100%',
        boxShadow: '0 8px 20px 0 rgb(183 192 206 / 20%)',
        zIndex: '2',
        transition: 'background-color 0.4s'
    },
    sidebarAvatar: {
        width: '75px',
        height: '75px',
        margin: '0 auto',
        marginBottom: '10px',
        border: '2px solid #fff',
        borderRadius: '15%',
        boxShadow: '0 5px 25px 0 rgb(0 0 0 / 20%)'
    },
    sidebarUserName: {
        fontSize: '15px',
        maxWidth: '150px',
        margin: '0 auto'
    },
    sidebarUserPosition: {
        fontSize: '11px',
        maxWidth: '150px',
        margin: '0 auto'
    },
    sidebarLinksContainer: {
        padding: '8px 13px 0'
    },
    sidebarLinkContainer: {
        width: '100%',
        display: 'flex',
        padding: '9px 9px 9px 18px',
        textDecoration: 'none',
        color: '#000',
        borderRadius: '0.5rem',
        transition: 'background-color 0.3s',
        '&:hover': {
            backgroundColor: 'rgb(35, 43, 62)',
            color: '#fff'
        }
    },
    sidebarLinkIcon: {
        marginRight: '10px'
    },
    sidebarLinkText: {
        width: '100%'
    }
}));

export default useStyles;