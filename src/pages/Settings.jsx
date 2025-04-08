const Settings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Admin Settings</h3>
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
    </div>
  );
};

export default Settings;
