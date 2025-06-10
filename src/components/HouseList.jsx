/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UseHouses } from "../contexts/HouseContext";
import { useAuth } from "../contexts/AuthContext";

const HouseList = ({
  grid,
  availabilityFilter,
  searchQuery,
  propertyTypeFilter,
}) => {
  const { houses, deleteHouse } = UseHouses();
  const { token } = useAuth();

  const filterHouses = (
    houses,
    availabilityFilter = "all",
    searchQuery = "",
    propertyTypeFilter = "all"
  ) => {
    return houses.data?.filter((house) => {
      // Filter by availability
      // if (availabilityFilter === "available" && !house?.availability)
      //   return false;
      // if (availabilityFilter === "notAvailable" && house?.availability)
      //   return false;
      if (
        availabilityFilter !== "all" &&
        house?.availability !== availabilityFilter
      ) {
        return false;
      }

      // Filter by agent ID (search query)
      if (
        searchQuery &&
        !house?.agentId.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Filter by property type
      if (
        propertyTypeFilter !== "all" &&
        house?.propertyType !== propertyTypeFilter
      ) {
        return false;
      }

      return true;
    });
  };

  const filteredHouses = filterHouses(
    houses,
    availabilityFilter,
    searchQuery,
    propertyTypeFilter
  );

  if (!grid)
    return (
      <div className="overflow-x-auto p-2">
        <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Title</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Created At</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHouses?.map((house) => (
              <tr key={house?.id} className="hover:bg-gray-50 transition">
                <td className="border px-4 py-2">
                  <img
                    src={`https://backend.realestway.com/storage/${house?.images[0]?.src}`}
                    alt={house?.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2 text-blue-900 font-medium">
                  {house?.title}
                </td>
                <td className="border px-4 py-2 text-green-600 font-bold">
                  ₦{house?.totalPrice}
                </td>
                <td className="border px-4 py-2 text-gray-700">
                  {house?.createdAt}
                </td>
                <td className="border px-4 py-2 space-x-2">
                  <Link
                    to={`/house/${house?.uniqueId}`}
                    className="text-sm text-[#100073] hover:underline"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteHouse(house?.uniqueId, token)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {filteredHouses?.map((house) => (
        <div
          key={house?.id}
          className="border rounded-lg shadow-lg overflow-hidden bg-white"
        >
          <img
            src={`https://backend.realestway.com/storage/${house?.images[0].src}`} // Display the first image
            alt={house?.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-blue-900">
              {house?.title}
            </h3>
            <p className="text-sm text-gray-600">{house?.location.address}</p>
            <p className="text-xl font-bold flex justify-between text-green-500 mt-2">
              <span>₦{house?.totalPrice}</span>{" "}
              <span className="text-xs">{house?.availability}</span>
            </p>
            <Link
              to={`/house/${house.uniqueId}`}
              className="text-[#100073] hover:text-blue-800 mt-4 block"
            >
              <span> View Details</span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HouseList;
