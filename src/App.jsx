import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import Users from "./pages/User/Users";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import ScrollToTop from "./components/ScrollToTop";
import AdminLayout from "./pages/AdminLayout";
import { HouseProvider } from "./contexts/HouseContext";
import { AgentsUsersProvider } from "./contexts/AgentsUsersContext";
import User from "./pages/User/User";
import Agents from "./pages/User/Agents";

function App() {
  return (
    <HouseProvider>
      <AgentsUsersProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/user" element={<User />}>
                <Route index element={<Users />} />
                <Route path="/user/agents" element={<Agents />} />
              </Route>
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AgentsUsersProvider>
    </HouseProvider>
  );
}

export default App;
