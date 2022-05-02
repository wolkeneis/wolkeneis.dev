import { CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  customTokenSignIn,
  idToken,
  requestSessionCookie
} from "../logic/auth";

const Endpoints = () => {
  const { endpoint } = useParams();
  const [parameters] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (endpoint === "session") {
      const customToken = parameters.get("token");
      const csrfToken = parameters.get("_csrf");
      if (!customToken || !csrfToken) {
        throw new Error("Missing Arguments.");
      }
      customTokenSignIn(customToken)
        .then(idToken)
        .then((idToken) => {
          if (!idToken) throw new Error("Sign In failed");
          return requestSessionCookie(idToken, csrfToken);
        })
        .then(() => navigate("/redirect/profile", { replace: true }))
        .catch((error) => console.error(error));
    }
  }, [endpoint]);

  return <CircularProgress sx={{ margin: "auto" }} />;
};

export default Endpoints;
