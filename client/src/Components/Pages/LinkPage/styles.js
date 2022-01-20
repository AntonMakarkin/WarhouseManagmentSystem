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
    linkPageLinkCard: {
        transition: 'background-color 0.4s',
        '&:hover': {
            backgroundColor: '#000'
        }
    },
    linkPageLinkCardLight: {
        transition: 'all 0.2s',
        '&:hover': {
            backgroundColor: '#fff'
        }
    },
    linkPageLink: {
        fontSize: '16px',
        textDecoration: 'none',
        display: 'block',
        width: '100%',
        height: '100%',
        padding: '32px 20px',
    }
}));

export default useStyles;