import React, { useState, useEffect } from 'react';
import axios from '../../api/Index';
import Cookies from 'js-cookie';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaCheckSquare, FaSquare, FaSearch, FaEye } from 'react-icons/fa';
import Pagination from '../../components/Pagination';
import Sidebar from '../../components/Sidebar';
import * as XLSX from 'xlsx';
import StudentDetailsModal from '../../components/ShowStudentsModal'; // Assume this is the modal component
import AddStudentModal from '../../components/AddStudentModal'; 

const StudentData = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State for Add Modal
  const itemsPerPage = 5;


  // Function to handle adding a new student
  const handleAddStudent = (newStudent) => {
    // Add the new student to the data array
    setData([...data, newStudent]);
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('/api/admin/siswa', {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        console.log(response.data.data)
        setData(Array.isArray(response.data.data) ? response.data.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

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
      for (const id of selectedIds) {
        await axios.delete(`/api/admin/siswa/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setData(data.filter((item) => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`/api/admin/siswa/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const editAccount = (id) => {
    alert(`Editing account with id: ${id}`);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const importData = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = Cookies.get('token');
      await axios.post('api/admin/students/import', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

    } catch (error) {
      console.error('Error importing data:', error);
    }
  };

  const exportData = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'students.xlsx');
  };

  const filteredData = data.filter(item =>
    item.nama_lengkap.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  return (
    <>
      <Sidebar />
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-start items-start mb-16">
          <h1 className="text-2xl font-semibold text-gray-800">Data Siswa</h1>
          <p className='text-gray-500'>/ datasiswa-admin</p>
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
            onClick={() => setIsAddModalOpen(true)} // Open the Add Modal
            className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600"
          >
              Tambah Data
            </button>
          </div>
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-700 text-gray-50">
              <tr>
                <th className="py-3 px-1 font-medium">Pilih</th>
                <th className="py-3 px-2 font-medium">No</th>
                <th className="py-3 px-4 font-medium text-left cursor-pointer" onClick={() => sortData('nama_lengkap')}>
                  Nama lengkap {getSortIcon('nama_lengkap')}
                </th>
                <th className="py-3 px-4 text-left font-medium">NIS</th>
                <th className="py-3 px-4 text-left font-medium">NISN</th>
                <th className="py-3 px-4 text-left font-medium">No. HP</th>
                <th className="py-3 px-4 text-left font-medium">Kelas</th>
                <th className="py-3 px-4 text-left font-medium">Angkatan</th>
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
                  <td className="py-3 px-4 border-b">{item.nama_lengkap}</td>
                  <td className="py-3 px-4 border-b">{item.nis}</td>
                  <td className="py-3 px-4 border-b">{item.nisn}</td>
                  <td className="py-3 px-4 border-b">{item.no_hp}</td>
                  <td className="py-3 px-4 border-b">{item.classroom.nama}</td>
                  <td className="py-3 px-4 border-b">{item.angkatan}</td>
                  <td className="py-3 px-4 border-b text-center justify-center space-x-2">
                    <button onClick={() => viewStudentDetails(item)} className="text-blue-700 hover:text-blue-900">
                      <FaEye />
                    </button>
                    <button onClick={() => editAccount(item.id)} className="text-blue-500 hover:text-blue-700">
                        <FaEdit />
                      </button>
                      <button onClick={() => deleteAccount(item.id)} className="text-red-500 hover:text-red-700">
                        <FaTrash />
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageChange}
          />
          <button
            onClick={deleteSelected}
            className={`bg-red-500 text-white px-3 h-11 rounded ${
              selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
            }`}
          >
            Hapus Pilihan
          </button>
        </div>
      </div>
      {isModalOpen && selectedStudent && (
        <StudentDetailsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          student={selectedStudent}
        />
      )}
        {isAddModalOpen && (
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddStudent}
        />
      )}
    </>
  );
};

export default StudentData;
