import { useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement,
  ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { TbFidgetSpinner, TbUsers, TbCurrencyDollar, TbSchool, TbFileText } from 'react-icons/tb';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, ArcElement, 
  PointElement, LineElement, Title, Tooltip, Legend, Filler
);

const AnalyticsComponent = () => {
  const axiosSecure = useAxiosSecure();
  const [activeTab, setActiveTab] = useState('university');

  const { data: stats, isLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin/statistics');
      return data.statistics;
    },
  });

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
      <TbFidgetSpinner className="w-12 h-12 animate-spin text-indigo-600" />
    </div>
  );

  // --- Chart Configurations ---
  const sharedOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        cornerRadius: 10,
        titleFont: { size: 14, weight: 'bold' }
      }
    },
    scales: {
      y: { grid: { display: false }, border: { display: false } },
      x: { grid: { display: false }, border: { display: false } }
    }
  };

  const universityData = {
    labels: stats.applicationsByUniversity.map(i => i.name.split(' ')[0]),
    datasets: [{
      label: 'Applications',
      data: stats.applicationsByUniversity.map(i => i.count),
      backgroundColor: 'rgba(99, 102, 241, 0.8)',
      borderRadius: 12,
      hoverBackgroundColor: '#4f46e5',
    }]
  };

  const revenueData = {
    labels: stats.monthlyRevenue.map(i => i.month),
    datasets: [{
      fill: true,
      label: 'Revenue',
      data: stats.monthlyRevenue.map(i => i.revenue),
      borderColor: '#10b981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      pointRadius: 4,
    }]
  };

  const categoryData = {
    labels: stats.applicationsByCategory.map(i => i.name),
    datasets: [{
      data: stats.applicationsByCategory.map(i => i.count),
      backgroundColor: ['#6366f1', '#ec4899', '#f59e0b', '#10b981', '#64748b'],
      borderWidth: 0,
    }]
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Insight</h1>
          <p className="text-slate-500 font-medium">Monitoring platform growth and scholarship trends</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Users', val: stats.totalUsers, icon: <TbUsers />, col: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Net Revenue', val: `$${stats.totalFeesCollected}`, icon: <TbCurrencyDollar />, col: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Scholarships', val: stats.totalScholarships, icon: <TbSchool />, col: 'text-purple-600', bg: 'bg-purple-50' },
            { label: 'Applications', val: stats.totalApplications, icon: <TbFileText />, col: 'text-rose-600', bg: 'bg-rose-50' }
          ].map((s, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
              key={idx} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className={`w-12 h-12 ${s.bg} ${s.col} rounded-2xl flex items-center justify-center text-2xl mb-4`}>
                {s.icon}
              </div>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest">{s.label}</p>
              <h2 className="text-3xl font-black text-slate-800 mt-1">{s.val}</h2>
            </motion.div>
          ))}
        </div>

        {/* Chart Card */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-slate-800">Growth Visualization</h3>
            <div className="flex bg-slate-100 p-1 rounded-2xl">
              {['university', 'category', 'revenue'].map(tab => (
                <button
                  key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 rounded-xl text-xs font-black uppercase transition-all ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-8 h-[450px]">
            {activeTab === 'university' && <Bar data={universityData} options={sharedOptions} />}
            {activeTab === 'revenue' && <Line data={revenueData} options={sharedOptions} />}
            {activeTab === 'category' && (
              <div className="h-full flex justify-center">
                <Pie data={categoryData} options={{ ...sharedOptions, plugins: { legend: { display: true, position: 'bottom' } } }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsComponent;