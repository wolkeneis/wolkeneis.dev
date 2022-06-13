import AppsIcon from "@mui/icons-material/Apps";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DescriptionIcon from "@mui/icons-material/Description";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  styled,
  SwipeableDrawer,
  Typography,
  useTheme
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleDrawer } from "../../redux/interfaceSlice";
import LinkBehavior from "../LinkBehavior";

const Navigator = () => {
  const drawerOpen = useAppSelector((state) => state.interface.drawerOpen);
  const drawerWidth = useAppSelector((state) => state.interface.drawerWidth);
  const mobile = useAppSelector((state) => state.interface.mobile);
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
        <IconButton onClick={() => dispatch(toggleDrawer(null))}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem button component={LinkBehavior} href="/apps">
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText primary="Apps" />
        </ListItem>
        <ListItem button component={LinkBehavior} href="/privacy">
          <ListItemIcon>
            <PrivacyTipIcon />
          </ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
        <Divider />
        <Typography sx={{ margin: 2 }} variant="subtitle2">
          Developer
        </Typography>
        <ListItem button component={LinkBehavior} href="/documentation">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="API Documentation" />
        </ListItem>
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
        Version {import.meta.env.VITE_SITE_VERSION}
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
