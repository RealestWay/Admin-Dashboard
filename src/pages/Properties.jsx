import { useState } from "react";

import HouseList from "../components/HouseList";

const Properties = () => {
  const [grid, toggleGrid] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyTypeFilter, setPropertyTypeFilter] = useState("all");

  const handleAvailabilityChange = (event) => {
    setAvailabilityFilter(event.target.value);
  };
  const handlePropertyTypeChange = (event) => {
    setPropertyTypeFilter(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">All Listings</h2>

      {/* Filter and Search Section */}
      <div className="flex justify-between items-center mb-6">
        {/* Grid/List View Toggle */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => toggleGrid(false)}
            className={`${
              !grid ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-lg`}
          >
            List View
          </button>
          <button
            onClick={() => toggleGrid(true)}
            className={`${
              grid ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"
            } py-2 px-4 rounded-lg`}
          >
            Grid View
          </button>
        </div>

        {/* Availability Filter */}
        <select
          value={availabilityFilter}
          onChange={handleAvailabilityChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Properties</option>
          <option value="available">Available</option>
          <option value="notAvailable">Not Available</option>
        </select>

        {/* PropertyType Filter */}
        <select
          value={propertyTypeFilter}
          onChange={handlePropertyTypeChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="all">All Properties</option>
          <option value="Self Contain">Self Contain</option>
          <option value="1 Bedroom Apartment">1 Bedroom apartment</option>
          <option value="2 Bedroom Apartment">2 Bedroom apartment</option>
          <option value="3 Bedroom Apartment">3 Bedroom apartment</option>
          <option value="Duplex">Duplex</option>
          <option value="Office">Office</option>
          <option value="Bungalow">Bungalow</option>
        </select>

        {/* Search by Agent ID */}
        <input
          type="text"
          placeholder="Search by Agent ID"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Display Houses */}
      <HouseList
        grid={grid}
        availabilityFilter={availabilityFilter}
        propertyTypeFilter={propertyTypeFilter}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default Properties;
