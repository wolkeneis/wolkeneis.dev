import GoogleIcon from "@mui/icons-material/Google";
import {
  Box,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  IconButton
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DarkDiscordIcon from "../../media/discord-dark.svg";
import LightDiscordIcon from "../../media/discord-light.svg";
import { useAppSelector } from "../../redux/hooks";

const LoginPage = () => {
  const theme = useAppSelector((state) => state.interface.theme);
  const mobile = useAppSelector((state) => state.interface.mobile);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: mobile ? 0 : "12%"
      }}
    >
      <Card
        sx={{
          maxWidth: 385,
          width: "fill-available"
        }}
      >
        <CardHeader title="Login" />
        <CardMedia
          alt="Random Image"
          component="img"
          height="154px"
          image={`https://picsum.photos/seed/${uuidv4()}/600`}
        />
        <CardActions disableSpacing>
          <IconButton
            aria-label="google"
            component="a"
            href={`${
              import.meta.env.VITE_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"
            }/login/google`}
          >
            <GoogleIcon />
          </IconButton>
          <IconButton
            aria-label="discord"
            component="a"
            href={`${
              import.meta.env.VITE_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"
            }/login/discord`}
          >
            <img
              src={theme === "light-theme" ? DarkDiscordIcon : LightDiscordIcon}
              width="24px"
            />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
};

export default LoginPage;
