import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    overlay: {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'fixed',
        top: '0',
        left: '0'
    }
}));

export default useStyles;