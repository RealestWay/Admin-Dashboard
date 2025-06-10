import { createContext, useContext, useEffect, useState } from "react";

const AgentsUsersContext = createContext();

const AgentsUsersProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);
  const [awaitingAgents, setAwaitingAgents] = useState([]);
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");
  const [udeleted, setuDeleted] = useState(false);
  const [adeleted, setaDeleted] = useState(false);

  //  Fetch Agents
  const fetchAgents = async () => {
    try {
      const res = await fetch("https://backend.realestway.com/api/agents");
      const data = await res.json();
      setAgents(data);
    } catch {
      alert("Error fetch all agents");
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch("https://backend.realestway.com/api/users");
      const data = await res.json();
      setUsers(data.data);
    } catch {
      alert("Error fetch all agents");
    }
  };

  // Delete Agents
  const handleDelete = async (id, token) => {
    const url = `https://backend.realestway.com/api/agents/${id}`;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        setStatus(`User ${id} deleted successfully.`);
        fetchAgents();
      } else {
        setStatus(`Failed to delete user ${id}. Status: ${response.status}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setaDeleted(true);
    }
  };

  // Fetch Awaiting Agents registered for onboarding
  const fetchAwaitingAgents = async () => {
    try {
      const res = await fetch(
        "https://backend.realestway.com/api/agents/onboarding-requests"
      );
      const data = await res.json();
      setAwaitingAgents(data.onboarding_requests);
    } catch {
      alert("Error fetch all agents");
    }
  };

  // Delete Users
  const handleDeleteUser = async (id, token) => {
    const url = `https://backend.realestway.com/api/users/${id}`;
    const headers = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
      });

      if (response.ok) {
        setStatus(`User ${id} deleted successfully.`);
        fetchUsers();
      } else {
        setStatus(`Failed to delete user ${id}. Status: ${response.status}`);
      }
    } catch (error) {
      setStatus(`Error: ${error.message}`);
    } finally {
      setuDeleted(true);
    }
  };
  useEffect(() => {
    fetchAgents();
    fetchUsers();
    fetchAwaitingAgents();
  }, []);
  return (
    <AgentsUsersContext.Provider
      value={{
        agents,
        fetchAgents,
        fetchUsers,
        handleDelete,
        awaitingAgents,
        fetchAwaitingAgents,
        users,
        handleDeleteUser,
        status,
        udeleted,
        adeleted,
        setuDeleted,
        setaDeleted,
      }}
    >
      {children}
    </AgentsUsersContext.Provider>
  );
};

function useAgentsUsers() {
  const agentsusers = useContext(AgentsUsersContext);
  if (agentsusers === undefined)
    throw new Error("AgentsUsersContext was used outside AgenstUsersProvider");
  return agentsusers;
}

export { AgentsUsersProvider, useAgentsUsers };
