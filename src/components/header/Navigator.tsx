import AppsIcon from "@mui/icons-material/Apps";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SwipeableDrawer,
  Typography,
  useTheme
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleDrawer } from "../../redux/interfaceSlice";

const Navigator = () => {
  const drawerOpen = useAppSelector((state) => state.interface.drawerOpen);
  const drawerWidth = useAppSelector((state) => state.interface.drawerWidth);
  const mobile = useAppSelector((state) => state.interface.mobile);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <SwipeableDrawer
      anchor="left"
      onClose={() => dispatch(toggleDrawer(null))}
      onOpen={() => dispatch(toggleDrawer(null))}
      open={drawerOpen}
      sx={
        mobile
          ? {}
          : {
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box"
              }
            }
      }
      variant={mobile ? "temporary" : "persistent"}
    >
      <DrawerHeader>
        <IconButton
          aria-label="Close Navigator Tab"
          onClick={() => dispatch(toggleDrawer(null))}
        >
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List component="nav">
        <ListItemButton
          aria-label="Apps Navigator Button"
          onClick={() => navigate("/apps")}
        >
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Apps" />
        </ListItemButton>
        <ListItemButton
          aria-label="Friendlist Navigator Button"
          onClick={() => navigate("/friends")}
        >
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Friendlist" />
        </ListItemButton>
        <ListItemButton
          aria-label="Privacy Policy Navigator Button"
          onClick={() => navigate("/privacy")}
        >
          <ListItemIcon>
            <PrivacyTipIcon />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItemButton>
        <Divider />
        <Typography sx={{ margin: 2 }} variant="subtitle2">
          Developer
        </Typography>
        <ListItemButton
          aria-label="API Documentation Navigator Button"
          onClick={() => navigate("/documentation")}
        >
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="API Documentation" />
        </ListItemButton>
      </List>
      <Divider />
      <Typography
        sx={{
          mb: "1em",
          mt: "auto",
          textAlign: "center"
        }}
        variant="caption"
      >
        Wolkeneis, Copyright © 2022
        <br />
        Version 0.2.8
      </Typography>
    </SwipeableDrawer>
  );
};

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default Navigator;
