import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getCouriers } from '../../Actions/Personal/couriers';
import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector(state => state);
    const dispatch = useDispatch();

    const classes = useStyles();

    useEffect(() => {
        if (page) {
            dispatch(getCouriers(page));
        }
    }, [dispatch, page]);

    return (
        <Pagination
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="secondary"
            renderItem={item => (
                <PaginationItem {...item}/>
            )}
        />
    )
}

export default Paginate;