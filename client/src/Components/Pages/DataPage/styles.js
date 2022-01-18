import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    dataPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    },
    dataPageHeader: {
        fontSize: '1.5em',
        marginBlockStart: '0.83em',
        marginBlockEnd: '0.83em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        fontWeight: 'bold',
        lineHeight: '1.43'
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