import React, { useState, useEffect } from 'react';
import axios from '../api/Index'; // Ensure this is the correct path to your axios instance
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaCheckSquare, FaSquare, FaSearch } from 'react-icons/fa';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import AddAccountModal from '../components/AddAccountModal';
import EditAccountModal from '../components/EditAccountModal';
import Cookies from 'js-cookie';

const Account = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const itemsPerPage = 5;

  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const users = response.data.users;

      if (Array.isArray(users)) {
        setData(users);
      } else {
        console.error('Unexpected data format:', users);
        setData([]);  // Fallback to empty array
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setData([]);  // Fallback to empty array
    }
  };

  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  const sortData = (key) => {
    let sortedData = [...data];
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      sortedData.reverse();
      setSortConfig({ key, direction: 'descending' });
    } else {
      sortedData.sort((a, b) => {
        if (key === 'created_at') {
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
    setSelectedIds((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((selectedId) => selectedId !== id) : [...prevSelected, id]
    );
  };

  const deleteSelected = async () => {
    try {
      const token = Cookies.get('token');
      if (selectedIds.length === 0) {
        return; // No selected items to delete
      }

      // Perform the deletion request
      await axios.delete(`/api/admin/users`, {
        data: { ids: selectedIds },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh the data and clear selected ids
      fetchData();
      setSelectedIds([]);
    } catch (error) {
      console.error('Error deleting accounts:', error);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const editAccount = (id) => {
    const accountToEdit = data.find((item) => item.id === id);
    setEditData(accountToEdit);
    setIsEditModalOpen(true);
  };

  const filteredData = data.filter((item) =>
    item.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-start items-start mb-16">
          <h1 className="text-2xl font-semibold text-gray-800">Manajemen Akun</h1>
          <p className="text-gray-500">/ akun-admin</p>
        </div>
        <div className="flex justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari berdasarkan nama..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-full py-2 px-4 pl-10 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FaSearch className="absolute inset-y-0 left-3 my-auto text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-500 text-white px-3 h-11 rounded hover:bg-green-600"
            >
              Tambah Data
            </button>
            <button
              onClick={deleteSelected}
              disabled={selectedIds.length === 0}
              className={`bg-red-500 text-white px-3 h-11 rounded ${selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
            >
              Hapus Pilihan
            </button>
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-700 text-gray-50">
              <tr>
                <th className="py-3 px-1 font-medium">Pilih</th>
                <th className="py-3 px-2 font-medium">No</th>
                <th className="py-3 px-4 text-left font-medium">Name</th>
                <th className="py-3 px-4 font-medium text-left cursor-pointer" onClick={() => sortData('username')}>
                  Username {getSortIcon('username')}
                </th>
                <th className="py-3 px-4 text-left font-medium">Peran</th>
                <th className="py-3 px-4 text-left font-medium cursor-pointer" onClick={() => sortData('created_at')}>
                  Date Created {getSortIcon('created_at')}
                </th>
                <th className="py-3 px-4 text-center font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {currentData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-center">
                    <button onClick={() => toggleSelect(item.id)}>
                      {selectedIds.includes(item.id) ? <FaCheckSquare className="text-blue-500" /> : <FaSquare />}
                    </button>
                  </td>
                  <td className="py-3 px-4 border-b text-center">{offset + index + 1}</td>
                  <td className="py-3 px-4 border-b">{item.name}</td>
                  <td className="py-3 px-4 border-b">{item.username}</td>
                  <td className="py-3 px-4 border-b">{item.role.name}</td>
                  <td className="py-3 px-4 border-b">{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="py-3 px-4 border-b text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => editAccount(item.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteAccount(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex mt-5 justify-between">
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>
      
      {/* Add Modal */}
      {isAddModalOpen && (
        <AddAccountModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            setIsAddModalOpen(false);
            fetchData();
          }}
        />
      )}

      {/* Edit Modal */}
      {isEditModalOpen && editData && (
        <EditAccountModal
          data={editData}
          onClose={() => setIsEditModalOpen(false)}
          onSuccess={() => {
            setIsEditModalOpen(false);
            fetchData();
          }}
        />
      )}
    </>
  );
};

export default Account;
