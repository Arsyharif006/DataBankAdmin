import React, { useState } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaEdit, FaTrash, FaCheckSquare, FaSquare, FaSearch, FaEye } from 'react-icons/fa';
import Pagination from '../../components/Pagination'; 
import Sidebar from '../../components/Sidebar';
// You'll need to install 'xlsx' library: npm install xlsx
import * as XLSX from 'xlsx';

const StudentData = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "John Doe",
      fullName: "Muhammad John Doe",
      nis: "1234567890",
      nisn: "349234234",
      classId: "12 PPLG 1",
      fieldOfStudy: "PPLG",
      gender: "Laki-Laki",
      placeOfBirth: "Yogyakarta",
      dateOfBrith: "19/08/2007",
      religion: "Islam",
      citizen: "Indonesia",
      childOf: "Pertama",
      numberOfSiblings: "5",
      email: "john@example.com",
      phone: "08783233423",
      currentAddress: "Jl. Contoh No. 123, Yogyakarta",
      district: "Kecamatan Contoh",
      city: "Yogyakarta",
      schoolTransport: "Ojek",
      residenceStatus: "Rumah Sewa",
      livingWith: "Orang Tua",
      //orangtua//
      parentName: "Muhammad Arfan",
      parentStatus: "Kandung",
      parentPlaceOfBirth: "Yogyakarta",
      parentDateOfBirth: "15/01/1970",
      parentLastEducation: "S1",
      parentOccupation: "PNS",
      parentIncomeEstimate: "5,000,000",
      familyDependents: "3",
      parentAddress: "Jl. Contoh No. 456, Yogyakarta",
      parentPhoneNumber: "08783233424",
      schoolName: "SMA Contoh",
      diplomaScan: "link_to_diploma_scan",
      diplomaSerialNumber: "1234567890",
      uniformPhoto: "link_to_uniform_photo",
      birthCertificateScan: "link_to_birth_certificate_scan",
      familyCardScan: "link_to_family_card_scan",
      schoolAdmissionPath: "Jalur Prestasi",
    },
    // Add more students as needed
  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  

  const itemsPerPage = 5;

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

  const deleteSelected = () => {
    setData(data.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const deleteAccount = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const editAccount = (id) => {
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
    XLSX.utils.book_append_sheet(wb, ws, 'Students');
    XLSX.writeFile(wb, 'students.xlsx');
  };

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const offset = currentPage * itemsPerPage;
  const currentData = filteredData.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredData.length / itemsPerPage);

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
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-700 text-gray-50">
              <tr>
                <th className="py-3 px-1 font-medium">Pilih</th>
                <th className="py-3 px-2 font-medium">No</th>
                <th className="py-3 px-4 font-medium text-left cursor-pointer" onClick={() => sortData('name')}>
                  Nama {getSortIcon('name')}
                </th>
                <th className="py-3 px-4 text-left font-medium">Nisn</th>
                <th className="py-3 px-4 text-left font-medium">Email</th>
                <th className="py-3 px-4 text-left font-medium">No. Hp</th>
                <th className="py-3 px-4 text-left font-medium">Kelas</th>
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
                  <td className="py-3 px-4 border-b">{item.nisn}</td>
                  <td className="py-3 px-4 border-b">{item.email}</td>
                  <td className="py-3 px-4 border-b">{item.phone}</td>
                  <td className="py-3 px-4 border-b">{item.classId}</td>
                  <td className="py-3 px-4 border-b text-center">
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
        <div className="flex justify-between mt-4">
          <Pagination
            pageCount={pageCount}
            onPageChange={handlePageChange}
            currentPage={currentPage}
            className="mt-4"
          />
            <button
                onClick={deleteSelected}
                disabled={selectedIds.length === 0}
                className={`bg-red-500 text-white px-3 h-11 rounded ${selectedIds.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                >
                Hapus Pilihan
              </button>
        </div>
      </div>
    </>
  );
};

export default StudentData;
