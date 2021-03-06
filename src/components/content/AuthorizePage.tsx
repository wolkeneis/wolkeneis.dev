import CheckIcon from "@mui/icons-material/Check";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

const Authorization = () => {
  const mobile = useAppSelector((state) => state.interface.mobile);
  const [parameters] = useSearchParams();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: mobile ? 0 : "18%"
      }}
    >
      <form
        action={`${
          import.meta.env.VITE_MOOS_BACKEND ?? "https://moos.wolkeneis.dev"
        }/oauth2/authorize`}
        id="authorization-form"
        method="post"
      >
        <input
          name="transaction_id"
          type="hidden"
          value={`${parameters.get("transactionId")}`}
        />
        <input
          name="_csrf"
          type="hidden"
          value={`${parameters.get("_csrf")}`}
        />
        <Card
          sx={{
            maxWidth: 385,
            width: "fill-available"
          }}
        >
          <CardHeader
            subheader={`The external App "${parameters.get(
              "application"
            )}" wants to access your Account.`}
            title={parameters.get("application")}
          />
          <CardContent>
            <List subheader="Permissions">
              <Divider />
              {parameters.get("scope") === "identify" ? (
                <ListItem>
                  <ListItemIcon>
                    <CheckIcon />
                  </ListItemIcon>
                  <ListItemText primary="Read basic profile information" />
                </ListItem>
              ) : (
                <>
                  {parameters.get("scope") === "*" ? (
                    <ListItem>
                      <ListItemIcon>
                        <CheckIcon />
                      </ListItemIcon>
                      <ListItemText primary="Read basic profile information" />
                    </ListItem>
                  ) : (
                    <>
                      <ListItem>
                        <ListItemIcon>
                          <DoNotDisturbAltIcon />
                        </ListItemIcon>
                        <ListItemText primary="An error occurred" />
                      </ListItem>
                    </>
                  )}
                </>
              )}
              <Divider />
            </List>
          </CardContent>
          <CardActions disableSpacing>
            <Button
              form="authorization-form"
              name="cancel"
              type="submit"
              value="Cancel"
            >
              Cancel
            </Button>
            <Button
              form="authorization-form"
              name="allow"
              sx={{ marginLeft: "auto" }}
              type="submit"
              value="Allow"
            >
              Allow
            </Button>
          </CardActions>
        </Card>
      </form>
    </Box>
  );
};

export default Authorization;
