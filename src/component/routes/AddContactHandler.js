import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { addContact } from "../../logic/contacts";

const AddContactHandler = ({ children }) => {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      addContact(userId)
        .then(() => navigate("/settings/contacts"))
        .catch(() => navigate("/settings/contacts"));
    }
  }, [navigate, userId]);

  return (
    <>
      {children}
    </>
  );
}


export default AddContactHandler;