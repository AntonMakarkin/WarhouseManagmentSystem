import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

//import useStyles from './styles';

const Paginate = ({ page, getAllItems, collection }) => {
    const { numberOfPages } = useSelector(state => state['data']);
    const dispatch = useDispatch();
    const match = useRouteMatch();

    //const classes = useStyles()

    useEffect(() => {
        if (page) {
            dispatch(getAllItems(page, collection));
        }
    }, [dispatch, page, getAllItems, collection]);

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