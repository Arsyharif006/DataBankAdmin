import React, { useState, useEffect, useCallback } from 'react';
import axios from '../../api/Index';
import Cookies from 'js-cookie';
import {
  FaSort,
  FaSortUp,
  FaSortDown,
  FaEdit,
  FaTrash,
  FaCheckSquare,
  FaSquare,
  FaSearch
} from 'react-icons/fa';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar';
import AddExtracurricularModal from '../../components/AddExtracurricularModal';
import EditExtracurricularModal from '../../components/EditExtracurricularModal';
import { toast } from 'react-hot-toast';

const ExtracurricularData = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedExtracurricular, setSelectedExtracurricular] = useState(null);

  const itemsPerPage = 5;

  // Define fetchData using useCallback to prevent unnecessary re-renders
  const fetchData = useCallback(async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          position: "top-center",
          duration: 5000,
        });
        // Optionally, redirect to login page
        return;
      }
      const response = await axios.get('/api/admin/ekskul', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const rooms = response.data.data;
      if (Array.isArray(rooms)) {
        setData(rooms);
      } else {
        console.error('Unexpected data format:', rooms);
        setData([]);
        toast.error("Data format is incorrect.", {
          position: "top-center",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error("Gagal mengambil data. Silakan coba lagi.", {
        position: "top-center",
        duration: 5000,
      });
    }
  }, []);

  // Call fetchData inside useEffect
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortData = (key) => {
    let sortedData = [...data];
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      sortedData.reverse();
      setSortConfig({ key, direction: 'descending' });
    } else {
      sortedData.sort((a, b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({ key, direction: 'ascending' });
    }
    setData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort className="inline ml-2" />;
    }
    return sortConfig.direction === 'ascending' ? (
      <FaSortUp className="inline ml-2" />
    ) : (
      <FaSortDown className="inline ml-2" />
    );
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

  const deleteSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          position: "top-center",
          duration: 5000,
        });
        return;
      }

      // Create an array of delete requests
      const deleteRequests = selectedIds.map((id) =>
        axios.delete(`/api/admin/ekskul/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      );

      // Execute all delete requests concurrently
      await Promise.all(deleteRequests);

      // Refresh data after deletion
      await fetchData();

      setSelectedIds([]);
      toast.success("Berhasil Menghapus data yang dipilih!", {
        position: "top-center",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error("Gagal Menghapus data!", {
        position: "top-center",
        duration: 5000,
      });
    }
  };

  const editAccount = (extracurricular) => {
    setSelectedExtracurricular(extracurricular); // Set selected extracurricular data
    setIsEditModalOpen(true); // Open the edit modal
  };

  const deleteAccount = async (id) => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          position: "top-center",
          duration: 5000,
        });
        return;
      }

      await axios.delete(`/api/admin/ekskul/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Refresh data after deletion
      await fetchData();

      toast.success("Berhasil Menghapus data!", {
        position: "top-center",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error deleting data:', error);
      toast.error("Gagal Menghapus data!", {
        position: "top-center",
        duration: 5000,
      });
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredData = Array.isArray(data)
    ? data.filter((item) =>
        item.nama && item.nama.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const importData = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          position: "top-center",
          duration: 5000,
        });
        return;
      }

      await axios.post('api/admin/extracurriculars/import', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Berhasil Import data Ekstrakulikuler!", {
        position: "top-center",
        duration: 5000,
      });

      // Refresh data after import
      await fetchData();
    } catch (error) {
      console.error('Error importing data:', error);
      toast.error("Gagal Mengimpor data!", {
        position: "top-center",
        duration: 5000,
      });
    }
  };

  const exportData = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        toast.error("Token not found. Please log in again.", {
          position: "top-center",
          duration: 5000,
        });
        return;
      }

      const response = await axios.get('/api/admin/extracurriculars/export', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Ensure response is treated as a file
      });

      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Ekstrakulikuler.xlsx'); // Corrected filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Remove the link after download
      toast.success("Berhasil Export Data Ekstrakulikuler!", {
        position: "top-center",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error("Gagal Mengekspor data!", {
        position: "top-center",
        duration: 5000,
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Sidebar />
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-start items-start mb-16">
          <h1 className="text-2xl font-semibold text-gray-800">Data Ekstrakulikuler</h1>
          <p className='text-gray-500'>/ extracurricular-admin</p>
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
              onClick={exportData}
              className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200"
            >
              Export
            </button>
            <label className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-200 flex items-center cursor-pointer">
              Import
              <input type="file" className="hidden" accept=".xlsx, .xls" onChange={importData} />
            </label>
            <button
              onClick={openModal}
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
                <th className="py-3 px-4 font-medium">Pilih</th>
                <th className="py-3 px-4 font-medium text-start">No</th>
                <th
                  className="text-left py-3 px-4 font-medium cursor-pointer flex items-center"
                  onClick={() => sortData('nama')}
                >
                  Nama Ekstrakulikuler {getSortIcon('nama')}
                </th>
                <th className="text-start py-3 px-4 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentData.length > 0 ? (
                currentData.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 border-b text-center">
                      <button onClick={() => toggleSelect(item.id)}>
                        {selectedIds.includes(item.id) ? (
                          <FaCheckSquare className="text-blue-500" />
                        ) : (
                          <FaSquare />
                        )}
                      </button>
                    </td>
                    <td className="py-3 px-4 border-b">{offset + index + 1}</td>
                    <td className="py-3 px-4 border-b">{item.nama}</td>
                    <td className="py-3 px-4 border-b text-start space-x-4">
                      <button onClick={() => editAccount(item)} className="text-blue-500 hover:text-blue-600">
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteAccount(item.id)} className="text-red-500 hover:text-red-600">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className='flex mt-5 justify-between items-center'>
          <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
          <button
            onClick={deleteSelected}
            disabled={selectedIds.length === 0}
            className={`bg-red-500 text-white px-3 h-11 rounded ${
              selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
            }`}
          >
            Hapus Pilihan
          </button>
        </div>
        {isModalOpen && (
          <AddExtracurricularModal closeModal={closeModal} fetchData={fetchData} />
        )}
        {isEditModalOpen && (
          <EditExtracurricularModal
            closeModal={() => setIsEditModalOpen(false)}
            fetchData={fetchData}  // Pass fetchData correctly
            extracurricularData={selectedExtracurricular}  // Corrected prop name
          />
        )}
      </div>
    </>
  );
};

export default ExtracurricularData;
