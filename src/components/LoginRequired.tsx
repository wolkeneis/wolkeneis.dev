import { Alert, Button, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setLoginRequiredVisible } from "../redux/interfaceSlice";

const LoginRequired = () => {
  const loginRequiredVisible = useAppSelector(
    (state) => state.interface.loginRequiredVisible
  );
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      autoHideDuration={8000}
      onClose={() => dispatch(setLoginRequiredVisible(false))}
      open={loginRequiredVisible}
    >
      <Alert
        action={
          <Button
            component="a"
            href={`${
              import.meta.env.VITE_MAIN_PAGE ?? "https://wolkeneis.dev"
            }/redirect/login`}
            onClick={() => dispatch(setLoginRequiredVisible(false))}
            size="small"
          >
            Login
          </Button>
        }
        onClose={() => dispatch(setLoginRequiredVisible(false))}
        severity="error"
        variant="filled"
      >
        You are not logged in. Please log in to continue.
      </Alert>
    </Snackbar>
  );
};

export default LoginRequired;
