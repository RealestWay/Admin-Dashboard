import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import SignInOverlay from "../components/SignInOverLay";
import { useAuth } from "../contexts/AuthContext";

const AdminLayout = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {!isAuthenticated ? (
        <SignInOverlay />
      ) : (
        <>
          <div className="flex">
            <Sidebar />

            <div className="flex-1 p-6 bg-gray-100 min-h-screen">
              <Header />
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminLayout;
