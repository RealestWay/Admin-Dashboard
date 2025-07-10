import { faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AgentRegistration from "./AgentRegistration";
import { useAgentsUsers } from "../../contexts/AgentsUsersContext";

const User = () => {
  const [userCat, toggleUserCat] = useState("users");
  const [addAgent, setAddAgent] = useState(false);
  const {
    udeleted,
    adeleted,
    setuDeleted,
    setaDeleted,
    fetchAgents,
    fetchUsers,
    status,
  } = useAgentsUsers();
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="flex gap-2 flex-wrap p-1 md:gap-6 md:p-4 text-white">
          <Link
            to={""}
            className={`bg-slate-700 py-3 px-5 rounded-lg ${
              userCat === "users"
                ? "bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-white shadow-lg scale-105"
                : "text-gray-200 hover:text-white hover:bg-blue-800 hover:scale-105"
            }`}
            onClick={() => {
              toggleUserCat("users");
              fetchUsers();
              setAddAgent(false);
            }}
          >
            Users
          </Link>
          <Link
            to={"agents"}
            className={`bg-slate-700 py-3 px-5 rounded-lg ${
              userCat === "agents"
                ? "bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-white shadow-lg scale-105"
                : "text-gray-200 hover:text-white hover:bg-blue-800 hover:scale-105"
            }`}
            onClick={() => {
              toggleUserCat("agents");
              fetchAgents();
              setAddAgent(false);
            }}
          >
            Agents
          </Link>
          <Link
            to={"onboarding-agents"}
            className={`bg-slate-700 py-3 px-5 rounded-lg ${
              userCat === "awaitingagents"
                ? "bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-white shadow-lg scale-105"
                : "text-gray-200 hover:text-white hover:bg-blue-800 hover:scale-105"
            }`}
            onClick={() => {
              toggleUserCat("awaitingagents");
              setAddAgent(false);
            }}
          >
            Agents Onboarding
          </Link>
        </div>
        <button
          className="bg-green-500 m-3 py-2 px-4 rounded-lg text-white"
          onClick={() => setAddAgent(true)}
        >
          <FontAwesomeIcon icon={faUserPlus} color="white" /> Add Agent
        </button>
      </div>
      <div className="w-full overflow-auto">
        {addAgent ? <AgentRegistration /> : <Outlet />}
      </div>
      {udeleted && (
        <Deleted
          udeleted={udeleted}
          setuDeleted={setuDeleted}
          fetchUsers={fetchUsers}
          status={status}
        />
      )}
      {adeleted && (
        <Deleted
          setaDeleted={setaDeleted}
          adeleted={adeleted}
          fetchAgents={fetchAgents}
          status={status}
        />
      )}
    </div>
  );
};

const Deleted = ({
  udeleted,
  adeleted,
  setuDeleted,
  setaDeleted,
  fetchAgents,
  fetchUsers,
  status,
}) => {
  // const handleClose = () => {};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[300px] relative animate-fade-in">
        <button
          className="absolute top-2 right-2 text-red-600 hover:text-red-800"
          aria-label="Close"
        >
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => {
              setuDeleted(false);
              setaDeleted(false);
              fetchAgents();
              fetchUsers();
            }}
          />
        </button>
        <p className="text-center text-red-600 font-semibold mt-4">
          <i>
            {udeleted && "User Successfully Deleted"}
            {adeleted && "Agent Successfully Deleted"}
          </i>
          <p className="text-[#100073]">{status}</p>
        </p>
      </div>
    </div>
  );
};
export default User;
