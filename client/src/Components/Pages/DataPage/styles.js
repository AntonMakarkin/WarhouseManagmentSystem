import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    dataPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        overflow: 'auto'
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
    dataPageButtonsPanel: {
        display: 'flex',
        marginBottom: '10px'
    },
    addButton: {
        textTransform: 'none',
        textDecoration: 'none',
        height: '100%',
        marginRight: '10px'
    },
    dataItemsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        overflow: 'auto'
    },
    dataItemsBlocksContainer: {
        flex: '1 0 auto'
    }
}));

export default useStyles;