import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    linkPageHeader: {
        fontSize: '1.5em',
        marginBlockStart: '0.83em',
        marginBlockEnd: '0.83em',
        marginInlineStart: '0px',
        marginInlineEnd: '0px',
        fontWeight: 'bold',
        lineHeight: '1.43'
    },
    linkPageLinksBlock: {
        display: 'flex',
        flexDirection: 'column'
    },
    linkPageLink: {
        fontSize: '16px',
        textDecoration: 'none',
        display: 'block',
        width: '100%',
        height: '100%',
        padding: '8px 16px'
    }
}));

export default useStyles;