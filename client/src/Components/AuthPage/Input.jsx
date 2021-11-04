import React, { useContext } from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Context from '../../Context/context';

import useStyles from './styles';

const Input = ({ name, handleChange, label, autoFocus, type, handleShowPassword }) => {
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
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputLabelProps={{className: labelclass}}
                InputProps={name === 'password' ? { 
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    ),
                    className: inputclass,
                    classes: {
                        notchedOutline: notchedOutline,
                    }
                } : {className: inputclass, classes: {
                    notchedOutline: notchedOutline
                }}}
            />
        </Grid>
    )
};

export default Input;