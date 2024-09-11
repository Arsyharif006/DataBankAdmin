import React, { useState, useEffect } from 'react';
import axios from '../../api/Index';
import Cookies from 'js-cookie';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaCheckSquare, FaSquare, FaSearch, FaEye } from 'react-icons/fa';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination'; // Import the Pagination component
import ShowTeacherModal from '../../components/ShowTeacherModal';
import AddTeacherModal from '../../components/AddTeacherModal'; 
import EditTeacherModal from '../../components/EditTeacherModal'; 
import { toast } from 'react-hot-toast';



const TeacherData = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const itemsPerPage = 5;

  // Move the fetchData function outside of the useEffect
  const fetchData = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('api/admin/gurustaff', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Ensure that response.data.data is an array before setting it to state
      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error('Unexpected data format:', response.data);
        setData([]); // Fallback to an empty array if the data is not as expected
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]); // Handle errors by setting an empty array
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleAddTeacher = (newTeacher) => {
    setData([...data, newTeacher]);
    setIsAddModalOpen(false);
  };

  

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

  const deleteSelected = async () => {
    try {
      const token = Cookies.get('token');
      
      // Delete selected items from the backend
      for (const id of selectedIds) {
        await axios.delete(`api/admin/gurustaff/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      
      // Remove deleted items from the state
      setData(data.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]); // Clear selection after deletion
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
  

  const deleteAccount = async (id) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`api/admin/gurustaff/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.id !== id));
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

  const editAccount = (id) => {
    // Implement edit functionality here
    alert(`Editing account with id: ${id}`);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Import data from Excel
  const importData = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = Cookies.get('token');
      await axios.post('api/admin/employees/import', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success("Berhasil Import data Guru dan staff!", {
        position: "top-center",
        duration: 5000,
      });

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
      const response = await axios.get('/api/admin/employees/export', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'blob', // Ensure response is treated as a file
      });
  
      // Create a link element to download the file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Guru_Dan_Staff.xlsx'); // Name of the file to be downloaded
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Remove the link after download
      toast.success("Berhasil Export Data Guru dan staff!", {
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

  const renderTable = (categories) => {
    const filteredData = data.filter((item) => {
      if (categories === 'Guru') {
        return item.employee_type_id === 1 || item.employee_type_id === 2;
      }
      if (categories === 'Staff') {
        return item.employee_type_id === 3;
      }
      return false;
    });
  
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);
    const offset = currentPage * itemsPerPage;
    const currentPageData = filteredData.slice(offset, offset + itemsPerPage);


    const openModal = (item) => {
      setSelectedTeacher(item); // Set the selected teacher
      setIsModalOpen(true); // Open the modal
    };
  
    const closeModal = () => {
      setIsModalOpen(false); // Close the modal
    };

    const editTeacher = (item) => {
      setSelectedTeacher(item); // Set the selected teacher
      setIsEditModalOpen(true); // Open the Edit Modal
    };
  
  
    return (
      <>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-700 text-gray-50">
              <tr>
                <th className="text-center font-medium">Pilih</th>
                <th className="py-3 px-2 text-center font-medium">No</th>
                <th className="py-3 px-4 text-left font-medium cursor-pointer flex items-center" onClick={() => sortData('nama')}>
                  Nama {getSortIcon('nama')}
                </th>
                <th className="py-3 px-4 text-left font-medium">NIK</th>
                <th className="py-3 px-4 text-left font-medium">Email</th>
                <th className="py-3 px-4 text-left font-medium">No. HP</th>
                <th className="py-3 px-4 text-left font-medium">Jabatan</th>
                <th className="py-3 px-4 text-center font-medium">Aksi</th>
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
                  <td className="py-3 px-4 border-b">{item.nama}</td>
                  <td className="py-3 px-4 border-b">{item.nik}</td>
                  <td className="py-3 px-4 border-b">{item.email}</td>
                  <td className="py-3 px-4 border-b">{item.hp}</td>
                  <td className="py-3 px-4 border-b">{item.employee_type2.nama}</td>
                  <td className="px-5 py-4 border-b text-center">
                    <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => openModal(item)}
                      className="text-blue-700 hover:text-blue-900"
                    >
                      <FaEye />
                    </button>
                      <button onClick={() => editTeacher(item)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteAccount(item.id)} className="text-red-500 hover:text-red-700">
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
      </>
    );
  };

  return (
    <>
      <Sidebar />
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-Start items-Start mb-12">
          <h1 className="text-2xl font-semibold text-gray-800">Data Guru Dan Staff</h1>
          <p className="text-gray-500">/ teacherdata-admin</p>
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
              <input
        type="file"
        accept=".xlsx, .xls"
        onChange={importData}
        className="hidden"
    />

            </label>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
            >
              Tambah Data
            </button>
          </div>
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
      <AddTeacherModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddTeacher}
      />
     <ShowTeacherModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedTeacher}
      />
    <EditTeacherModal
  isOpen={isEditModalOpen}
  onClose={() => setIsEditModalOpen(false)}
  fetchData={fetchData}
  selectedTeacher={selectedTeacher} // Pass the selected Teacher's data correctly
/>
    </>
  );
};

export default TeacherData;
