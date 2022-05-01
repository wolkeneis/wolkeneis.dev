import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

const Redirects = () => {
  return (
    <Routes>
      <Route element={<SessionRedirect />} path="/session"></Route>
      <Route element={<ProfileRedirect />} path="/profile"></Route>
    </Routes>
  );
};

const SessionRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    navigate(`/session${location.search}`, {
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

export default Redirects;
