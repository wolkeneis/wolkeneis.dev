import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const Redirects = () => {
  return (
    <Routes>
      <Route element={<SessionRedirect />} path="/session"></Route>
      <Route element={<ProfileRedirect />} path="/profile"></Route>
      <Route element={<LoginRedirect />} path="/login"></Route>
      <Route element={<LogoutRedirect />} path="/logout"></Route>
    </Routes>
  );
};

const SessionRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(`/endpoints/session${location.search}`, {
      replace: true
    });
  }, []);

  return null;
};

const ProfileRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/profile", {
      replace: true
    });
  }, []);

  return null;
};

const LoginRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", {
      replace: true
    });
  }, []);

  return null;
};

const LogoutRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/endpoints/logout", {
      replace: true
    });
  }, []);

  return null;
};

export default Redirects;
