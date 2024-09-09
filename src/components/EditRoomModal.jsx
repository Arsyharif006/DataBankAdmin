import React, { useState, useEffect } from 'react';
import axios from '../api/Index';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const EditRoomModal = ({ isOpen, closeModal, roomData, fetchData }) => {
  const [nama, setNama] = useState('');

  useEffect(() => {
    if (roomData) {
      setNama(roomData.nama);
    }
  }, [roomData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      await axios.put(`/api/admin/ruangan/${roomData.id}`, { nama }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Room updated successfully!', { position: 'top-center' });
      fetchData(); // Reload data after updating
      closeModal(); // Close the modal after success
    } catch (error) {
      console.error('Error updating room:', error);
      toast.error('Failed to update room!', { position: 'top-center' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-xl font-semibold mb-4">Edit Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nama Ruangan</label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRoomModal;
