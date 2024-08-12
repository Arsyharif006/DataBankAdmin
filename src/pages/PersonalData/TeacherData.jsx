import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaCheckSquare, FaSquare, FaSearch } from 'react-icons/fa';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination'; // Import the Pagination component

const TeacherData = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', nip: '123456', email: 'john@example.com', phone: '081234567890', categories: 'Guru', date: '2024-08-11' },
    { id: 2, name: 'Jane Smith', nip: '123032', email: 'jane@example.com', phone: '081234567891', categories: 'Staff', date: '2024-07-20' },
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

  const renderTable = (categories) => {
    const filteredData = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.categories === categories // Filter by categories
    );

    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredData.slice(offset, offset + itemsPerPage);

    return (
      <>
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-700 text-white">
            <tr>
              <th className="py-3 px-1 text-center">
                <span>Pilih</span>
              </th>
              <th className="py-3 px-2 text-center">No</th>
              <th className="py-3 px-4 text-left cursor-pointer flex items-center" onClick={() => sortData('name')}>
                Nama {getSortIcon('name')}
              </th>
              <th className="py-3 px-4 text-left">NIP</th>
              <th className="py-3 px-4 text-left">Email</th>
              <th className="py-3 px-4 text-left">No. HP</th>
              <th className="py-3 px-4 text-left">Sebagai</th>
              <th className="py-3 px-4 text-center">Aksi</th>
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
                <td className="px-4 py-3">{item.nip}</td>
                <td className="px-4 py-3">{item.email}</td>
                <td className="px-4 py-3">{item.phone}</td>
                <td className="px-4 py-3">{item.categories}</td>
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
                    ? 'border-b-2 border-blue-500 text-blue-500'
                    : 'border-b-2 border-transparent text-gray-500 hover:text-gray-400 hover:border-gray-300'
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
