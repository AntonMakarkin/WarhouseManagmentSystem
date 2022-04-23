import { useSelector } from 'react-redux';

import DataItem from '../DataItem/DataItem';
import useStyles from './styles';

const DataItems = ({ deleteAction, collection, setActive, setItemId }) => {
    const { items } = useSelector((state) => state.data);
    const classes = useStyles();
    
    return (
        <div className={classes.dataItemsBlocksContainer}>
            {items.map(item => (
                <DataItem key={item._id} 
                          item={item}
                          setActive={setActive} 
                          deleteAction={deleteAction}
                          collection={collection}
                          setItemId={setItemId}/>
            ))}
        </div>
    )
}

export default DataItems;
