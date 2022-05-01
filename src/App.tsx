import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import LinkBehavior from "./components/LinkBehavior";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { selectTheme } from "./redux/interfaceSlice";
import "./logic/firebase";
import Header from "./components/header/Header";

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
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header />
      </Box>
    </ThemeProvider>
  );
}

export default App;
