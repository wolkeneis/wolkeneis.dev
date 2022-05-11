import { Route, Routes } from "react-router-dom";
import Header from "../header/Header";
import LoginPage from "./LoginPage";
import PrivacyPolicy from "./PrivacyPolicy";
import ProfileSettings from "./ProfileSettings";

const Content = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<ProfileSettings />} path="/profile" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<PrivacyPolicy />} path="/privacy" />
      </Routes>
    </>
  );
};

export default Content;
