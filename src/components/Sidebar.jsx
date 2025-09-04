import {
  Building,
  CloseCircle,
  CloseSquare,
  Element4,
  HamburgerMenu,
  Home,
  MoneyChange,
  Note1,
  People,
  Setting2,
} from "iconsax-reactjs";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="w-[21%] bg-gradient-to-r from-[#100073] to-[#00a256] text-white min-h-screen hidden md:inline py-6 pl-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-12 text-center text-white">
          Admin Dashboard
        </h2>
        <hr />
        <nav className="flex flex-col gap-6 pt-7 ">
          <SidebarLink to="/" label="Dashboard" isActive={isActive("/")}>
            {" "}
            <Element4 />
          </SidebarLink>
          <SidebarLink
            to="/properties"
            label="Properties"
            isActive={isActive("/properties")}
          >
            <Building />
          </SidebarLink>
          <SidebarLink
            to="/user"
            label="Users/Agents"
            isActive={isActive("/user")}
          >
            <People />
          </SidebarLink>
          <SidebarLink
            to="/transactions"
            label="Transactions"
            isActive={isActive("/transactions")}
          >
            <MoneyChange />
          </SidebarLink>
          <SidebarLink
            to="/reports"
            label="Reports/Disputes"
            isActive={isActive("/reports")}
          >
            <Note1 />
          </SidebarLink>
          <SidebarLink
            to="/settings"
            label="Settings"
            isActive={isActive("/settings")}
          >
            {" "}
            <Setting2 />
          </SidebarLink>
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
          <SidebarLink to="/" label="Dashboard" isActive={isActive("/")}>
            <Home />
          </SidebarLink>
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

import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, label, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `py-2 px-4 transition-all duration-300 flex items-center gap-2 ${
          isActive
            ? "bg-white py-6 text-[#100073] font-bold shadow-md border-l-4 border-[#100073]"
            : "text-gray-300 hover:text-white hover:bg-[#100073]/80 hover:scale-105"
        }`
      }
      style={({ isActive }) =>
        isActive
          ? {
              borderTopLeftRadius: "40px",
              borderBottomLeftRadius: "40px",
            }
          : {}
      }
    >
      {children}
      <span>{label}</span>
    </NavLink>
  );
};

export default Sidebar;
