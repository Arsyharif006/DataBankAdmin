import React, { useEffect, useState } from 'react';
import axios from '../api/Index';
import Cookies from 'js-cookie'; // Import js-cookie untuk mengakses cookie
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../components/Sidebar';
import Document from '../images/dokumen.pdf';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // State untuk menyimpan data dari API
  const [dashboardData, setDashboardData] = useState({
    total_students: 0,
    total_employees: 0,
    total_users: 0,
    logs_per_month: {},
  });

  // State untuk chart data
  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Request Api',
        data: Array(12).fill(0), // Inisialisasi dengan 0 untuk semua bulan
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  });

  // Fungsi untuk fetch data dari backend
  const fetchDashboardData = async () => {
    try {
      // Ambil token dari cookie
      const token = Cookies.get('auth_token'); // Sesuaikan dengan nama cookie token Anda

      // Buat request dengan header Authorization
      const response = await axios.get('/api/admin/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      
      // Update state dengan data dari API
      setDashboardData({
        total_students: data.total_students,
        total_employees: data.total_employees,
        total_users: data.total_users,
        logs_per_month: data.logs_per_month,
      });

      // Update chart data
      const newChartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Total Request Api',
            data: Array(12).fill(0), // Inisialisasi dengan 0 untuk semua bulan
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
          },
        ],
      };

      // Iterasi logs_per_month dan masukkan ke dalam chart
      Object.keys(data.logs_per_month).forEach((key) => {
        const month = parseInt(key.split('-')[1], 10) - 1; // Ambil bulan dari format YYYY-MM
        newChartData.datasets[0].data[month] = data.logs_per_month[key];
      });

      setChartData(newChartData);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // useEffect untuk memanggil API saat komponen di-mount
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

  return (
    <>
      <Sidebar/>
      <div className="container mx-auto mt-10 px-10">
        <div className="justify-start items-start mb-16">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Admin</h1>
          <p className="text-gray-500">/ dashboard-admin</p>
        </div>
        <div className="flex justify-end mb-10">
          <a 
            href={Document}  // URL file PDF di server Anda
            target="_blank" // Open in a new tab
            rel="noopener noreferrer" // Security best practice
            className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            Lihat Dokumentasi
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="text-sm text-gray-500">Total Akun</div>
            <div className="text-2xl font-bold">{dashboardData.total_users}</div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="text-sm text-gray-500">Total Data Siswa</div>
            <div className="text-2xl font-bold">{dashboardData.total_students}</div>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <div className="text-sm text-gray-500">Total Data Guru dan Staff</div>
            <div className="text-2xl font-bold">{dashboardData.total_employees}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-8">
          <div className="bg-white p-4 shadow rounded-lg">
            <Line data={chartData} options={lineChartOptions} />
            <div className="mt-2 text-sm text-gray-500">Total Request tahunan</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
