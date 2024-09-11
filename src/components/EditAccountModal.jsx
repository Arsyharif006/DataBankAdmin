import React, { useState, useEffect } from 'react';
import axios from '../api/Index';
import { FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const EditAccountModal = ({ isOpen, onRequestClose, fetchData, accountData }) => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    role_id: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && accountData) {
      setFormData({
        name: accountData.name || '',
        username: accountData.username || '',
        password: '', // Keep password empty unless changed
        role_id: accountData.role_id || '',
      });
    }
  }, [isOpen, accountData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const token = Cookies.get('token');
      await axios.put(`/api/admin/users/${accountData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData(); // Fetch updated data
      onRequestClose(); // Close the modal after successful submission
      toast.success('Berhasil Mengedit Akun!', {
        position: 'top-center',
        duration: 5000,
      });
    } catch (error) {
      console.error('Error mengedit akun:', error);
      toast.error('Gagal Mengedit Akun!', {
        position: 'top-center',
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null; // Only render modal if open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Edit Akun</h2>
          <button
            onClick={onRequestClose} // Close the modal on click
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Nama</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password (Opsional)</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Kosongkan jika tidak ingin mengganti password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role_id" className="block text-gray-700 mb-2">Role</label>
            <select
              id="role_id"
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Pilih Role</option>
              <option value="1">Admin</option>
              <option value="2">Client</option>
            </select>
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

export default EditAccountModal;
