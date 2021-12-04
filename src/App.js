import { Capacitor } from "@capacitor/core";
import { Device } from "@capacitor/device";
import { Storage } from "@capacitor/storage";
import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./App.scss";
import Loader from "./component/Loader";
import QueryRedirect from "./component/QueryRedirect";
import { addContact } from "./logic/contacts";
import "./logic/polyfills";
import { initializeKeys } from "./logic/signal";
import { selectTheme, setMobile, setNative } from "./redux/interfaceSlice";

const Content = lazy(() => import("./component/content/Content"));
const Footer = lazy(() => import("./component/footer/Footer"));
const Header = lazy(() => import("./component/header/Header"));
const Authorize = lazy(() => import("./component/settings/pages/Authorize"));

function App() {
  const mobile = useSelector(state => state.interface.mobile);
  const theme = useSelector(state => state.interface.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const native = Capacitor.isNativePlatform();
    dispatch(setNative(native));
    initializeKeys(native);
    Device.getInfo().then(info => {
      const mobile = info.operatingSystem === "ios" || info.operatingSystem === "android";
      dispatch(setMobile(mobile));
    });
    Storage.get({ key: "theme" }).then(theme => {
      if (theme.value) {
        dispatch(selectTheme(theme.value));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (theme) {
      Storage.set({ key: "theme", value: theme });
    }
  }, [theme]);


  return (
    <div className={`App ${theme} ${mobile ? "mobile" : ""}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/redirect">
            <Route path="/redirect/profile" element={<QueryRedirect to="/settings/profile" />} />
            <Route path="/redirect/authorize" element={<QueryRedirect to="/authorize" />} />
          </Route>
          <Route from="/addcontact/:userId" element={<AddContactHandler />} />
          <Route path="/authorize"
            element={
              <Suspense fallback={<Loader />}>
                <Header />
                <Authorize />
              </Suspense>} />
          <Route path={"/*"} element={
            <Suspense fallback={<Loader />}>
              <Header />
              <Content />
              <Footer />
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const AddContactHandler = ({ children, ...props }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      addContact(userId)
        .then(() => navigate("/settings/contacts"))
        .catch(() => navigate("/settings/contacts"));
    }
  }, [navigate, userId]);

  return (
    <>
      {children}
    </>
  );
}

export default App;
