import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';

import { getCouriers } from '../../Actions/Personal/couriers';
import useStyles from './styles';

const Paginate = ({ page }) => {
    const { numberOfPages } = useSelector(state => state)
}

export default Paginate;