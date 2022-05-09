import { Logout, Settings } from "@mui/icons-material";
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem
} from "@mui/material";
import { MouseEventHandler, useEffect, useState } from "react";
import { updateProfileInformation } from "../../logic/profile";
import { useAppSelector } from "../../redux/hooks";

const Profile = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const profile = useAppSelector((state) => state.session.profile);

  useEffect(() => {
    updateProfileInformation();
  }, []);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <>
      {profile === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {profile === null ? (
            <Button component="a" href={"/redirect/login"}>
              Login
            </Button>
          ) : (
            <>
              {profile.avatar ? (
                <Avatar
                  alt={profile.username}
                  id="avatar-button"
                  onClick={handleClick}
                  src={profile.avatar as string}
                  sx={{ cursor: "pointer" }}
                />
              ) : (
                <Avatar
                  id="avatar-button"
                  onClick={handleClick}
                  sx={{ cursor: "pointer" }}
                >
                  {profile.username.substring(0, 2)}
                </Avatar>
              )}
              <Menu
                MenuListProps={{
                  "aria-labelledby": "avatar-button"
                }}
                anchorEl={anchor}
                id="basic-menu"
                onClose={handleClose}
                open={anchor !== null}
                sx={{ mt: ".5em" }}
              >
                <MenuItem component="a" href={"/redirect/profile"}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </MenuItem>
                <Divider />
                <MenuItem component="a" href={"/redirect/logout"}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </MenuItem>
              </Menu>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
