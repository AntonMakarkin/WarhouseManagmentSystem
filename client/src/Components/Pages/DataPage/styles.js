import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
    dataPageContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    },
    addButton: {
        textTransform: 'none',
        marginBottom: '10px'
    },
    dataItemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    }
}));

export default useStyles;