/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UseHouses } from "../contexts/HouseContext";

// Sample data
// const houses = [
//   {
//     id: "h1742375816900",
//     title: "Conducive Selfcon for singles",
//     address: "Obia/Akpor, Rumuodomaya, Nigeria",
//     price: 550000,
//     agent_id: "A002",
//     available: true,
//     propertyType: "Self Contain",
//     images: ["/img1f1.jpg", "/img1f2.jpg"],
//   },
//   {
//     id: "h1742375816901",
//     title: "Luxury 3 Bedroom Apartment",
//     address: "Victoria Island, Lagos, Nigeria",
//     price: 1200000,
//     agent_id: "A001",
//     available: false,
//     propertyType: "Apartment",
//     images: ["/img2f1.jpg", "/img2f2.jpg"],
//   },
//   {
//     id: "h1742375816902",
//     title: "Cozy 2 Bedroom Flat",
//     address: "Ikoyi, Lagos, Nigeria",
//     price: 800000,
//     agent_id: "A003",
//     available: true,
//     propertyType: "Apartment",
//     images: ["/img3f1.jpg", "/img3f2.jpg"],
//   },
//   // More houses...
// ];
const HouseList = ({
  grid,
  availabilityFilter,
  searchQuery,
  propertyTypeFilter,
}) => {
  const { houses } = UseHouses();

  const filterHouses = (
    houses,
    availabilityFilter = "all",
    searchQuery = "",
    propertyTypeFilter = "all"
  ) => {
    return houses.data?.filter((house) => {
      // Filter by availability
      if (availabilityFilter === "available" && !house?.available) return false;
      if (availabilityFilter === "notAvailable" && house?.available)
        return false;

      // Filter by agent ID (search query)
      if (
        searchQuery &&
        !house?.agent_id.toLowerCase().includes(searchQuery.toLowerCase())
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
      <div className="flex flex-col p-2 gap-2">
        {filteredHouses?.map((house) => (
          <div
            key={house?.id}
            className="border flex justify-between items-center p-4 rounded-lg shadow-lg overflow-hidden bg-white"
          >
            <img
              src={house?.images[0]} // Display the first image
              alt={house?.title}
              className="w-6 h-6 object-cover"
            />

            <h3 className="text-lg font-semibold text-blue-900">
              {house?.title}
            </h3>

            <p className="text-xl font-bold text-green-500 mt-2">
              ₦{house?.price}
            </p>
            <p className="text-xl font-bold text-green-500 mt-2">
              ₦{house?.date}
            </p>
            <Link
              to={`/house/${house?.id}`}
              className="text-blue-600 hover:text-blue-800 mt-4 block"
            >
              View Details
            </Link>
          </div>
        ))}
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
            src={house?.images[0]} // Display the first image
            alt={house?.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-blue-900">
              {house?.title}
            </h3>
            <p className="text-sm text-gray-600">{house?.address}</p>
            <p className="text-xl font-bold text-green-500 mt-2">
              ₦{house?.price}
            </p>
            <Link
              to={`/house/${house.id}`}
              className="text-blue-600 hover:text-blue-800 mt-4 block"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HouseList;
