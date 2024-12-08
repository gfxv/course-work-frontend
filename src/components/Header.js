import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faGear,
  faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const dropdownRef = useRef(null);
  const { authState, logout } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  return (
    <header className="flex justify-between items-center p-3 bg-black text-white">
      <div className="relative">
        <h1 className="text-xl font-bold">Online Poker</h1>
      </div>
      <div className="relative" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="focus:outline-none">
        <div className="flex items-center cursor-pointer">
          <img
            src="https://via.placeholder.com/50"
            alt="Profile"
            className="rounded-full w-10 h-10 mr-2"
          />
          <div>
            <p className="font-bold">{authState.name || 'User Name'}</p>
            <p>Balance: ${authState.balance || '0.00'}</p>
          </div>
        </div>
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-md shadow-lg">
            <Link
              to="/account"
              className="flex items-center px-4 py-2 rounded-md hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Account
            </Link>

            <Link
              to="/settings"
              className="flex items-center px-4 py-2 rounded-md hover:bg-gray-200"
            >
              <FontAwesomeIcon icon={faGear} className="mr-2" />
              Settings
            </Link>

            <div
              onClick={logout}
              className="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 hover:cursor-pointer"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
              Logout
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
