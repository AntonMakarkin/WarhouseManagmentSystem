import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    changeDetailsPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    },
    changeDetailsPageHeader: {
        fontSize: '1.5em',
        marginBlockStart: '0.83em',
        marginBlockEnd: '0.83em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        fontWeight: 'bold',
        lineHeight: '1.43'
    },
    changeDetailsPageInput: {
        marginBottom: '10px'
    }
}));

export default useStyles;