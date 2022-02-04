import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    authPageContainer: {
        width: '100%',
        height: '100%'
    },
    appBar: {
        paddingTop: '30px',
        paddingLeft: '45px',
        paddingBottom: '30px',
        marginBottom: '100px',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        position: 'static',
        [theme.breakpoints.down('lg')]: {
            marginBottom: '62px'
        }
    },
    authContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    headerLabel: {
        fontSize: '48px',
        fontWeight: 400,
        [theme.breakpoints.down('lg')]: {
            fontSize: '30px'
        }
    },
    pageHeader: {
        fontWeight: 400,
        fontSize: '48px',
        lineHeight: '56px',
        color: '#fff',
        marginBottom: '29px',
        [theme.breakpoints.down('lg')]: {
            fontSize: '30px',
            marginBottom: '15px'
        }
    },
    authFormPaper: {
        paddingTop: '59px',
        paddingLeft: '70px',
        paddingRight: '70px',
        paddingBottom: '143px',
        width: '100%',
        maxWidth: '500px',
        borderRadius: '10px',
        [theme.breakpoints.down('lg')]: {
            paddingTop: '30px',
            paddingBottom: '72px',
            paddingLeft: '35px',
            paddingRight: '35px',
            width: '350px'
        }
    },
    authFormHeader: {
        fontWeight: 400,
        fontSize: '39px',
        color: '#000',
        marginBottom: '28px',
        [theme.breakpoints.down('lg')]: {
            fontSize: '25px'
        }
    },
    authFormErrorMessage: {
        color: '#ff0000',
        fontSize: '15px',
        marginBottom: '20px'
    },
    passwordInput: {
        marginBottom: '44px'
    },
    submit : {
        marginTop: '44px',
        paddingTop: '16px',
        paddingBottom: '16px',
        background: '#16bde7',
        borderRadius: '30px',
        textTransform: 'none',
        color: '#fff',
        '&:hover': {
            background: '#87cefa' 
        },
        [theme.breakpoints.down('lg')]: {
            paddingTop: '10px',
            paddingBottom: '10px'
        }
    },
    textfield__label_dark: {
        color: '#fff',
    },
    textfield__input_dark: {
        color: '#fff',
    },
    textfield__label: {
        color: '#000'
    },
    textfield__input: {
        color: '#000'
    },
    notchedOutline: {
        borderColor: '#fff !important',
        color: '#fff !important'
    },
    notchedOutlineDark: {
        borderColor: '#3f51b5 !important',
        color: '#3f51b5 !important'
    },
    root: {
        "& .MuiFormLabel-root.Mui-focused": {
            color: '#fff'
        }
    },

}));

export default useStyles;