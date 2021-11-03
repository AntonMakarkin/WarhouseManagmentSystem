import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import useStyles from './styles';

const primary = grey[50];

const Input = ({ name, handleChange, label, autoFocus, type, handleShowPassword }) => {
    const classes = useStyles();
    const labelclass = classes.textfield__label
    const inputclass = classes.textfield__input
    return (
        <Grid item md={12}>
            <TextField
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
                    className: inputclass 
                } : {className: inputclass}}
            />
        </Grid>
    )
};

export default Input;