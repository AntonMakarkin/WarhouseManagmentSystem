import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    overlay: {
        height: '100vh',
        width: '100vw',
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '3',
        pointerEvents: 'none',
        opacity: '0',
        transition: 'all 0.3s'
    },
    overlayActive: {
        opacity: '1',
        pointerEvents: 'all'
    },
    modal: {
        padding: '20px',
        borderRadius: '12px',
        backgroundColor: '#fff',
        width: '600px',
        maxWidth: '100%',
        transform: 'scale(0)',
        transition: 'all 0.2s'
    },
    modalActive: {
        transform: 'scale(1)'
    },
    modalCloseButton: {
        float: 'right'
    }
}));

export default useStyles;