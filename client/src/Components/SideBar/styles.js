import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    logo: {
        fontWeight: 'normal',
        fontSize: '30px',
        color: "#000",
        transition: 'color 0.5s'
    },
    sidebar: {
        position: "fixed",
        paddingTop: '30px',
        paddingLeft: '45px',
        backgroundColor: '#FFFFFF',
        width: '350px',
        height: '100%'
    },
    sidebarAvatar: {
        width: '75px',
        height: '75px'
    }
}));

export default useStyles;