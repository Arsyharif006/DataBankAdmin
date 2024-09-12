import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
    const location = useLocation(); // Get the current location

    return (
        <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-100 to-gray-100">
            <div className="flex items-center space-x-3">
                <FaExclamationTriangle className="text-red-500 text-6xl animate-pulse" />
                <h1 className="text-8xl font-bold text-gray-800 drop-shadow-lg">404</h1>
            </div>
            <p className="text-2xl text-gray-700 mt-4 font-semibold">Ups! Halaman Tidak Ditemukan</p>
            
            {/* Display the current route path */}
            <p className="text-lg text-gray-500 mt-2">
                Rute <span className="text-red-600 font-semibold">"{location.pathname}"</span> tidak ada atau tidak tersedia.
            </p>
            
            <Link
                to="/"
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-500 hover:scale-105 transform transition duration-300"
            >
                Kembali
            </Link>
        </div>
    );
};

export default NotFound;
