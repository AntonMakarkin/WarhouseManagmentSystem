import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getCouriers } from '../../Actions/Personal/couriers';
import useStyles from './styles';

const Paginate = ({ page, getAllItems }) => {
    const { numberOfPages } = useSelector(state => state['personal']);
    const dispatch = useDispatch();
    const match = useRouteMatch();

    const classes = useStyles();

    useEffect(() => {
        if (page) {
            dispatch(getAllItems(page));
        }
    }, [dispatch, page, getAllItems]);

    return (
        <Pagination
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="secondary"
            renderItem={item => (
                <PaginationItem {...item} component={Link} to={`${match.url}?page=${item.page}`}/>
            )}
        />
    )
}

export default Paginate;