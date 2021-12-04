import { useMatch, useNavigate } from "react-router-dom";
import settingsIcon from "../../media/settings.svg";
import IconButton from "../IconButton";
import "./Navigator.scss";

const Navigator = () => {
  const navigate = useNavigate();

  const settingsMatch = useMatch('/settings/*');

  return (
    <nav className="Navigator">
      <IconButton buttonName="Settings" imageAlt="Settings Icon" imageSource={settingsIcon} onClick={() => navigate(settingsMatch !== null ? "/" : "/settings")} />
    </nav>
  );
}

export default Navigator;
