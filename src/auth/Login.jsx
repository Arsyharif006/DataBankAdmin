import React, { useState } from 'react';
import api from '../api/Index';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'; // Import react-hot-toast

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/api/login', {
        username,
        password,
      });

      // Simpan token dalam cookie
      Cookies.set('token', response.data.token);

      // Tampilkan notifikasi berhasil login
      toast.success('Berhasil Login!');

      // Arahkan ke halaman dashboard
      navigate('/dashboard-admin');
    } catch (err) {
      setError('Username atau Password salah.');
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage: "",
      }}
    >
      <Toaster /> 
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <img
            src=""
            className="w-12 h-12"
          />
          <h2 className="text-xl font-bold text-gray-800">Admin Master</h2>
        </div>
        <hr className='border-2' />
        <div className="space-y-5 mb-10 mt-10">
          {error && <p className="text-red-500">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
          />
          <div className='flex items-center justify-center'>
            <button
              className="w-36 py-2 text-white bg-gray-800 rounded hover:bg-gray-500 focus:outline-none"
              onClick={handleLogin}
            >
              MASUK
            </button>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <p className='text-sm font-normal'>© 2024 SMKN 1 Ciomas. All rights reserved. </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
