import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
    dataItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px',
        marginBottom: '10px',
        justifyContent: 'space-between'
    },
    dataItemImgNameBlock: {
        display: 'flex',
        alignItems: 'center'
    },
    dataItemImg: {
        marginRight: '10px'
    },
    dataItemButtons: {
        display: 'flex',
        alignItems: 'center'
    },
    openDetailsButton: {
        marginRight: '10px'
    }
}));