import React, { useState, useEffect } from 'react';
import axios from '../api/Index';
import Cookies from 'js-cookie';
import Sidebar from '../components/Sidebar';
import Pagination from '../components/Pagination';
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const AuditLog = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = Cookies.get('token');
      const response = await axios.get('/api/admin/audit-logs', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data.data.data)) {
        setData(response.data.data.data);
        setFilteredData(response.data.data.data); // Set filteredData to the full dataset initially
      } else {
        console.error('Unexpected data format:', response.data);
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      setData([]);
      setFilteredData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    handleFilterByDate();
  }, [startDate, endDate]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleFilterByDate = () => {
    if (!startDate && !endDate) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter((item) => {
      const itemDate = new Date(item.created_at);
      const start = startDate ? new Date(startDate) : new Date('1900-01-01');
      const end = endDate ? new Date(endDate) : new Date();

      return itemDate >= start && itemDate <= end;
    });

    setFilteredData(filtered);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (key === 'created_at') {
        return direction === 'ascending'
          ? new Date(a[key]) - new Date(b[key])
          : new Date(b[key]) - new Date(a[key]);
      } else {
        return direction === 'ascending'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });
    setFilteredData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort />;
    }
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  };

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-start items-start mb-16">
          <h1 className="text-2xl font-semibold text-gray-800">Audit Log</h1>
          <p className="text-gray-500">/ auditlog-admin</p>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">{filteredData.length} hasil ditemukan</span>
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
                <th className="text-left py-3 px-4 font-medium cursor-pointer" onClick={() => handleSort('user.name')}>
                  <div className="flex items-center">
                    Nama User
                    <span className="ml-2">{getSortIcon('user.name')}</span>
                  </div>
                </th>
                <th className="text-left py-3 px-4 font-medium">Aktivitas</th>
                <th className="text-left py-3 px-4 font-medium">Model</th>
                <th className="text-left py-3 px-4 font-medium">Respon</th>
                <th className="text-left py-3 px-4 font-medium">Respon Code</th>
                <th className="text-left py-3 px-4 font-medium cursor-pointer" onClick={() => handleSort('created_at')}>
                  <div className="flex items-center">
                    Tanggal
                    <span className="ml-2">{getSortIcon('created_at')}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{offset + index + 1}</td>
                  <td className="py-3 px-4 border-b">{item.user.name}</td>
                  <td className="py-3 px-4 border-b">{item.action}</td>
                  <td className="py-3 px-4 border-b">{item.model}</td>
                  <td className="py-3 px-4 border-b">{item.response}</td>
                  <td className="py-3 px-4 border-b">{item.response_code}</td>
                  <td className="py-3 px-4 border-b">{new Date(item.created_at).toLocaleString()}</td>
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
