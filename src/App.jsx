import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
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
import { AuthProvider } from "./contexts/AuthContext";
import Properties from "./pages/Properties/Properties";
import ViewProperty from "./pages/Properties/ViewProperty";
import { ChatProvider } from "./contexts/ChatsContext";
import { BlogProvider } from "./contexts/BlogContext";
import OnboardingAgents from "./pages/User/OnboardAgents";

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <HouseProvider>
          <AgentsUsersProvider>
            <BlogProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/user" element={<User />}>
                      <Route index element={<Users />} />
                      <Route path="/user/agents" element={<Agents />} />
                      <Route
                        path="/user/onboarding-agents"
                        element={<OnboardingAgents />}
                      />
                    </Route>
                    <Route path="/house/:id" element={<ViewProperty />} />
                    <Route path="/transactions" element={<Transactions />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="/settings" element={<Settings />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </BlogProvider>
          </AgentsUsersProvider>
        </HouseProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
