import React, { useState, useEffect } from 'react';
import axios from '../api/Index';
import { FaSort, FaSortUp, FaSortDown, FaTrash, FaSearch, FaEdit, FaBan } from 'react-icons/fa';
import Pagination from '../components/Pagination';
import Sidebar from '../components/Sidebar';
import AddAccountModal from '../components/AddAccountModal';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import EditAccountModal from '../components/EditAccountModal';

const Account = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
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
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditModal = (account) => {
    setSelectedAccount(account);
    setIsEditModalOpen(true);
  };

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

  const deleteAccount = async (id) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      toast.success("Akun berhasil dihapus!");
    } catch (error) {
      console.error('Error deleting account:', error);
      toast.error("Gagal menghapus akun.");
    }
  };

  const toggleBlockStatus = async (id, isBlocked) => {
    try {
      const token = Cookies.get('token');
      const url = isBlocked
        ? `/api/admin/users/${id}/unban`
        : `/api/admin/users/${id}/ban`;
      await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchData(); // Ensure this is awaited
      toast.success(
        isBlocked ? 'Akun berhasil di-unblock!' : 'Akun berhasil di-block!'
      );
    } catch (error) {
      console.error(
        isBlocked ? 'Error unblocking account:' : 'Error blocking account:',
        error
      );
      toast.error(
        isBlocked ? 'Gagal unblock akun.' : 'Gagal block akun.'
      );
    }
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
          <p className="text-gray-500">/ account-admin</p>
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
          </div>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-700 text-gray-50">
              <tr>
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
              {currentData.map((item, index) => {
                const isBanned = Number(item.banned) === 1; // Convert to Number in case it's a string
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-center">{offset + index + 1}</td>
                    <td className="py-3 px-4 border-b">{item.name}</td>
                    <td className="py-3 px-4 border-b">{item.username}</td>
                    <td className="py-3 px-4 border-b">{item.role.name}</td>
                    <td className="py-3 px-4 border-b">{new Date(item.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4 border-b text-center">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => deleteAccount(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTrash />
                        </button>
                        <button
                          onClick={() => toggleBlockStatus(item.id, isBanned)}
                          className={`${isBanned
                              ? 'text-gray-400 hover:text-gray-500'
                              : 'text-red-500 hover:text-red-700'
                            }`}
                        >
                          {isBanned ? <FaBan /> : <FaBan />}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>

        <div className="flex mt-5 justify-between">
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        </div>
      </div>

      {isAddModalOpen && (
        <AddAccountModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)} // Update here
          fetchData={fetchData} // Ensure fetchData is passed to refresh data after adding
        />
      )}
      <EditAccountModal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}  // Changed from closeModal to onRequestClose
        accountData={selectedAccount}  // Ensure correct prop name 'accountData'
        fetchData={fetchData}
      />
    </>
  );
};

export default Account;
