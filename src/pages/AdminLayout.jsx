import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
