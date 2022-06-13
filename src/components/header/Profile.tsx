import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
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
import { useNavigate } from "react-router-dom";
import { updateProfileInformation } from "../../logic/profile";
import { useAppSelector } from "../../redux/hooks";

const Profile = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const profile = useAppSelector((state) => state.session.profile);
  const navigate = useNavigate();

  useEffect(() => {
    updateProfileInformation();
  }, []);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const handleAccountClick = () => {
    navigate("/profile");
    setAnchor(null);
  };

  return (
    <>
      {profile === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {profile === null ? (
            <Button onClick={() => navigate("/login")}>Login</Button>
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
                <MenuItem onClick={handleAccountClick}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </MenuItem>
                <Divider />
                <MenuItem component="a" href={"/redirect/logout"}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
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
