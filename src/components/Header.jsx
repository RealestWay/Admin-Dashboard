import { faBell, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications] = useState(5);
  const { logout, user } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white rounded-[20px] shadow-md px-4 py-3 mb-3 flex flex-wrap justify-between items-center w-full">
      {/* Logo */}
      <div className="w-full sm:w-auto flex justify-between items-center mb-3 sm:mb-0">
        <img src="/logo.svg" alt="logo" className="h-10 w-auto" />
        <button
          onClick={toggleDropdown}
          className="sm:hidden text-gray-700 hover:text-blue-500 focus:outline-none"
        >
          <FontAwesomeIcon icon={faUserCircle} size="lg" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-full sm:w-auto flex-1 sm:flex-none mb-3 sm:mb-0 sm:mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#100073]"
        />
      </div>

      {/* Actions */}
      <div className="w-full sm:w-auto flex items-center justify-end gap-4">
        {/* Notifications */}
        <div className="relative">
          <button className="text-gray-700 hover:text-blue-500 relative">
            <FontAwesomeIcon icon={faBell} size="lg" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative hidden sm:block">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-500 focus:outline-none"
          >
            <FontAwesomeIcon icon={faUserCircle} size="lg" />
            <span className="text-sm font-medium">
              {user?.Fullname || "User"}
            </span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li
                  onClick={() => logout()}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Logout Button (Mobile Only) */}
        <button
          onClick={() => logout()}
          className="block sm:hidden bg-[#100073] text-white px-3 py-2 rounded-lg text-sm"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
