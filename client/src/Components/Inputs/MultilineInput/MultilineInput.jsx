import { useContext } from "react"
import { TextField, Grid } from '@material-ui/core'

import Context from '../../../Context/context';

import useStyles from './styles';

const MultilineInput = ({ name, handleChange, label, autoFocus, type, value, handleShowPassword }) => {
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
                multiline
                rows={4}
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputLabelProps={{className: labelclass}}
                InputProps={{
                    className: inputclass,
                    classes: {
                        notchedOutline: notchedOutline,
                    }
                }}
            />
        </Grid>
    )
}

export default MultilineInput