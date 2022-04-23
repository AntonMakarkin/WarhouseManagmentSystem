import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    addPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    },
    addPageHeader: {
        fontSize: '1.5em',
        marginBlockStart: '0.83em',
        marginBlockEnd: '0.83em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        fontWeight: 'bold',
        lineHeight: '1.43'
    },
    addPageInput: {
        marginBottom: '10px'
    },
    loadImgInputBox: {
        padding: '12px'
    }
}));

export default useStyles;
