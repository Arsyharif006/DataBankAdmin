// Account.js
import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaCheckSquare, FaSquare, FaSearch } from 'react-icons/fa';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination'; // Import the Pagination component

const TeacherData = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', password: '123456', date: '2024-08-11', role: 'Guru' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'abcdef', date: '2024-07-20', role: 'Staff' },
    { id: 3, name: 'Alice Johnson', email: 'alice@example.com', password: 'password', date: '2024-05-05', role: 'Guru' },
    { id: 4, name: 'Bob Brown', email: 'bob@example.com', password: '123abc', date: '2024-04-11', role: 'Staff' },
    { id: 5, name: 'Charlie Green', email: 'charlie@example.com', password: 'qwerty', date: '2024-03-15', role: 'Guru' },
    { id: 6, name: 'David Black', email: 'david@example.com', password: 'password123', date: '2024-02-10', role: 'Staff' },
    { id: 7, name: 'Eve White', email: 'eve@example.com', password: 'letmein', date: '2024-01-05', role: 'Guru' },
    { id: 8, name: 'Fay Brown', email: 'fay@example.com', password: 'mypassword', date: '2023-12-12', role: 'Staff' },
    { id: 9, name: 'Grace Black', email: 'grace@example.com', password: 'supersecret', date: '2023-11-15', role: 'Guru' },
    { id: 10, name: 'Hank White', email: 'hank@example.com', password: 'hunter2', date: '2023-10-05', role: 'Staff' },
    { id: 11, name: 'Ivan Grey', email: 'ivan@example.com', password: 'mypassword1', date: '2023-09-10', role: 'Guru' },
    { id: 12, name: 'Jack Blue', email: 'jack@example.com', password: 'password456', date: '2023-08-20', role: 'Staff' },
    { id: 13, name: 'Karl Red', email: 'karl@example.com', password: 'pass1234', date: '2023-07-11', role: 'Guru' },
    { id: 14, name: 'Laura Pink', email: 'laura@example.com', password: 'mysecret', date: '2023-06-15', role: 'Staff' },
    { id: 20, name: 'Ruth Grey', email: 'ruth@example.com', password: 'mypassword2', date: '2022-12-15', role: 'Staff' },
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const sortData = (key) => {
    let sortedData = [...data];
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      sortedData.reverse();
      setSortConfig({ key, direction: 'descending' });
    } else {
      sortedData.sort((a, b) => {
        if (key === 'date') {
          return new Date(a[key]) > new Date(b[key]) ? 1 : -1;
        }
        return a[key] > b[key] ? 1 : -1;
      });
      setSortConfig({ key, direction: 'ascending' });
    }
    setData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="inline ml-2" />;
    }
    return sortConfig.direction === 'ascending' ? <FaSortUp className="inline ml-2" /> : <FaSortDown className="inline ml-2" />;
  };

  const toggleSelect = (id) => {
    setSelectedIds((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const deleteSelected = () => {
    setData(data.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const deleteAccount = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const editAccount = (id) => {
    // Implement edit functionality here
    alert(`Editing account with id: ${id}`);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const renderTable = (role) => {
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.role === role // Filter by role
    );

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

    return (
      <>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-1 text-center">
                <span>Select</span>
              </th>
              <th className="py-3 px-2 text-center">No</th>
              <th className="py-3 px-4 text-left cursor-pointer flex items-center" onClick={() => sortData('name')}>
                Name {getSortIcon('name')}
              </th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">Password</th>
              <th className="py-3 px-4 text-left cursor-pointer flex items-center" onClick={() => sortData('date')}>
                Date Created {getSortIcon('date')}
              </th>
              <th className="py-3 px-4 text-left">Role</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {currentPageData.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-3 text-center">
                  <button onClick={() => toggleSelect(item.id)}>
                    {selectedIds.includes(item.id) ? <FaCheckSquare className="text-blue-500" /> : <FaSquare />}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">{offset + index + 1}</td>
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3">{item.password}</td>
                <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">{item.role}</td>
                <td className="px-4 py-3 text-center flex justify-center space-x-4">
                  <button onClick={() => editAccount(item.id)} className="text-blue-500 hover:text-blue-600">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteAccount(item.id)} className="text-red-500 hover:text-red-600">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
      </>
    );
  };

  return (
    <>
      <Sidebar/>
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-Start items-Start mb-12">
          <h1 className="text-2xl font-semibold text-gray-800">Data Guru Dan Staff</h1>
          <p className='text-gray-500'>/ dataguru</p>
        </div>

        <div className="flex justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-full py-2 px-4 pl-10 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute inset-y-0 left-3 my-auto text-gray-400" />
          </div>

          <button
            onClick={deleteSelected}
            disabled={selectedIds.length === 0}
            className={`bg-red-500 text-white px-3 h-11 rounded ${
              selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
            }`}
          >
            Delete Selected
          </button>
        </div>

        <Tabs selectedIndex={activeTab} onSelect={(index) => setActiveTab(index)}>
          <TabList className="flex justify-center mb-4 border-b border-gray-300">
            {['Guru', 'Staff'].map((role, index) => (
              <Tab
                key={role}
                className={`flex-1 text-center py-3 text-sm font-medium leading-5 cursor-pointer ${
                  activeTab === index
                    ? 'border-b-2 border-blue-500 text-black'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } focus:outline-none`}
              >
                {role}
              </Tab>
            ))}
          </TabList>

          <TabPanel>{renderTable('Guru')}</TabPanel>
          <TabPanel>{renderTable('Staff')}</TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default TeacherData;
