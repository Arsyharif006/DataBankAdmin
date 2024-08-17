import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaCheckSquare, FaSquare, FaSearch, FaEye } from 'react-icons/fa';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Sidebar from '../../components/Sidebar';
import Pagination from '../../components/Pagination'; // Import the Pagination component
import * as XLSX from 'xlsx';

const TeacherData = () => {
  const [data, setData] = useState([
    {
      id: 1,
      fullName: 'Aria Isha Nareswari', 
      name: 'Arsha', 
      nuptk: '123456789', 
      gender: 'perempuan', 
      placeOfBirth: 'Bandung', 
      dateOfBirth: '19 08 2001', 
      nip: '200107192020072001', 
      employmentStatus: 'Pegawai tetap', 
      ptkType: 'Guru kelas', 
      religion: 'Islam', 
      address: 'Jln.Cibogor', 
      rt: '07', 
      rw: '12', 
      dusun: 'Cilayung', 
      village: 'Cilayung',
      subDistrict: 'Jatinangor', 
      postalCode: '45360', 
      phone: '081234567890', 
      mobile: '085346146849',
      email: 'ariarshanaaa@gmail.com', 
      additionalTask: 'Guru piket',
      cpnsSK: '813.3/932/BKD-2019', 
      cpnsDate: '02 03 2020', 
      appointmentSK: '821.3/0847/BKD-2020',
      appointmentDate: '02 03 2021', 
      appointingInstitution: 'BKN Sumedang', 
      rankGroup: 'IIIA', 
      education: 'S1-Pendidikan Guru Sekolah Dasar',
      salary: 'Rp 4.575.200.7',
      categories: "Guru"
    },
    {
      id: 2,
      fullName: 'Muhammad Arfan', 
      name: 'Arfan', 
      nuptk: '123456789', 
      gender: 'Laki - laki', 
      placeOfBirth: 'Bandung', 
      dateOfBirth: '19 08 2001', 
      nip: '200107192020072001', 
      employmentStatus: 'Pegawai tetap', 
      ptkType: 'Guru kelas', 
      religion: 'Islam', 
      address: 'Jln.Cibogor', 
      rt: '07', 
      rw: '12', 
      dusun: 'Cilayung', 
      village: 'Cilayung',
      subDistrict: 'Jatinangor', 
      postalCode: '45360', 
      phone: '081234567890', 
      mobile: '085346146849',
      email: 'ariarshanaaa@gmail.com', 
      additionalTask: 'Guru piket',
      cpnsSK: '813.3/932/BKD-2019', 
      cpnsDate: '02 03 2020', 
      appointmentSK: '821.3/0847/BKD-2020',
      appointmentDate: '02 03 2021', 
      appointingInstitution: 'BKN Sumedang', 
      rankGroup: 'IIIA', 
      education: 'S1-Pendidikan Guru Sekolah Dasar',
      salary: 'Rp 4.575.200.7',
      categories: "Staff"
    },
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

  
  // Import data from Excel
  const importData = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const binaryStr = e.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const importedData = XLSX.utils.sheet_to_json(worksheet);
      const formattedData = importedData.map((item, index) => ({
      
      }));
      setData([...data, ...formattedData]);
    };
    reader.readAsBinaryString(file);
  };

  // Export data to Excel
  const exportData = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teachers');
    XLSX.writeFile(wb, 'Teachers.xlsx');
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
         <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-700 text-gray-50">
            <tr>
              <th className=" text-center font-medium">
                <span>Pilih</span>
              </th>
              <th className="py-3 px-2 text-center font-medium">No</th>
              <th className="py-3 px-4 text-left font-medium cursor-pointer flex items-center" onClick={() => sortData('name')}>
                Nama {getSortIcon('name')}
              </th>
              <th className="py-3 px-4 text-left font-medium">NIP</th>
              <th className="py-3 px-4 text-left font-medium">Email</th>
              <th className="py-3 px-4 text-left font-medium">No. HP</th>
              <th className="py-3 px-4 text-left font-medium">Sebagai</th>
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
                <td className="py-3 px-4 border-b">{item.name}</td>
                <td className="py-3 px-4 border-b">{item.nip}</td>
                <td className="py-3 px-4 border-b">{item.email}</td>
                <td className="py-3 px-4 border-b">{item.phone}</td>
                <td className="py-3 px-4 border-b">{item.categories}</td>
                <td className="px-5 py-4 border-b text-center">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => alert('View clicked')}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <FaEye />
                      </button>
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
        <div className='flex mt-5 justify-between'>
        <Pagination pageCount={pageCount} onPageChange={handlePageChange} />
        <button
              onClick={deleteSelected}
              disabled={selectedIds.length === 0}
              className={`bg-red-500 text-white px-3 h-11 rounded ${selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
              >
              Hapus Pilihan
            </button>
              </div>
      </>
    );
  };

  return (
    <>
      <Sidebar/>
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-Start items-Start mb-12">
          <h1 className="text-2xl font-semibold text-gray-800">Data Guru Dan Staff</h1>
          <p className='text-gray-500'>/ dataguru-admin</p>
        </div>

        <div className="flex justify-between mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-md py-2 px-4 pl-10 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              onClick={() => alert('Add Data clicked')}
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
    </>
  );
};

export default TeacherData;
