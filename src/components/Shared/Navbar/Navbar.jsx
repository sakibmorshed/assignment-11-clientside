import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useTheme from "../../../hooks/useTheme";
import logo from "../../../../public/logo-main.webp";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest(".profile-menu-container")) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500  ${
        isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-black/50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl font-bold">L</span>
            </div>
            <h1 className="text-3xl font-bold text-white">LocalChef</h1>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between w-full ml-10">
          <div className="flex items-center text-xl md:gap-10 ml-75">
            <Link to="/" className="text-white hover:text-red-400 transition">
              Home
            </Link>
            <Link
              to="/meals"
              className="text-white hover:text-red-400 transition flex items-center"
            >
              Meals
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-red-400 transition flex items-center"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-red-400 transition flex items-center"
            >
              Contact
            </Link>
            {user && (
              <>
                <Link
                  to="/dashboard"
                  className="text-white hover:text-red-400 transition flex items-center"
                >
                  Dashboard
                </Link>
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-white hover:bg-white/20 rounded-full transition"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {user ? (
              <>
                <div className="relative profile-menu-container">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center space-x-2 p-2 hover:bg-white/20 rounded-full transition"
                  >
                    <img
                      className="rounded-full"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : logo}
                      alt="profile"
                      height="32"
                      width="32"
                    />
                    <ChevronDown size={16} className="text-white" />
                  </button>

                  {/* Dropdown Menu */}
                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 border border-gray-200 dark:border-gray-700">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          logOut();
                          setProfileMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:block px-6 py-3 border border-white text-white rounded-full hover:bg-white hover:text-black transition font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-8 py-3 bg-red-600 text-white rounded-full hover:bg-red-800 transition font-semibold shadow-lg cursor-pointer"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-6 py-8 space-y-6 text-center">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white text-xl"
            >
              Home
            </Link>
            <Link
              to="/meals"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white text-xl"
            >
              Meals
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white text-xl"
            >
              About
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white text-xl"
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white text-xl"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    logOut();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-white text-xl"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white text-xl"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-white text-xl"
                >
                  Signup
                </Link>
              </>
            )}

            <Link to="/meals" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full py-3 border border-white text-white rounded-full">
                Book a Meal
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
