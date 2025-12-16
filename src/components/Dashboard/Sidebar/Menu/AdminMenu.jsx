import { FaUserCheck, FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsGraphUp } from "react-icons/bs";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={FaUserCheck}
        label="Manage Requests"
        address="manage-requests"
      />
      <MenuItem icon={BsGraphUp} label="Statistics" address="adminStats" />
    </>
  );
};

export default AdminMenu;
