import { useState } from 'react';
import {
  UserIcon,
  PlusIcon,
  CogIcon,
  ChartBarIcon,
  DocumentTextIcon,
  StarIcon,
  Bars3BottomLeftIcon,
  ArrowLeftOnRectangleIcon,
  HomeIcon // Home আইকন যুক্ত করা হয়েছে
} from '@heroicons/react/24/outline';
import { FaGraduationCap } from 'react-icons/fa'; // Graduation Cap আইকন

// Components
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
import useAuth from '../hooks/useAuth'; 
import { useNavigate, Link } from 'react-router-dom'; 

const DashboardLayout = () => {
  const { role, loading } = useRole();
  const { logOut, user } = useAuth(); 
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
          <div className="absolute text-purple-600 font-bold text-xs uppercase tracking-tighter">Stream</div>
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
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl transform transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        lg:translate-x-0 lg:static lg:inset-0 m-0 lg:m-4 lg:rounded-[2.5rem] border-r lg:border border-slate-200
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-lg shadow-purple-200 flex items-center justify-center text-white text-2xl">
                <FaGraduationCap />
              </div>
              <div>
                <h2 className="text-xl font-black tracking-tighter text-slate-800 leading-none">
                  Scholar<span className="text-indigo-600">Stream</span>
                </h2>
                <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-400 mt-1">
                  {role} Portal
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
            {links.map((link) => (
              <button
                key={link.section}
                onClick={() => { setActiveSection(link.section); setIsSidebarOpen(false); }}
                className={`
                  w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group
                  ${activeSection === link.section 
                    ? 'bg-slate-900 text-white shadow-2xl shadow-slate-300 scale-[1.02]' 
                    : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'}
                `}
              >
                <span className={`transition-colors ${activeSection === link.section ? 'text-indigo-400' : 'group-hover:text-indigo-600'}`}>
                  {link.icon}
                </span>
                <span className="font-bold text-sm tracking-wide">{link.name}</span>
                {activeSection === link.section && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-6 space-y-3 border-t border-slate-50">
            {/* Back to Home Button */}
            <Link
              to="/"
              className="flex items-center gap-4 w-full px-5 py-3.5 text-slate-600 font-bold text-sm bg-slate-50 hover:bg-indigo-600 hover:text-white rounded-2xl transition-all duration-300 group"
            >
              <HomeIcon className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              Back to Home
            </Link>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-4 w-full px-5 py-3.5 text-rose-500 font-bold text-sm hover:bg-rose-50 rounded-2xl transition-all duration-300"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* Header */}
        <header className="h-24 flex items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-3 bg-white shadow-xl shadow-slate-200 rounded-2xl text-slate-600 hover:text-indigo-600 transition-all"
            >
              <Bars3BottomLeftIcon className="h-6 w-6" />
            </button>
            <div>
              <h1 className="hidden lg:block text-3xl font-black text-slate-900 capitalize tracking-tight">
                {activeSection.replace('-', ' ')}
              </h1>
            </div>
          </div>

          {/* Profile Badge */}
          <div className="flex items-center gap-4 bg-white p-2 pr-5 rounded-[1.5rem] shadow-sm border border-slate-100 group transition-all duration-300">
            <div className="relative">
              {user?.photoURL ? (
                 <img src={user.photoURL} alt="profile" className="w-10 h-10 rounded-xl object-cover shadow-md group-hover:scale-105 transition-transform" />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-md">
                  {role?.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-white rounded-full"></div>
            </div>

            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-black text-slate-800 leading-tight">
                {user?.displayName || 'Scholar User'}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                {role} account
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Content View */}
        <main className="flex-1 overflow-y-auto px-6 lg:px-10 pb-10 custom-scrollbar">
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
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

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
};

export default DashboardLayout;