import { Link } from "react-router-dom";
import logo from "../../media/logo.svg";
import "./Branding.scss";

const Branding = () => {
  return (
    <Link className="Branding link" to="/">
      <img src={logo} alt="Logo" />
    </Link>
  );
}

export default Branding;
