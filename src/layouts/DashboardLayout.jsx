import { useState } from 'react';
import {
  UserIcon,
  PlusIcon,
  CogIcon,
  ChartBarIcon,
  DocumentTextIcon,
  StarIcon,
  Bars3BottomLeftIcon, // Premium looking icon
  XMarkIcon,
  ArrowLeftOnRectangleIcon // Logout icon
} from '@heroicons/react/24/outline';

// Components (Keep your imports as they are)
import ProfileComponent from '../components/Dashboard/ProfileComponent';
import AddScholarshipForm from '../components/Dashboard/AddScholarshipForm';
import ManageScholarshipsTable from '../components/Dashboard/ManageScholarshipsTable';
import ManageUsersTable from '../components/Dashboard/ManageUsersTable';
import AnalyticsComponent from '../components/Dashboard/AnalyticsComponent';
import ManageApplicationsTable from '../components/Dashboard/ManageApplicationsTable';
import AllReviewsTable from '../components/Dashboard/AllReviewsTable';
import MyApplicationsTable from '../components/Dashboard/MyApplicationsTable';
import MyReviewsTable from '../components/Dashboard/MyReviewsTable';
import useRole from '../hooks/useRole';
import { NavLink } from 'react-router';
import useAuth from '../hooks/useAuth'; 
import { useNavigate } from 'react-router-dom'; 

const DashboardLayout = () => {
  const { role, loading } = useRole();
  const { logOut } = useAuth(); 
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);




  const handleSignOut = async () => {
    try {
      await logOut();
      navigate('/'); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };




  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute text-purple-600 font-bold text-xs">GO</div>
        </div>
      </div>
    );
  }

  const menuLinks = {
    admin: [
      { name: 'Profile', section: 'profile', icon: <UserIcon className="h-5 w-5" /> },
      { name: 'Add Scholarship', section: 'add-scholarship', icon: <PlusIcon className="h-5 w-5" /> },
      { name: 'Scholarships', section: 'manage-scholarships', icon: <CogIcon className="h-5 w-5" /> },
      { name: 'Users', section: 'manage-users', icon: <UserIcon className="h-5 w-5" /> },
      { name: 'Analytics', section: 'analytics', icon: <ChartBarIcon className="h-5 w-5" /> },
    ],
    moderator: [
      { name: 'Profile', section: 'profile', icon: <UserIcon className="h-5 w-5" /> },
      { name: 'Applications', section: 'manage-applications', icon: <DocumentTextIcon className="h-5 w-5" /> },
      { name: 'Reviews', section: 'all-reviews', icon: <StarIcon className="h-5 w-5" /> },
    ],
    student: [
      { name: 'Profile', section: 'profile', icon: <UserIcon className="h-5 w-5" /> },
      { name: 'My Applications', section: 'my-applications', icon: <DocumentTextIcon className="h-5 w-5" /> },
      { name: 'My Reviews', section: 'my-reviews', icon: <StarIcon className="h-5 w-5" /> },
    ]
  };

  const links = menuLinks[role] || menuLinks.student;

  return (
    <div className="flex h-screen bg-[#F1F5F9] text-slate-800 font-sans overflow-hidden">
      
      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        lg:translate-x-0 lg:static lg:inset-0 m-0 lg:m-4 lg:rounded-3xl border-r lg:border border-slate-200
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-xl shadow-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <h2 className="text-xl font-black tracking-tight text-slate-800">
                Uni<span className="text-purple-600">Grant</span>
              </h2>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 ml-1">
              {role} Panel
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-1">
            {links.map((link) => (
              <button
                key={link.section}
                onClick={() => { setActiveSection(link.section); setIsSidebarOpen(false); }}
                className={`
                  w-full flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 group
                  ${activeSection === link.section 
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-purple-600'}
                `}
              >
                <span className={`${activeSection === link.section ? 'text-purple-400' : 'group-hover:text-purple-600'}`}>
                  {link.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">{link.name}</span>
                {activeSection === link.section && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-slate-100">
            <button
            onClick={handleSignOut}
             className="flex items-center gap-4 w-full px-5 py-3 text-red-500 font-bold text-sm hover:bg-red-50 rounded-2xl transition-all">
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Header Navigation (Mobile & Desktop Header) */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 bg-transparent">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-white shadow-md rounded-2xl text-slate-600 hover:text-purple-600 transition-colors"
            >
              <Bars3BottomLeftIcon className="h-6 w-6" />
            </button>
            <h1 className="hidden lg:block text-2xl font-black text-slate-800 capitalize">
              {activeSection.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-3 bg-white p-1.5 pr-4 rounded-2xl shadow-sm border border-slate-100">
            <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 font-bold text-sm">
              {role.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-bold text-slate-700 hidden sm:block">Admin Account</span>
          </div>
        </header>

        {/* Dynamic Content View */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 custom-scrollbar">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            {activeSection === 'profile' && <ProfileComponent />}
            {activeSection === 'add-scholarship' && <AddScholarshipForm />}
            {activeSection === 'manage-scholarships' && <ManageScholarshipsTable />}
            {activeSection === 'manage-users' && <ManageUsersTable />}
            {activeSection === 'analytics' && <AnalyticsComponent />}
            {activeSection === 'manage-applications' && <ManageApplicationsTable />}
            {activeSection === 'all-reviews' && <AllReviewsTable />}
            {activeSection === 'my-applications' && <MyApplicationsTable />}
            {activeSection === 'my-reviews' && <MyReviewsTable />}
          </div>
        </main>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;