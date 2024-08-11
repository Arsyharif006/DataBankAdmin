import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from '../components/Sidebar';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const totalDataChartData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Data Guru dan Siswa',
        data: [120, 150, 180, 200, 220, 240, 260, 280, 300],
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
      },
    ],
  };

  const akunGuruChartData = {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [
      {
        label: 'Total Akun Guru',
        data: [15, 20, 25, 30, 35, 40, 45],
        backgroundColor: 'rgb(75, 192, 192)',
      },
    ],
  };

  const dataEkstrakulikulerChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Data Ekstrakurikuler',
        data: [50, 60, 70, 80, 90, 100, 110, 120, 130],
        borderColor: 'rgb(192, 75, 192)',
        fill: false,
      },
    ],
  };

  const dataMataPelajaranChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Data Mata Pelajaran',
        data: [5, 10, 15, 20, 25, 30, 35, 40, 45],
        borderColor: 'rgb(192, 75, 75)',
        fill: false,
      },
    ],
  };

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
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Akun Guru',
      },
    },
  };

  return (
    <>
                <Sidebar/>
    <div className="container mx-auto mt-10 px-10">
          <div className="justify-start items-start mb-16">
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard Admin</h1>
          <p className='text-gray-500'>/ dashboard</p>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="text-sm text-gray-500">Total Akun Guru</div>
          <div className="text-2xl font-bold">45</div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="text-sm text-gray-500">Total Client</div>
          <div className="text-2xl font-bold">150</div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="text-sm text-gray-500">Total Data Guru dan Siswa</div>
          <div className="text-2xl font-bold">300</div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <div className="text-sm text-gray-500">Total Data Ekstrakulikuler</div>
          <div className="text-2xl font-bold">130</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div className="bg-white p-4 shadow rounded-lg">
          <Bar data={akunGuruChartData} options={barChartOptions} />
          <div className="mt-2 text-sm text-gray-500">Akun Guru Per Hari</div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <Line data={totalDataChartData} options={lineChartOptions} />
          <div className="mt-2 text-sm text-gray-500">Total Data Guru dan Siswa per Bulan</div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <Line data={dataEkstrakulikulerChartData} options={lineChartOptions} />
          <div className="mt-2 text-sm text-gray-500">Data Ekstrakulikuler per Bulan</div>
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <Line data={dataMataPelajaranChartData} options={lineChartOptions} />
          <div className="mt-2 text-sm text-gray-500">Data Mata Pelajaran per Bulan</div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Dashboard;
