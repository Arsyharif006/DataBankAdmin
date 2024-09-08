import React, { useState, useEffect } from 'react';
import axios from '../api/Index';
import { FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const EditCourseModal = ({ closeModal, fetchData, courseData }) => {
  const [courseName, setCourseName] = useState('');
  const [courseType, setCourseType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-populate the form when the modal opens with the course data passed via props
  useEffect(() => {
    if (courseData) {
      setCourseName(courseData.nama || '');
      setCourseType(courseData.subject_type_id || '');
    }
  }, [courseData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = Cookies.get('token');
      await axios.put(`/api/admin/mapel/${courseData.id}`, {
        nama: courseName,
        subject_type_id: courseType,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // Refresh data after successful edit
      closeModal(); // Close modal
      toast.success("Berhasil Mengedit data MataPelajaran!", {
        position: "top-center",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error editing data:', error);
      toast.error("Gagal Mengedit data MataPelajaran!", {
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
          <h2 className="text-xl font-semibold">Edit Mata Pelajaran</h2>
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
              <option value="" disabled>Kelompok Mata Pelajaran</option>
              <option value="1">Umum</option>
              <option value="2">Kejuruan</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isSubmitting ? 'Loading...' : 'Edit Mata Pelajaran'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
