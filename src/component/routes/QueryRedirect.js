import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const QueryRedirect = ({ children, to }) => {
  const { search } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to + search);
  }, [navigate, to, search])

  return (
    <>
      {children}
    </>
  );
};

QueryRedirect.propTypes = {
  to: PropTypes.string
}

export default QueryRedirect;