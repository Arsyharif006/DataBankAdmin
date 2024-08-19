import React, { useState } from 'react';
import axios from '../api/Index';
import { FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';

const AddCourseModal = ({ closeModal, fetchData }) => {
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState(''); // Default to Produktif
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = Cookies.get('token');
      await axios.post('/api/admin/mapel', {
        nama: courseName,
        subject_type_id: courseType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // Refresh data
      closeModal();
    } catch (error) {
      console.error('Error creating course:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Tambah Mata Pelajaran</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="courseName" className="block text-gray-700 mb-2">Nama Mata Pelajaran</label>
            <input
              id="courseName"
              type="text"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="courseType" className="block text-gray-700 mb-2">Tipe Mata Pelajaran</label>
            <select
              id="courseType"
              value={courseType}
              onChange={(e) => setCourseType(e.target.value)}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Tipe Mata Pelajaran</option>
              <option value="1">Produktif</option>
              <option value="2">Non Produktif</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isSubmitting ? 'Loading...' : 'Tambah Mata Pelajaran'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
