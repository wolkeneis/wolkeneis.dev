import { Google as GoogleIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  CardMedia
} from "@mui/material";
import { ReactNode } from "react";
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
      <LoginCard
        icon={<GoogleIcon />}
        provider="google"
        providerName="Google"
      />
      <LoginCard
        icon={
          <Box sx={{ width: "24px", height: "24px" }}>
            <img
              src={theme === "light-theme" ? DarkDiscordIcon : LightDiscordIcon}
              width="24px"
            />
          </Box>
        }
        provider="discord"
        providerName="Discord"
      />
    </Box>
  );
};

const LoginCard = ({
  provider,
  providerName,
  icon
}: {
  provider: string;
  providerName: string;
  icon: ReactNode;
}) => {
  return (
    <Card sx={{ margin: "10px", width: "345px" }}>
      <CardHeader avatar={icon} title={providerName} />
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
          }/login/${provider}`}
        >
          Login
        </Button>
      </CardActions>
    </Card>
  );
};

export default LoginPage;
