import { createContext, useContext, useEffect, useState } from "react";

const AgentsUsersContext = createContext();

const AgentsUsersProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);

  const fetchAgents = async () => {
    try {
      const res = await fetch(
        "https://realestway-backend.up.railway.app/api/agents"
      );
      const data = await res.json();
      setAgents(data);
    } catch {
      alert("Error fetch all agents");
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);
  return (
    <AgentsUsersContext.Provider value={{ agents }}>
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
