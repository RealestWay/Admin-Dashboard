import { faBell, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications] = useState(5); // Example notification count
  const { logout, user } = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
      {/* Left side: Title */}
      <img
        src="/logo.svg"
        alt="logo"
        width={200}
        height={100}
        className="text-2xlfont-bold text-center text-white"
      />

      {/* Center: Search Bar (optional) */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right side: Profile, Notifications, and Logout */}
      <div className="flex items-center space-x-6">
        {/* Notifications Icon */}
        <div className="relative">
          <button className="text-gray-700 hover:text-blue-500 relative">
            <FontAwesomeIcon icon={faBell} size={24} />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>

        {/* Profile Icon and Dropdown */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-700 hover:text-blue-500"
          >
            <FontAwesomeIcon icon={faUserCircle} size={32} />
            <p>{user?.Fullname}</p>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
              <ul className="text-gray-700">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={() => logout()}
          className="bg-[#100073] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
