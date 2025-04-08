const Transactions = () => {
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
          </tr>
        </thead>
        <tbody>
          {/* Example transaction rows */}
          <tr>
            <td className="py-2 px-4 border-b">T1001</td>
            <td className="py-2 px-4 border-b">2025-04-01</td>
            <td className="py-2 px-4 border-b">$1,200</td>
            <td className="py-2 px-4 border-b">Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
