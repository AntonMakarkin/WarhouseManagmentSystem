import { useState, useContext, useRef } from 'react';
import { Box, Button } from '@material-ui/core';

import Context from '../../Context/context';

import useStyles from './styles';

const FileInput = ({ allowedFormats }) => {
    const { darkMode } = useContext(Context);
    const [file, setFile] = useState(null);
    const [formatError, setFormatError] = useState(false);
    const hiddenFileInput = useRef(null);
    let header = '';
    const classes = useStyles();

    console.log(allowedFormats);

    const mimeType = (headerStr) => {
        let type = '';
        switch (headerStr) {
            case "89504e47":
                type = "image/png";
                break;
            case "ffd8ffe0":
                type = 'image/jpg';
                break;
            default:
                type = "unknown";
                break;
        }
        return type;
    }

    const getBlobFileHeader = (e) => {
        const reader = new FileReader();
        let header = '';
        reader.onloadend = (e) => {
            const arr = (new Uint8Array(e.target.result)).subarray(0, 4);
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            console.log(header);
        }
        reader.readAsArrayBuffer(e.target.files[0]);
    }

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const handleChange = (e) => {
        getBlobFileHeader(e);
    }

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