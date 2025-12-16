import { FaPlateWheat } from "react-icons/fa6";
import { MdHomeWork, MdOutlineManageHistory, MdSetMeal } from "react-icons/md";
import MenuItem from "./MenuItem";
const SellerMenu = () => {
  return (
    <>
      <MenuItem icon={FaPlateWheat} label="Add Meal" address="add-Meal" />

      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
      />
      <MenuItem icon={MdSetMeal} label="My Meals" address="myMeals" />
    </>
  );
};

export default SellerMenu;
