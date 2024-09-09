import React, { useState, useEffect } from 'react';
import axios from '../api/Index';
import { FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const EditClassModal = ({ closeModal, fetchData, classData }) => {
  const [formData, setFormData] = useState({
    name: classData.nama || '',
    tingkat: classData.tingkat || '',
    department: classData.department_id || ''
  });
  const [departments, setDepartments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch departments when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get('/api/admin/jurusan', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDepartments(response.data.data); // Adjust based on actual response format
      } catch (error) {
        console.error('Error fetching departments:', error);
        toast.error("Gagal mengambil data Jurusan!", {
          position: "top-center",
          duration: 5000,
        });
      }
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = Cookies.get('token');
      await axios.put(`/api/admin/kelas/${classData.id}`, 
        { 
          nama: formData.name, 
          tingkat: formData.tingkat, 
          department_id: formData.department // Send only the department ID
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData(); // Refresh data
      closeModal();
      toast.success("Berhasil Mengubah data Kelas!", {
        position: "top-center",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error editing class:', error);
      toast.error("Gagal Mengubah data Kelas!", {
        position: "top-center",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Edit Data Kelas</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Nama Kelas</label>
            <select
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Pilih Kelas</option>
              <option value="Kelas 10">Kelas 10</option>
              <option value="Kelas 11">Kelas 11</option>
              <option value="Kelas 12">Kelas 12</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="tingkat" className="block text-gray-700 mb-2">Tingkat</label>
            <select
              id="tingkat"
              value={formData.tingkat}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Pilih Tingkat</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="department" className="block text-gray-700 mb-2">Jurusan</label>
            <select
              id="department"
              value={formData.department}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Pilih Jurusan</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.nama} {/* Adjust based on actual data structure */}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Loading...' : 'Edit Kelas'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClassModal;
