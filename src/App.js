import { lazy, Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Loader from "./component/Loader";
import AddContactHandler from "./component/routes/AddContactHandler";
import QueryRedirect from "./component/routes/QueryRedirect";
import "./logic/polyfills";
import { os } from "./logic/utils";
import { selectTheme, setMobile } from "./redux/interfaceSlice";

const Content = lazy(() => import("./component/content/Content"));
const Footer = lazy(() => import("./component/footer/Footer"));
const Header = lazy(() => import("./component/header/Header"));
const Authorize = lazy(() => import("./component/settings/pages/Authorize"));


function App() {
  const mobile = useSelector(state => state.interface.mobile);
  const theme = useSelector(state => state.interface.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const operatingSystem = os();
    dispatch(setMobile(operatingSystem === "ios" || operatingSystem === "android"));
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      dispatch(selectTheme(storedTheme));
    }
  }, [dispatch]);

  useEffect(() => {
    if (theme) {
      localStorage.setItem("theme", theme);
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



export default App;
