import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination'; // Ensure this component exists
import { FaEye } from 'react-icons/fa';

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

  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const itemsPerPage = 5;

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleFilterByDate = (data) => {
    if (!startDate && !endDate) {
      return data;
    }

    const filtered = data.filter(item => {
      const itemDate = new Date(item.date);
      const start = startDate ? new Date(startDate) : new Date('1900-01-01');
      const end = endDate ? new Date(endDate) : new Date();

      return itemDate >= start && itemDate <= end;
    });

    return filtered;
  };

  const filteredData = handleFilterByDate(data);

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto mt-10 px-10">
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">{filteredData.length} results found</span>
        </div>
        <div className="flex justify-between space-x-4 mb-4">
          <div className="flex space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md"
              placeholder="Start Date"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md"
              placeholder="End Date"
            />
          </div>
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
            <thead className="bg-gray-700 text-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium">No</th>
                <th className="text-left py-3 px-4 font-medium">Organizer</th>
                <th className="text-left py-3 px-4 font-medium">Activities</th>
                <th className="text-left py-3 px-4 font-medium">Sub activities</th>
                <th className="text-left py-3 px-4 font-medium">IP address</th>
                <th className="text-left py-3 px-4 font-medium">Details</th>
                <th className="text-left py-3 px-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-5 py-4 border-b">{offset + index + 1}</td>
                  <td className="py-3 px-4 border-b">{item.organizer}</td>
                  <td className="py-3 px-4 border-b">{item.activity}</td>
                  <td className="py-3 px-4 border-b">{item.subActivity}</td>
                  <td className="py-3 px-4 border-b">{item.ip}</td>
                  <td className="py-3 px-4 border-b">
                    <button onClick={() => alert(`View details for ${item.ip}`)} className="text-blue-500 hover:text-blue-600">
                      <FaEye />
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex mt-5 justify-between">
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>
    </>
  );
};

export default AuditLog;
