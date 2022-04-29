import { useContext } from "react";
import { Grid, InputLabel, MenuItem, FormControl, Select} from "@material-ui/core";

import Context from '../../../Context/context';

import useStyles from './styles';

const SelectInput = ({ name, handleChange, label, autoFocus, value, items }) => {
    const classes = useStyles();
    const { darkMode } = useContext(Context);
    let labelclass;
    let inputclass;
    let select;
    let root;
    let notchedOutline

    if (darkMode) {
        labelclass = classes.textfield__label_dark;
        inputclass = classes.textfield__input_dark;
        root = classes.root;
        notchedOutline = classes.notchedOutline;
        select = classes.darkSelect;
    } else {
        labelclass = classes.textfield__label;
        inputclass = classes.textfield__input;
        select = classes.select
    }

    return (
        <Grid item md={12}>
            <FormControl fullWidth variant="outlined">
                <InputLabel classes={{root: labelclass}}>{label}</InputLabel>
                <Select
                    value={value}
                    label={label}
                    onChange={handleChange}
                    className={select}>
                        {items.map((item, i) => (
                            <MenuItem key={i} value={item}>{item}</MenuItem>
                        ))}
                </Select>
            </FormControl>
        </Grid>
    )
}

export default SelectInput