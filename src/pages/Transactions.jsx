import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Spinner from "../components/Spinner";

const Transactions = () => {
  const { token } = useAuth();
  const [transactions, setTransactions] = useState(null);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchTransactions = async () => {
    try {
      const res = await fetch(
        "https://backend.realestway.com/api/payments/logs",
        {
          method: "GET",
          headers: { authorization: `bearer ${token}` },
        }
      );
      const data = await res.json();
      setTransactions(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id) => {
    try {
      setUpdating(true);
      await fetch(`https://backend.realestway.com/api/payments/logs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "completed" }),
      });
      await fetchTransactions();
      setUpdating(false);
    } catch (error) {
      console.error("Error updating status:", error);
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  if (!transactions) return <Spinner />;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Transaction ID</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Reference</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((txn) => (
            <tr key={txn.id}>
              <td className="py-2 px-4 border-b">{txn?.id}</td>
              <td className="py-2 px-4 border-b">
                {new Date(txn?.updatedAt).toLocaleTimeString([], {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
              <td className="py-2 px-4 border-b">
                {txn?.amount?.toLocaleString()}
              </td>
              <td className="py-2 px-4 border-b">{txn?.status}</td>
              <td className="py-2 px-4 border-b">{txn?.reference}</td>
              <td className="py-2 px-4 border-b space-x-2">
                <button
                  className="text-blue-600 underline text-sm"
                  onClick={() => setSelectedTxn(txn)}
                >
                  View Details
                </button>
                <button
                  className="bg-green-600 text-white text-xs px-2 py-1 rounded hover:bg-green-700"
                  onClick={() => updateStatus(txn.id)}
                  disabled={updating}
                >
                  {updating ? "Updating..." : "Mark Completed"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedTxn && (
        <TxnDetails txn={selectedTxn} onClose={() => setSelectedTxn(null)} />
      )}
    </div>
  );
};

const TxnDetails = ({ txn, onClose }) => {
  return (
    <div className="mt-6 bg-white border border-gray-300 shadow-md rounded p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Transaction Details</h3>
        <button
          className="text-red-500 hover:underline text-sm"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <strong>User:</strong> {txn?.user?.FullName} ({txn?.user?.email})
        </p>
        <p>
          <strong>Agent:</strong> {txn?.agent?.name} ({txn?.agent?.email})
        </p>
        <p>
          <strong>House:</strong> {txn?.house?.title}
        </p>
        <p>
          <strong>Reference:</strong> {txn?.reference}
        </p>
        <p>
          <strong>Status:</strong> {txn?.status}
        </p>
        <p>
          <strong>Amount:</strong> ₦{txn?.amount?.toLocaleString()}
        </p>
        <p>
          <strong>Date:</strong> {new Date(txn?.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default Transactions;
