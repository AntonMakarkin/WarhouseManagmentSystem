import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
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
    underline: {
        /*'&::after': {
          borderBottom: '2px solid #000 !important'
        },
        '&::before': {
          borderBottom: '2px solid #000 !important'
        }*/
    },
    selectBorder: {
        '&:before': {
            borderColor: 'white',
        },
        '&:after': {
            borderColor: 'white',
        },
    },
    select: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#000',
            color: '#000'
        },
    },
    darkSelect: {
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',
            color: '#fff'
        }
    },
}));

export default useStyles;