import { faBell, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications] = useState(5); // Example notification count

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center w-full">
      {/* Left side: Title */}
      <h1 className="text-2xl font-semibold text-blue-900">Admin Dashboard</h1>

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
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
