import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Content from "./components/content/Content";
import Endpoints from "./components/Endpoints";
import LinkBehavior from "./components/LinkBehavior";
import Redirects from "./components/Redirects";
import "./logic/firebase";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectTheme } from "./redux/interfaceSlice";

const darkTheme = createTheme({
  palette: {
    mode: "dark"
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: "light"
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
});

function App() {
  const [muiTheme, setTheme] = useState(darkTheme);
  const theme = useAppSelector((state) => state.interface.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      dispatch(
        selectTheme(
          storedTheme === "light-theme" ? "light-theme" : "dark-theme"
        )
      );
    }
  }, [dispatch]);

  useEffect(() => {
    setTheme(theme === "dark-theme" ? darkTheme : lightTheme);
    if (theme) {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Routes>
        <Route element={<Redirects />} path="/redirect/*" />
        <Route element={<Content />} path="*" />
        <Route element={<Endpoints />} path="/endpoints/:endpoint" />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
