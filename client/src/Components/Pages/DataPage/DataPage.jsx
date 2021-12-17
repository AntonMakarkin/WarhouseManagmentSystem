import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCouriers } from '../../../Actions/Personal/couriers';

const DataPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCouriers());
    }, [dispatch]);
    
    return (
        <div>
            
        </div>
    )
}

export default DataPage
