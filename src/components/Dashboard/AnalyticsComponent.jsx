// src/components/Dashboard/AnalyticsComponent.jsx
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsComponent = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/admin/statistics')
      .then(res => res.json())
      .then(data => setStats(data.statistics));
  }, []);

  if (!stats) return <div className="text-center py-10">Loading analytics...</div>;

  const barData = {
    labels: stats.applicationsByUniversity.map(item => item.name),
    datasets: [{
      label: 'Applications',
      data: stats.applicationsByUniversity.map(item => item.count),
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
      borderColor: 'rgb(59, 130, 246)',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    plugins: { legend: { position: 'top' } },
    scales: { y: { beginAtZero: true } }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <p className="text-gray-400">Total Users</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <p className="text-gray-400">Total Fees Collected</p>
          <p className="text-3xl font-bold text-green-400">${stats.totalFeesCollected}</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-lg text-center">
          <p className="text-gray-400">Total Scholarships</p>
          <p className="text-3xl font-bold text-gray-900">{stats.totalScholarships}</p>
        </div>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-blue-300">Applications by University</h2>
        <Bar data={barData} options={options} />
      </div>
    </div>
  );
};

export default AnalyticsComponent;