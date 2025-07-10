import {
  faArrowCircleLeft,
  faArrowCircleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAgentsUsers } from "../../contexts/AgentsUsersContext";
import { useAuth } from "../../contexts/AuthContext";
import { UseHouses } from "../../contexts/HouseContext";

const Agents = () => {
  const { agents, handleDeleteUser, handleAgentStatus } = useAgentsUsers();
  const { token } = useAuth();
  const { houses } = UseHouses();

  const [page, setPage] = useState(0);
  const rowsPerPage = 20;

  const sagents = agents?.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "8px 16px",
        borderRadius: "8px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ fontWeight: "600", marginBottom: "8px" }}>
          All Agents ({sagents.length})
        </h3>
        <div style={{ display: "flex", gap: 1, borderRadius: "50px" }}>
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
            style={{
              background: "#EAEEF4",
              border: "none",
              cursor: "pointer",
              borderRadius: "50px",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faArrowCircleLeft} size={16} />
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={(page + 1) * rowsPerPage >= agents?.length}
            style={{
              background: "#EAEEF4",
              border: "none",
              cursor: "pointer",
              borderRadius: "50px",
              padding: "4px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <FontAwesomeIcon icon={faArrowCircleRight} size={16} />
          </button>
        </div>
      </div>
      <table
        style={{
          width: "100%",
          textAlign: "left",
          borderCollapse: "collapse",
          fontSize: "12px",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#F1F3F9" }}>
            <th style={{ padding: "8px" }}>Agent ID</th>
            <th style={{ padding: "8px" }}>Agent Name</th>
            <th style={{ padding: "8px" }}>Phone Number</th>
            <th style={{ padding: "8px" }}>Posted Houses </th>
            <th style={{ padding: "8px" }}>Status </th>
            <th style={{ padding: "8px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {sagents?.map((user, index) => (
            <Body
              key={user.id}
              id={user.id}
              email={user.email}
              name={user.fullname}
              phone={user.phone}
              houses={houses}
              index={index}
              status={user.status}
              handleDeleteUser={handleDeleteUser}
              token={token}
              handleAgentStatus={handleAgentStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Body = ({
  id,
  phone,
  email,
  name,
  houses,
  index,
  status,
  handleDeleteUser,
  token,
  handleAgentStatus,
}) => {
  const [open, setOpen] = useState(false);
  const agentHouses = houses?.data?.filter((house) => house.user.id === id);

  return (
    <tr
      style={{
        borderBottom: "1px solid #E5E7EB",
        background: index % 2 ? "#F8F9FC" : "",
      }}
    >
      <td style={{ padding: "8px" }}>{id}</td>
      <td
        style={{
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <img
          src="https://mypayledger.io/static/media/live-chat-avatar.65d12a788c4254c6b34e.png"
          alt="User"
          style={{ width: "32px", height: "32px", borderRadius: "50%" }}
        />
        <div>
          {name}
          <div style={{ fontSize: "12px", color: "#6b7280" }}>{email}</div>
        </div>
      </td>
      <td style={{ padding: "8px" }}>{phone}</td>
      <td
        style={{
          padding: "8px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        {agentHouses?.length}
      </td>
      <td
        style={{
          padding: "8px",
          gap: "8px",
        }}
      >
        {status}
      </td>
      <td style={{ padding: "8px", position: "relative" }}>
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 36 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => setOpen(!open)}
          >
            <rect width="36" height="40" fill="white" />
            <path
              d="M16.332 25.8333C16.332 26.75 17.082 27.5 17.9987 27.5C18.9154 27.5 19.6654 26.75 19.6654 25.8333C19.6654 24.9167 18.9154 24.1667 17.9987 24.1667C17.082 24.1667 16.332 24.9167 16.332 25.8333Z"
              fill="#272421"
            />
            <path
              d="M16.332 14.1667C16.332 15.0834 17.082 15.8334 17.9987 15.8334C18.9154 15.8334 19.6654 15.0834 19.6654 14.1667C19.6654 13.25 18.9154 12.5 17.9987 12.5C17.082 12.5 16.332 13.25 16.332 14.1667Z"
              fill="#272421"
            />
            <path
              d="M16.332 20C16.332 20.9166 17.082 21.6666 17.9987 21.6666C18.9154 21.6666 19.6654 20.9166 19.6654 20C19.6654 19.0833 18.9154 18.3333 17.9987 18.3333C17.082 18.3333 16.332 19.0833 16.332 20Z"
              fill="#272421"
            />
          </svg>
        </button>
        {open ? (
          <div
            style={{
              position: "absolute",
              right: "0",
              minWidth: "170px",
              background: "#F7F7F7",
              height: open ? "" : "0px",
              overflow: "hidden",
              transition: "height 0.3s ease-in-out",
              zIndex: 1000,
              fontSize: "13px",
            }}
            onMouseOut={() => setOpen(false)}
            onMouseOver={() => setOpen(true)}
          >
            <button
              style={{
                borderBottom: "1px solid gray",
                padding: "6px 18px",
                width: "100%",
                gap: 2,
              }}
            >
              View Details
            </button>
            <button
              style={{
                borderBottom: "1px solid gray",
                padding: "6px 18px",
                width: "100%",
              }}
              onClick={() =>
                status === "inactive"
                  ? handleAgentStatus(id, token, "active")
                  : handleAgentStatus(id, token, "inactive")
              }
            >
              {status === "inactive" ? "Activate" : "Deactivate"}
            </button>
            <button
              style={{
                borderBottom: "1px solid gray",
                padding: "6px 18px",
                width: "100%",
              }}
              onClick={() => handleAgentStatus(id, token, "suspended")}
            >
              Suspend
            </button>
            <button
              style={{
                borderBottom: "1px solid gray",
                padding: "6px 18px",
                width: "100%",
              }}
              onClick={() => handleDeleteUser(id, token)}
            >
              Delete
            </button>
          </div>
        ) : null}
      </td>
    </tr>
  );
};

export default Agents;
