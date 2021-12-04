import PropTypes from "prop-types";
import "./SettingsPage.scss";

const SettingsPage = ({ children, mobile, style }) => {
  return (
    <>
      {
        <div style={style} className={mobile ? "NativeSettingsPage" : "SettingsPage"}>
          {children}
        </div>
      }
    </>
  );
};

SettingsPage.defaultProps = {
  open: false
}

SettingsPage.propTypes = {
  mobile: PropTypes.bool,
  style: PropTypes.object
}

export default SettingsPage;

