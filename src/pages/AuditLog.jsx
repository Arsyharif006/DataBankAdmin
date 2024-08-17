import React from 'react';
import Sidebar from '../components/Sidebar';

const AuditLog = () => {
  const data = [
    {
      date: '20 Mar 23 12:00',
      organizer: 'Blacktea',
      user: 'james@blacktea.com',
      activity: 'Account Creations',
      subActivity: 'Signin success',
      details: 'View Details',
      ip: '192.158.1.38'
    },
    {
      date: '20 Mar 23 12:00',
      organizer: 'Blacktea',
      user: 'james@blacktea.com',
      activity: 'Account Creations',
      subActivity: 'Signin failed',
      details: 'View Details',
      ip: '192.158.1.38'
    }
  ];

  return (
    <>
      <Sidebar />
      <div className="p-6 bg-gray-50 min-h-screen ">
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Search
            </button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200">
              Clear all
            </button>
          </div>
          <span className="text-gray-600">547 results found</span>
          <button className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 flex items-center space-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>Export excel</span>
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="text-left py-3 px-4 font-medium">Date (UTC)</th>
                <th className="text-left py-3 px-4 font-medium">Organizer</th>
                <th className="text-left py-3 px-4 font-medium">Users</th>
                <th className="text-left py-3 px-4 font-medium">Activities</th>
                <th className="text-left py-3 px-4 font-medium">Sub activities</th>
                <th className="text-left py-3 px-4 font-medium">Details</th>
                <th className="text-left py-3 px-4 font-medium">IP address</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{item.date}</td>
                  <td className="py-3 px-4 border-b">{item.organizer}</td>
                  <td className="py-3 px-4 border-b">{item.user}</td>
                  <td className="py-3 px-4 border-b">{item.activity}</td>
                  <td className="py-3 px-4 border-b">{item.subActivity}</td>
                  <td className="py-3 px-4 border-b text-indigo-600 hover:underline cursor-pointer">
                    {item.details}
                  </td>
                  <td className="py-3 px-4 border-b">{item.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AuditLog;
