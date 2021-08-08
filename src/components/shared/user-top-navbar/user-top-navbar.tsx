import React, { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "react-feather";
import logo from "../../../assets/images/logo.png";

const UserTopNavbar = () => {
  const history = useHistory();
  const location = useLocation();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef<any>(null);

  useEffect(() => {
    document.addEventListener("click", outsideClickHandler, true);

    return () => {
      document.removeEventListener("click", outsideClickHandler, true);
    };
  }, []);

  const outsideClickHandler = (event: MouseEvent) => {
    if (event && event.target) {
      if (
        userDropdownRef &&
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    }
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="block h-8 w-auto rounded-md"
                src={logo}
                alt="Kringle UK"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <motion.a
                  href="#dashboard"
                  className={`text-gray-300 ${
                    location.pathname !== "/user/dashboard"
                      ? "hover:bg-gray-700 hover:text-white"
                      : "bg-gray-900"
                  } rounded-md px-3 py-2 text-sm font-medium`}
                  onClick={(e) => {
                    e.preventDefault();

                    history.push("/user/dashboard");
                  }}
                >
                  Dashboard
                </motion.a>
                <motion.a
                  href="#store"
                  className={`text-gray-300 ${
                    location.pathname !== "/user/store"
                      ? "hover:bg-gray-700 hover:text-white"
                      : "bg-gray-900"
                  } rounded-md px-3 py-2 text-sm font-medium`}
                  onClick={(e) => {
                    e.preventDefault();

                    history.push("/user/store");
                  }}
                >
                  Store
                </motion.a>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative" ref={userDropdownRef}>
              <div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  type="button"
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  onClick={() => setShowUserDropdown((v) => !v)}
                >
                  <span className="sr-only">Open user menu</span>
                  <User color="#fff" />
                </motion.button>
              </div>
              {showUserDropdown === true ? (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <>
                    <a
                      href="#account"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={(e) => {
                        e.preventDefault();

                        history.push("/user/account");
                      }}
                    >
                      Account
                    </a>
                    <a
                      href="#signout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      onClick={(e) => {
                        e.preventDefault();

                        localStorage.removeItem("userDetails");
                        localStorage.removeItem("accessToken");

                        history.push("/user/auth/login");
                      }}
                    >
                      Sign out
                    </a>
                  </>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#dashboard"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={(e) => {
              e.preventDefault();

              history.push("/user/dashboard");
            }}
          >
            Dashboard
          </a>
          <a
            href="#store"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            onClick={(e) => {
              e.preventDefault();

              history.push("/user/store");
            }}
          >
            Store
          </a>
        </div>
      </div>
    </nav>
  );
};

export default UserTopNavbar;
