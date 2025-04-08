import { useState, useEffect } from "react";
import { UseHouses } from "../contexts/HouseContext";

const Dashboard = () => {
  const [overviewData, setOverviewData] = useState({
    totalListings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    recentActivities: [],
  });

  // Simulating data fetching (you can replace this with real API calls)
  useEffect(() => {
    setTimeout(() => {
      setOverviewData({
        totalListings: 120, // Example data
        totalUsers: 500,
        totalRevenue: 150000,
        recentActivities: [
          "User John Doe listed a new property: 123 Main St.",
          "User Jane Smith updated property: 456 Oak Ave.",
          "Admin approved new property listing for 789 Pine Rd.",
          "User Mark Lee deleted a property listing for 123 Elm St.",
        ],
      });
    }, 1500);
  }, []);
  const { houses } = UseHouses();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Dashboard Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        {/* Total Listings Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-gray-700">Total Listings</h3>
          <p className="text-3xl font-semibold text-indigo-600">
            {houses.data?.length}
          </p>
        </div>

        {/* Total Users Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-gray-700">Total Users</h3>
          <p className="text-3xl font-semibold text-indigo-600">
            {overviewData.totalUsers}
          </p>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-medium text-gray-700">Total Revenue</h3>
          <p className="text-3xl font-semibold text-green-600">
            ${overviewData.totalRevenue}
          </p>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-medium text-gray-700 mb-4">
          Recent Activities
        </h3>
        <ul className="space-y-4">
          {overviewData.recentActivities.map((activity, index) => (
            <li key={index} className="text-gray-600">
              • {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
