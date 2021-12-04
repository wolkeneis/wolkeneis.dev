import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import backIcon from "../../media/back.svg";
import Loader from "../Loader";
import { BackButton } from "../settings/pages/Settings";
import SettingsPage from "../settings/SettingsPage";
import "./Content.scss";

const Settings = lazy(() => import("../settings/pages/Settings"));
const ProfileSettings = lazy(() => import("../settings/pages/ProfileSettings"));
const ContactSettings = lazy(() => import("../settings/pages/ContactSettings"));
const DeveloperSettings = lazy(() => import("../settings/pages/DeveloperSettings"));

const Content = () => {

  return (
    <div className="Content">
      <Routes>
        <Route path="/settings">
          <Route path="/settings/profile" element={
            <SettingsPage>
              <Suspense fallback={<Loader />}>
                <BackButton linkName="Back to Settings" imageAlt="Back" imageSource={backIcon} destination="/settings">
                  <span>Back</span>
                </BackButton>
                <ProfileSettings />
              </Suspense>
            </SettingsPage>
          } />
          <Route path="/settings/contacts" element={
            <SettingsPage>
              <Suspense fallback={<Loader />}>
                <BackButton linkName="Back to Settings" imageAlt="Back" imageSource={backIcon} destination="/settings">
                  <span>Back</span>
                </BackButton>
                <ContactSettings />
              </Suspense>
            </SettingsPage>
          } />
          <Route path="/settings/developer" element={
            <SettingsPage>
              <Suspense fallback={<Loader />}>
                <BackButton linkName="Back to Settings" imageAlt="Back" imageSource={backIcon} destination="/settings">
                  <span>Back</span>
                </BackButton>
                <DeveloperSettings />
              </Suspense>
            </SettingsPage>
          } />
          <Route path="/settings" element={
            <SettingsPage>
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            </SettingsPage >
          } />
        </Route>
      </Routes>
    </div >
  );
}

export default Content;
