import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
   loaderContainer: {
       display: 'flex',
       flex: '1 0 auto',
       flexDirection: 'column',
       alignItems: 'center',
       justifyContent: 'center'
   }
}));

export default useStyles;