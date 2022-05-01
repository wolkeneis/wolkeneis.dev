import { Logout, OpenInNew } from "@mui/icons-material";
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
import { MouseEventHandler, useState } from "react";
import { useAppSelector } from "../../redux/hooks";

const Profile = () => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const profile = useAppSelector((state) => state.social.profile);

  //useEffect(() => {
  //  fetchSelfProfile().then((profile) => dispatch(setProfile(profile)));
  //}, []);

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
            <Button
              component="a"
              href={`${process.env.REACT_APP_BACKEND}/authenticate`}
            >
              Login
            </Button>
          ) : (
            <>
              {profile.avatar ? (
                <Avatar
                  alt={profile.username}
                  id="avatar-button"
                  onClick={handleClick}
                  src={profile.avatar}
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
                <MenuItem
                  component="a"
                  href={`${process.env.REACT_APP_BACKEND}/redirect/profile`}
                >
                  <ListItemIcon>
                    <OpenInNew fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Account" />
                </MenuItem>
                <Divider />
                <MenuItem
                  component="a"
                  href={`${process.env.REACT_APP_BACKEND}/logout`}
                >
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
