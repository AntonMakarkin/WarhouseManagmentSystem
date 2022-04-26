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
    avatarContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    detailsContainer: {
        paddingTop: '50px',
        display: 'flex',
        flexGrow: '1',
        overflow: 'auto'
    },
    detailsAvatar: {
        width: '300px',
        height: '300px',
        margin: '0 auto',
        marginBottom: '30px',
        border: '2px solid #fff',
        borderRadius: '15%'
    },
    textDetailsContainer: {
        display: 'flex'
    },
    detailsBlock: {
        display: 'flex',
        marginBottom: '20px'
    },
    detailsDescription: {
        marginRight: '10px'
    },
    errorMessage: {
        paddingLeft: '10px',
        paddingRight: '10px',
        color: '#ff0000',
        textAlign: 'center'
    },
    uploadAvatarBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '270px'
    },
    sendAvatarButton: {
        width: '100%',
        marginBottom: '10px'
    },
    actionButtons: {
        maxWidth: '190px',
        display: 'flex',
        flexDirection: 'column'
    },
    actionButton: {
        marginBottom: '10px'
    }
}));

export default useStyles;