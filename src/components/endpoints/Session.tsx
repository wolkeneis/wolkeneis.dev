import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  customTokenSignIn,
  idToken,
  requestSessionCookie
} from "../../logic/auth";

const SessionHandler = () => {
  const [parameters] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  return <></>;
};

export default SessionHandler;
