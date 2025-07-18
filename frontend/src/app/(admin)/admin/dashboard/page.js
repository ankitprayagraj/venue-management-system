'use client'
import React, { useEffect, useState } from 'react';

// Main App component
const App = () => {
    // Sample data provided by the user

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

    return (
        <div className="min-h-screen bg-gray-100 p-4 font-sans text-gray-800">
            <div className="container mx-auto p-6 bg-white rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">Venue Listings</h1>

                {venuesData.venues && venuesData.venues.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Venue Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Capacity
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Amenities
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                        Created At
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {venuesData.venues.map((venue) => (
                                    <tr key={venue._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {venue.venueName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                                            {venue.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                                            {venue.location ? (
                                                <>
                                                    {venue.location.address && <div>{venue.location.address}</div>}
                                                    {venue.location.city && <div>{venue.location.city}, {venue.location.state}</div>}
                                                    {venue.location.pincode && <div>{venue.location.pincode}</div>}
                                                </>
                                            ) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {venue.capacity}
                                        </td>
                                        <td className="px-6 py-4 whitespace-normal text-sm text-gray-700">
                                            {venue.amenities && venue.amenities.length > 0 ? (
                                                <ul className="list-disc list-inside">
                                                    {venue.amenities.map((amenity, index) => (
                                                        <li key={index}>{amenity}</li>
                                                    ))}
                                                </ul>
                                            ) : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            ${venue.price}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${venue.status === 'live' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {venue.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {new Date(venue.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-600 text-lg">No venue data available.</p>
                )}

                <div className="mt-8 text-center text-gray-600">
                    <p>Total Venues: <span className="font-semibold">{venuesData.totalCount}</span></p>
                    <p>Page Number: <span className="font-semibold">{venuesData.pageNumber}</span></p>
                    <p>Page Size: <span className="font-semibold">{venuesData.pageSize}</span></p>
                </div>
            </div>
        </div>
    );
};

export default App;
