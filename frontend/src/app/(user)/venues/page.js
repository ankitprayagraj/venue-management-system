'use client'
import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {

      const [venuesData, setVenueData] = useState({});
      const [isLoading, setLoading] = useState(true);
      const [isError, setError] = useState(false);
  
      async function getAllData() {
          try {
              setLoading(true);
              const apiResponse = await fetch('http://localhost:3000/venues?page=1&pageSize=2');
              const data = await apiResponse.json();
              console.log(data)
              setVenueData(data.data)
              setLoading(false);
  
          }
          catch (e) {
              setLoading(false);
              setError(true);
  
          }
      }
      useEffect(() => {
          console.log("run")
          getAllData()
      }, []);

  // Show loading indicator
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans text-gray-800">
        <p className="text-xl font-semibold text-blue-600">Loading venue data...</p>
      </div>
    );
  }

  // Show error message
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-sans text-gray-800">
        <p className="text-xl font-semibold text-red-600">Error</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
      <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Venue Listings</h1>

        {venuesData.venues && venuesData.venues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {venuesData.venues.map((venue) => (
              <div key={venue._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">{venue.venueName}</h2>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-3">{venue.description}</p>

                  <div className="mb-3">
                    <p className="text-gray-600 text-xs uppercase font-medium">Location:</p>
                    {venue.location ? (
                      <>
                        {venue.location.address && <p className="text-gray-800 text-sm">{venue.location.address}</p>}
                        {venue.location.city && <p className="text-gray-800 text-sm">{venue.location.city}, {venue.location.state} {venue.location.pincode}</p>}
                      </>
                    ) : <p className="text-gray-800 text-sm">N/A</p>}
                  </div>

                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-gray-600 text-xs uppercase font-medium">Capacity:</p>
                      <p className="text-gray-800 text-sm font-semibold">{venue.capacity} people</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs uppercase font-medium">Price:</p>
                      <p className="text-green-600 text-lg font-bold">₹{venue.price}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600 text-xs uppercase font-medium mb-1">Amenities:</p>
                    {venue.amenities && venue.amenities.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {venue.amenities.map((amenity, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    ) : <p className="text-gray-800 text-sm">N/A</p>}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      venue.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {venue.status}
                    </span>
                    <p className="text-gray-500 text-xs p-2 border-green-500 border-2 rounded-lg font-semibold space-x-2">
                      Book Now
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">No venue data available.</p>
        )}

        {venuesData?.venues && (
          <div className="mt-8 text-center text-gray-600">
            <p>Total Venues: <span className="font-semibold">{venuesData.venues.totalCount}</span></p>
            <p>Page Number: <span className="font-semibold">{venuesData.venues.pageNumber}</span></p>
            <p>Page Size: <span className="font-semibold">{venuesData.venues.pageSize}</span></p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
