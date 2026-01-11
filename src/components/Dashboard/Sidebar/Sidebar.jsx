import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "/logo-main.webp";
// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp, BsHouse } from "react-icons/bs";
import { X, ChevronRight } from "lucide-react";

// User Menu
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";

const Sidebar = () => {
  const { logOut, user } = useAuth();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="bg-white dark:bg-gray-800 shadow-md flex justify-between items-center md:hidden px-4 py-3 sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-gray-800/90">
        <div>
          <Link to="/" className="block">
            <img src={logo} alt="logo" className="h-10 w-auto object-contain" />
          </Link>
        </div>

        <button
          onClick={handleToggle}
          className="p-2 rounded-xl bg-gradient-to-br from-red-500 to-pink-600 text-white hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <AiOutlineBars className="h-6 w-6" />
        </button>
      </div>

      {/* Overlay for mobile */}
      {!isActive && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={handleToggle}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 
          bg-gradient-to-b from-white via-red-50/30 to-pink-50/30 
          dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
          shadow-2xl
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isActive ? "-translate-x-full" : "translate-x-0"}
          md:translate-x-0
        `}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={handleToggle}
          className="absolute top-4 right-4 md:hidden p-2 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Section */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="block group">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 flex items-center justify-center transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
              <img
                src={logo}
                alt="logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* User Info Card */}
          {user && (
            <div className="mt-4 bg-linear-to-r from-orange-500 to-orange-600 hover:to-orange-700 text-white shadow-lg rounded-lg p-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-xl font-bold">
                      {user.displayName?.charAt(0) || "U"}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-white/80 capitalize">
                    {user.role || "user"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {/* Home */}
          <MenuItem icon={BsHouse} label="Home" address="/" />

          {/* Role-Based Menu */}
          {user?.role === "user" && <CustomerMenu />}
          {user?.role === "chef" && <SellerMenu />}
          {user?.role === "admin" && <AdminMenu />}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {/* Profile Link */}
          <Link
            to="/dashboard/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-600 hover:text-white transition-all duration-300 group"
          >
            <FcSettings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
            <span className="flex-1 font-medium">Profile Settings</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          {/* Logout Button */}
          <button
            onClick={logOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-600 hover:text-white transition-all duration-300 group"
          >
            <GrLogout className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="flex-1 font-medium text-left">Logout</span>
          </button>
        </div>

        {/* Decorative Bottom Gradient */}
        <div className="h-1 bg-gradient-to-r from-red-500 via-pink-500 to-red-500"></div>
      </aside>
    </>
  );
};

export default Sidebar;
