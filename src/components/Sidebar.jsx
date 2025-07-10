import { CloseCircle, CloseSquare, HamburgerMenu } from "iconsax-reactjs";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="w-[21%] bg-[#100073] text-white min-h-screen hidden md:inline p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-12 text-center text-white">
          Admin Dashboard
        </h2>
        <hr />
        <nav className="flex flex-col gap-6 pt-7">
          <SidebarLink to="/" label="Dashboard" isActive={isActive("/")} />
          <SidebarLink
            to="/properties"
            label="Properties"
            isActive={isActive("/properties")}
          />
          <SidebarLink
            to="/user"
            label="Users/Agents"
            isActive={isActive("/user")}
          />
          <SidebarLink
            to="/transactions"
            label="Transactions"
            isActive={isActive("/transactions")}
          />
          <SidebarLink
            to="/reports"
            label="Reports/Disputes"
            isActive={isActive("/reports")}
          />
          <SidebarLink
            to="/settings"
            label="Settings"
            isActive={isActive("/settings")}
          />
        </nav>
      </div>
      <div className="bg-[#100073] p-4 text-white md:hidden flex justify-between items-center">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <CloseCircle size={24} /> : <HamburgerMenu size={24} />}
        </button>
      </div>

      {/* Sidebar for mobile and desktop */}
      <div
        className={`fixed top-0 left-0 w-[70%] h-full bg-[#100073] md:hidden text-white p-6 shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:relative md:w-[21%] ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-2xl font-bold mb-12 text-center text-white hidden md:block">
          Admin Dashboard
        </h2>

        {/* Close button in mobile */}
        <div className="md:hidden text-right mb-4">
          <button onClick={() => setIsOpen(false)}>
            <CloseSquare size={20} />
          </button>
        </div>

        <hr />
        <nav className="flex flex-col gap-6 pt-7">
          <SidebarLink to="/" label="Dashboard" isActive={isActive("/")} />
          <SidebarLink
            to="/properties"
            label="Properties"
            isActive={isActive("/properties")}
          />
          <SidebarLink
            to="/user"
            label="Users/Agents"
            isActive={isActive("/user")}
          />
          <SidebarLink
            to="/transactions"
            label="Transactions"
            isActive={isActive("/transactions")}
          />
          <SidebarLink
            to="/reports"
            label="Reports/Disputes"
            isActive={isActive("/reports")}
          />
          <SidebarLink
            to="/settings"
            label="Settings"
            isActive={isActive("/settings")}
          />
        </nav>
      </div>
    </>
  );
};

const SidebarLink = ({ to, label, isActive }) => {
  return (
    <Link
      to={to}
      className={`block py-2 px-4 rounded-lg transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-white shadow-lg scale-105"
          : "text-gray-200 hover:text-white hover:bg-[#100073] hover:scale-105"
      }`}
    >
      {label}
    </Link>
  );
};

export default Sidebar;
