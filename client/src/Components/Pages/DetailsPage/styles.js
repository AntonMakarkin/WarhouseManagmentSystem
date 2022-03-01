import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    detailsPageContainer: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1'
    },
    detailsPageHeader: {
        fontSize: '1.5em',
        marginBlockStart: '0.83em',
        marginBlockEnd: '0.83em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        fontWeight: 'bold',
        lineHeight: '1.43'
    },
}));

export default useStyles;