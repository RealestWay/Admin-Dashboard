import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const UserRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const fetchRequests = () => {
    fetch("https://backend.realestway.com/api/user-requests", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch requests:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      const res = await fetch(
        `https://backend.realestway.com/api/user-requests/${id}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        toast.success("Request deleted successfully");
        fetchRequests();
      } else {
        toast.error("Failed to delete request");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    }
  };

  const handleStatusChange = async (id, status) => {
    if (!confirm(`Mark request as ${status}?`)) return;
    try {
      const res = await fetch(
        `https://backend.realestway.com/api/user-requests/${id}/status`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      if (res.ok) {
        toast.success("Status updated");
        fetchRequests();
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-[#100073]">User Requests</h2>
      {requests.length === 0 ? (
        <p>No user requests found.</p>
      ) : (
        <div className="space-y-4 overflow-y-auto max-h-[80vh] pr-2">
          {requests.map((req) => (
            <div
              key={req.id}
              className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white relative"
            >
              <p>
                <strong>Full Name:</strong> {req.fullName}
              </p>
              <p>
                <strong>Phone:</strong> {req.phone}
              </p>
              <p>
                <strong>Email:</strong> {req.email}
              </p>
              <p>
                <strong>Type:</strong> {req.propertyType}
              </p>
              <p>
                <strong>Location:</strong> {req.location}
              </p>
              <p>
                <strong>Details:</strong> {req.additionalDetails}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="capitalize text-blue-600">{req.status}</span>
              </p>
              <p className="text-sm text-gray-500">
                Created at: {new Date(req.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["pending", "in_progress", "completed", "cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(req.id, status)}
                      className="px-3 py-1 text-sm rounded bg-blue-100 hover:bg-blue-200"
                    >
                      Mark as {status}
                    </button>
                  )
                )}
                <button
                  onClick={() => handleDelete(req.id)}
                  className="ml-auto px-3 py-1 text-sm rounded bg-red-100 hover:bg-red-200 text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRequests;
