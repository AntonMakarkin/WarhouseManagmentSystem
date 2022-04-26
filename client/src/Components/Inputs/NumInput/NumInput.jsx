import { useContext } from "react";
import { TextField, Grid } from '@material-ui/core';

import Context from '../../../Context/context';

import useStyles from './styles';

const NumInput = ({ name, handleChange, label, autoFocus, value, handleShowPassword }) => {
    const classes = useStyles();
    const { darkMode } = useContext(Context);
    let labelclass;
    let inputclass;
    let root;
    let notchedOutline

    if (darkMode) {
        labelclass = classes.textfield__label_dark;
        inputclass = classes.textfield__input_dark;
        root = classes.root;
        notchedOutline = classes.notchedOutline;
    } else {
        labelclass = classes.textfield__label;
        inputclass = classes.textfield__input;
    }
    
    return (
        <Grid item md={12}>
            <TextField
                className={root}
                name={name}
                value={value}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type="number"
                InputLabelProps={{className: labelclass}}
                InputProps={{
                    className: inputclass,
                    classes: {
                        notchedOutline: notchedOutline,
                    },
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                }}
            />
        </Grid>
    )
};

export default NumInput;