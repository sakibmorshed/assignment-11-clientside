import { BsFingerprint } from "react-icons/bs";

import MenuItem from "./MenuItem";

import { MdFavoriteBorder } from "react-icons/md";
import { VscCodeReview } from "react-icons/vsc";

const CustomerMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
      <MenuItem icon={VscCodeReview} label="My reviews" address="my-reviews" />
      <MenuItem icon={MdFavoriteBorder} label="favorites" address="favorites" />
    </>
  );
};

export default CustomerMenu;
