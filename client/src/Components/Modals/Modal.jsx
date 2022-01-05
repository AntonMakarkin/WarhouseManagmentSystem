import React from 'react';

import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './styles';

const Modal = ({ active, setActive, header, children }) => {
    const classes = useStyles();

    return (
        <div className={active ? `${classes.overlay} ${classes.overlayActive}` : classes.overlay} onClick={() => setActive(false)}>
            <div className={active ? `${classes.modal} ${classes.modalActive}` : classes.modal} onClick={e => e.stopPropagation()}>
                <IconButton className={classes.modalCloseButton} onClick={() => setActive(false)} >
                    <CloseIcon/>
                </IconButton>
                <h3>{header}</h3>
                {children}
            </div>
        </div>
    )
}

export default Modal;
