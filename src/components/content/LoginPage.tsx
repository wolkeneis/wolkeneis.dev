import { Google as GoogleIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import DarkDiscordIcon from "../../media/discord-dark.svg";
import LightDiscordIcon from "../../media/discord-light.svg";
import { useAppSelector } from "../../redux/hooks";

const LoginPage = () => {
  const theme = useAppSelector((state) => state.interface.theme);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card sx={{ margin: "5px", width: "345px" }}>
        <CardHeader avatar={<GoogleIcon />} title="Google" />
        <CardMedia
          alt="Random Image"
          component="img"
          height="154px"
          image={`https://picsum.photos/seed/${uuidv4()}/600`}
        />
        <CardActions>
          <Button
            component="a"
            href={`${
              process.env.REACT_APP_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"
            }/login/google`}
          >
            Login
          </Button>
        </CardActions>
      </Card>
      <Card sx={{ margin: "5px", width: "345px" }}>
        <CardHeader
          avatar={
            <Box sx={{ width: "24px", height: "24px" }}>
              <img
                src={
                  theme === "light-theme" ? DarkDiscordIcon : LightDiscordIcon
                }
                width="24px"
              />
            </Box>
          }
          title="Discord"
        />
        <CardMedia
          alt="Random Image"
          component="img"
          height="154px"
          image={`https://picsum.photos/seed/${uuidv4()}/600`}
        />
        <CardActions>
          <Button
            component="a"
            href={`${
              process.env.REACT_APP_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"
            }/login/discord`}
          >
            Login
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default LoginPage;
