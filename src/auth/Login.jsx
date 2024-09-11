  import React, { useState } from 'react';
  import api from '../api/Index';
  import Cookies from 'js-cookie';
  import { useNavigate } from 'react-router-dom';
  import { toast, Toaster } from 'react-hot-toast';
  import backgroundImage from '../images/sknicgambar.jpg';
  import sknc from '../images/sknic.png'

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

        Cookies.set('token', response.data.token);

        toast.success('Berhasil Login!');

        navigate('/dashboard-admin');
      } catch (err) {
        setError('Username atau Password salah.');
      }
    };

    return (
      <div
      className="flex items-center justify-end h-screen w-screen bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`, // Set your background image here
      }}
      >
    {/* Top Logo */}
    <div className="absolute top-0 left-10 mt-10 mr-4">
      <div className='flex'>
      <img src={sknc} className="h-16 w-14 mr-4" alt="Logo Top" />
      <h1 className="text-2xl font-bold text-white mb-2">Bank Data <br /> SMKN 1 Ciomas</h1>
      </div>
    </div>

    {/* Centered Logo */}
    <div className="flex justify-center items-center m-auto">
      <img src={sknc} className="h-60 w-52" alt="Logo Centered" />
    </div>
        <Toaster /> 
        <div className="bg-white p-8 shadow-lg w-full max-w-[110vh] rounded-tl-[7vh] rounded-bl-[7vh] h-full">
        <div className="flex flex-col items-center space-y-5 mb-10 mt-32">
    <div className="w-[50vh]">
      <h2 className="text-3xl font-bold text-gray-800 text-left">Masuk</h2>
      <p className='text-gray-600 font-normal font-poppins mt-10'>Akses akun Anda sekarang.</p>
    </div>

    {error && <p className="text-red-500">{error}</p>}    

    <div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-[50vh] px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
      />
    </div>

    <div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-[50vh] px-4 py-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-gray-700"
      />
    </div>

    <div className="flex items-center justify-center">
      <button
        className="w-[50vh] py-2 text-white bg-gray-800 rounded hover:bg-gray-500 focus:outline-none"
        onClick={handleLogin}
      >
        MASUK
      </button>
    </div>
  </div>


          <div className='flex items-center justify-center'>
            <p className='text-sm font-normal'>© 2024 SMKN 1 Ciomas. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  };

  export default Login;
