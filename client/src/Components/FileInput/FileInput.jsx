import { useState, useContext, useRef } from 'react';
import { Box, Button, Typography } from '@material-ui/core';

import Context from '../../Context/context';

import useStyles from './styles';

const FileInput = ({ allowedFormats, setFile, setFileError, fileSize, setSendButtonDisabled }) => {
    const { darkMode } = useContext(Context);
    const [fileName, setFileName] = useState('Название файла');
    const hiddenFileInput = useRef(null);
    const classes = useStyles();

    const mimeType = (headerStr) => {
        let type = '';
        switch (headerStr) {
            case "89504e47":
                type = "image/png";
                break;
            case "ffd8ffe0":
            case "ffd8ffe1":
            case "ffd8ffe2":
                type = 'image/jpg';
                break;
            default:
                type = "unknown";
                break;
        }
        return type;
    }

    const readUploadedFileAsArray = (inputFile) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException('Проблема с чтением файла'))
            }

            reader.onload = () => {
                resolve(reader.result);
            }
            reader.readAsArrayBuffer(inputFile);
        });

    }

    const getFileHeader = (file) => {
        const arr = (new Uint8Array(file)).subarray(0, 4);
        let header = '';
        for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
        }
        return header;
    }

    const handleClick = () => {
        hiddenFileInput.current.click();
    }

    const handleChange = async (e) => {
        const file = e.target.files[0];
        const size = file.size;
        let fileName = file.name;

        try {
            if (size > fileSize) {
                throw new Error('Размер файла слишком велик');
            }

            const fileContents = await readUploadedFileAsArray(file);
            const header = getFileHeader(fileContents);
            const type = mimeType(header);
            const isAllow = allowedFormats.includes(type);

            if (!isAllow) {
                throw new Error('');
            }

            if (fileName.length > 14) {
                fileName = file.name.slice(0, 11) + '...';
            }

            setFileName(fileName);
            setFile(file);
            setFileError(false);
            setSendButtonDisabled(false);
        } catch (e) {
            setSendButtonDisabled(true);
            setFileName('Название файла');
            setFileError(true);
        }
    }

    return (
        <Box className={classes.uploadInputBlock}
             style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Button variant="contained"
                        onClick={handleClick} 
                        style={darkMode ? {color: '#fff', backgroundColor: 'rgb(26, 32, 46)'} : {color: '#000'}}>Загрузить</Button>
                <input style={{ display: 'none' }} 
                       type="file" 
                       name="fileAvatar" 
                       ref={hiddenFileInput}
                       onChange={handleChange}/>
                <Typography>{fileName}</Typography>
        </Box>
    )
}

export default FileInput;