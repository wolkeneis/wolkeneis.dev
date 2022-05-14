import { Logout as LogoutIcon } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  FormControlLabel,
  styled,
  Switch
} from "@mui/material";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchProfile } from "../../logic/api";
import { updateProfileInformation } from "../../logic/profile";
import { useAppSelector } from "../../redux/hooks";

const ProfileSettings = () => {
  const profile = useAppSelector((state) => state.session.profile);
  const [privateProfile, setPrivate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (profile === null) {
      navigate("/login");
    } else {
      if (profile) {
        setPrivate(profile.private ?? false);
      }
    }
  }, [profile]);

  const onPrivacyChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPrivate(event.target.checked);
    try {
      const successful = await patchProfile({ private: event.target.checked });
      if (!successful) {
        //SHOW ERROR
      }
      updateProfileInformation();
    } catch (error) {
      //SHOW ERROR
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      {profile === undefined ? (
        <CircularProgress />
      ) : (
        <>
          {profile !== null ? (
            <>
              <Card>
                <CardHeader
                  avatar={
                    <>
                      {profile.avatar ? (
                        <>
                          <Avatar
                            alt={profile.username}
                            src={(profile.avatar as string) ?? ""}
                          />
                        </>
                      ) : (
                        <Avatar alt={profile.username}>
                          {profile.username.substring(0, 2)}
                        </Avatar>
                      )}
                    </>
                  }
                  subheader={profile.uid}
                  title={profile?.username}
                />
                <CardMedia
                  alt="Random Image"
                  component="img"
                  height="194px"
                  image={`https://picsum.photos/seed/${profile.uid.toLowerCase()}${
                    profile.creationDate
                  }/600`}
                />
                <CardContent>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={privateProfile}
                        onChange={onPrivacyChange}
                      />
                    }
                    label="Private Account"
                  />
                  <QRCodeBox>
                    <QRCode
                      renderAs="svg"
                      size={160}
                      value={`${window.location.origin}/addcontact/${profile?.uid}`}
                    />
                  </QRCodeBox>
                </CardContent>
                <CardActions>
                  <Button
                    component="a"
                    href={"/redirect/logout"}
                    startIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </CardActions>
              </Card>
            </>
          ) : null}
        </>
      )}
    </Box>
  );
};

const QRCodeBox = styled("div")({
  backgroundColor: "white",
  borderRadius: 5,
  height: 180,
  marginBottom: 10,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 10,
  padding: 10,
  width: 180
});

export default ProfileSettings;
