import React, { useState, useEffect } from 'react';
import axios from '../api/Index';
import { FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const EditExtracurricularModal = ({ closeModal, fetchData, extracurricularData }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Pre-fill the form with the extracurricular's current data
    if (extracurricularData) {
      setName(extracurricularData.nama);
    }
  }, [extracurricularData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = Cookies.get('token');
      // Use PUT method to update the extracurricular data
      await axios.put(`/api/admin/ekskul/${extracurricularData.id}`, { nama: name }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // Refresh data
      closeModal();
      toast.success("Berhasil Mengedit data Ekstrakulikuler!", {
        position: "top-center",
        duration: 5000,
      });
    } catch (error) {
      console.error('Error editing data:', error);
      toast.error("Gagal Mengedit data Ekstrakulikuler!", {
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
          <h2 className="text-xl font-semibold">Edit Data Extrakulikuler</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Nama Extrakulikuler</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 text-white px-4 py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {isSubmitting ? 'Loading...' : 'Simpan Perubahan'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditExtracurricularModal;
