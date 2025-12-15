import { FaUserCheck, FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={FaUserCheck}
        label="Manage Requests"
        address="manage-requests"
      />
    </>
  );
};

export default AdminMenu;
