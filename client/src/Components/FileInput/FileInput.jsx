import { useState, useContext, useRef } from 'react';
import { Box, Button } from '@material-ui/core';

import Context from '../../Context/context';

import useStyles from './styles';

const FileInput = () => {
    const { darkMode } = useContext(Context);
    const [file, setFile] = useState(null);
    const hiddenFileInput = useRef(null);
    const classes = useStyles();

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const getBlobFileHeader = () => {

    }

    const handleChange = (e) => {
        console.log(e.target.files)
        const reader = new FileReader();
        reader.onload = () => {
            console.log(reader.result);
        }
        reader.readAsText(e.target.files[0]);
    }

    //console.log(file);

    return (
        <Box>
            <Button variant="contained"
                    onClick={handleClick} 
                    style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>Загрузить</Button>
            <input style={{ display: 'none' }} 
                   type="file" 
                   name="fileAvatar" 
                   ref={hiddenFileInput}
                   onChange={handleChange}/>
        </Box>
    )
}

export default FileInput;