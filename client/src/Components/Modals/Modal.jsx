import React from 'react';

import { Container } from '@material-ui/core';

import useStyles from './styles';

const Modal = ({ active, setActive, header, children }) => {
    const classes = useStyles();

    return (
        <div className={active ? `${classes.overlay} ${classes.overlayActive}` : classes.overlay} onClick={() => setActive(false)}>
            <div className={active ? `${classes.modal} ${classes.modalActive}` : classes.modal} onClick={e => e.stopPropagation()}>
                <Container>
                    <h3>{header}</h3>
                    {children}
                </Container>
            </div>
        </div>
    )
}

export default Modal;
