import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-[21%] bg-[#100073] text-white min-h-screen p-6 shadow-lg">
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
