import {
  Apps as AppsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Description as DescriptionIcon,
  PrivacyTip as PrivacyTipIcon
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  styled,
  Typography,
  useTheme
} from "@mui/material";
import packageJson from "../../../package.json";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleDrawer } from "../../redux/interfaceSlice";
import LinkBehavior from "../LinkBehavior";

const Navigator = () => {
  const drawerOpen = useAppSelector((state) => state.interface.drawerOpen);
  const drawerWidth = useAppSelector((state) => state.interface.drawerWidth);
  const dispatch = useAppDispatch();
  const theme = useTheme();

  return (
    <Drawer
      anchor="left"
      open={drawerOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box"
        }
      }}
      variant="persistent"
    >
      <DrawerHeader>
        <IconButton onClick={() => dispatch(toggleDrawer())}>
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
        <ListSubheader>Developer</ListSubheader>
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
        Version {packageJson.version}
      </Typography>
    </Drawer>
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
