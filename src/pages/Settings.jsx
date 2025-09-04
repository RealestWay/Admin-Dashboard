// Settings.jsx
import { useState } from "react";
import BlogManagement from "../components/BlogManagement";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="md:p-6 p-3 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "general"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("general")}
        >
          General
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "blogs"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("blogs")}
        >
          Blog Management
        </button>
      </div>

      {activeTab === "general" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Admin Settings</h3>
          <form>
            <label className="block mb-4">
              <span className="text-gray-700">Platform Name</span>
              <input
                type="text"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="Enter platform name"
              />
            </label>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Save Settings
            </button>
          </form>
        </div>
      )}

      {activeTab === "blogs" && <BlogManagement />}
    </div>
  );
};

export default Settings;
