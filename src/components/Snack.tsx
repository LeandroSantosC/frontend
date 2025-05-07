import { Alert, CircularProgress, Grow, Snackbar, SnackbarCloseReason } from "@mui/material";

export default function MySnack({ open, severity, message, loading }:{ open: boolean, severity?:OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined , message?: string, loading?: boolean }){

    const handleCloseSnack = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpenSnack({ open: false });
      };

    return (
      <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={open}
          onClose={handleCloseSnack}
          autoHideDuration={5000}
          slots={{ transition: Grow }}
        >
          <Alert
            onClose={handleCloseSnack}
            severity={severity}
            icon={loading ? <CircularProgress size={'20px'}/> : false}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {message}
          </Alert>
        </Snackbar>
    )
  }