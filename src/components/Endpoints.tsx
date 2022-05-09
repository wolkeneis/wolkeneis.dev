import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { requestSessionCookie } from "../logic/api";
import { customTokenSignIn, idToken } from "../logic/auth";
import { useAppDispatch } from "../redux/hooks";
import { setCSRFToken } from "../redux/sessionSlice";

const Endpoints = () => {
  const { endpoint } = useParams();
  const [parameters] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (endpoint === "session") {
      const customToken = parameters.get("token");
      const csrfToken = parameters.get("_csrf");
      if (csrfToken) {
        dispatch(setCSRFToken(csrfToken));
      }
      if (!customToken) {
        throw new Error("Missing Arguments.");
      }
      customTokenSignIn(customToken)
        .then(idToken)
        .then((idToken) => {
          if (!idToken) throw new Error("Sign In failed");
          return requestSessionCookie(idToken);
        })
        .then(() => navigate("/redirect/profile", { replace: true }))
        .catch((error) => console.error(error));
    }
  }, [endpoint]);

  return <CircularProgress sx={{ margin: "auto" }} />;
};

export default Endpoints;
