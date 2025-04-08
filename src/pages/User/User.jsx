import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import AgentRegistration from "./AgentRegistration";

const User = () => {
  const [onAgents, toggleOnAgents] = useState(false);
  const [addAgent, setAddAgent] = useState(false);
  return (
    <div>
      <div className="flex justify-between w-full">
        <div className="flex gap-6 p-4 text-white">
          <Link
            to={""}
            className={`bg-slate-700 py-3 px-5 rounded-lg ${
              !onAgents
                ? "bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-white shadow-lg scale-105"
                : "text-gray-200 hover:text-white hover:bg-blue-800 hover:scale-105"
            }`}
            onClick={() => {
              toggleOnAgents(false);
              setAddAgent(false);
            }}
          >
            Users
          </Link>
          <Link
            to={"agents"}
            className={`bg-slate-700 py-3 px-5 rounded-lg ${
              onAgents
                ? "bg-gradient-to-r from-green-400 via-blue-500 to-green-400 text-white shadow-lg scale-105"
                : "text-gray-200 hover:text-white hover:bg-blue-800 hover:scale-105"
            }`}
            onClick={() => {
              toggleOnAgents(true);
              setAddAgent(false);
            }}
          >
            Agents
          </Link>
        </div>
        <button
          className="bg-green-500 m-3 py-2 px-4 rounded-lg text-white"
          onClick={() => setAddAgent(true)}
        >
          <FontAwesomeIcon icon={faUserPlus} color="white" /> Add Agent
        </button>
      </div>
      {addAgent ? <AgentRegistration /> : <Outlet />}
    </div>
  );
};

export default User;
