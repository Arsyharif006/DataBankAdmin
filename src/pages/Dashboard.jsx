import React, { useEffect, useState, useRef } from 'react';
import axios from '../api/Index';
import Cookies from 'js-cookie';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../components/Sidebar';
import Document from '../images/dokumen.pdf';
import { IoMdDownload } from 'react-icons/io'; // Import the download icon

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total_students: 0,
    total_employees: 0,
    total_users: 0,
    logs_per_month: {},
  });

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Request Api',
        data: Array(12).fill(0),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  });

  const fetchDashboardData = async () => {
    try {
      const token = Cookies.get('auth_token');
      const response = await axios.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;

      setDashboardData({
        total_students: data.total_students,
        total_employees: data.total_employees,
        total_users: data.total_users,
        logs_per_month: data.logs_per_month,
      });

      const newChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Total Request Api',
            data: Array(12).fill(0),
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
          },
        ],
      };

      Object.keys(data.logs_per_month).forEach((key) => {
        const month = parseInt(key.split('-')[1], 10) - 1;
        newChartData.datasets[0].data[month] = data.logs_per_month[key];
      });

      setChartData(newChartData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Data Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const downloadLink = useRef(null); // Reference for download link

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleDownload = (url, filename) => {
    // Programmatically trigger download
    const link = downloadLink.current;
    link.href = url;
    link.download = filename;
    link.click();

    setDropdownOpen(false); // Close dropdown after download
  };

  return (
    <>
      <Sidebar />
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-start items-start mb-16">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-500">/ dashboard-admin</p>
        </div>
        <div className="flex justify-end mb-10 space-x-2">
          <a
            href={Document}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Lihat Dokumentasi
          </a>
          <div className="relative">
            <button
              onClick={handleDropdownToggle}
              className="inline-flex items-center bg-green-600 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 transition-colors"
            >
              <IoMdDownload className="mr-2" /> Unduh Template
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
                <button
                  onClick={() => handleDownload('/path/to/student-template.xlsx')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Unduh Template Data Siswa
                </button>
                <button
                  onClick={() => handleDownload('/path/to/teacher-template.xlsx')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Unduh Template Data Guru/Staff
                </button>
                <button
                  onClick={() => handleDownload('/path/to/major-template.xlsx')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Unduh Template Data Mata Pelajaran
                </button>
                <button
                  onClick={() => handleDownload('/path/to/major-template.xlsx')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Unduh Template Data Ekstrakulikuler
                </button>
                <button
                  onClick={() => handleDownload('/path/to/major-template.xlsx')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Unduh Template Data Ruangan
                </button>
                <button
                  onClick={() => handleDownload('/path/to/major-template.xlsx')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Unduh Template Data Jurusan
                </button>
                <button
                  onClick={() => handleDownload('/path/to/major-template.xlsx')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Unduh Template Data Kelas
                </button>
              </div>
            )}
            <a ref={downloadLink} style={{ display: 'none' }} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-gray-200 p-4 shadow rounded-lg">
            <div className="text-sm text-gray-500">Total Akun</div>
            <div className="text-2xl font-bold">{dashboardData.total_users}</div>
          </div>
          <div className="bg-gray-200 p-4 shadow rounded-lg">
            <div className="text-sm text-gray-500">Total Data Siswa</div>
            <div className="text-2xl font-bold">{dashboardData.total_students}</div>
          </div>
          <div className="bg-gray-200 p-4 shadow rounded-lg">
            <div className="text-sm text-gray-500">Total Data Guru dan Staff</div>
            <div className="text-2xl font-bold">{dashboardData.total_employees}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-8">
          <div className="bg-gray-100 p-4 shadow rounded-lg">
            <Line data={chartData} options={lineChartOptions} />
            <div className="mt-2 text-sm text-gray-500">Total Request tahunan</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
