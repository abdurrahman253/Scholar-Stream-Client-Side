// src/components/Navbar/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import { 
  LayoutDashboard, 
  LogOut, 
  Home, 
  GraduationCap, 
  Menu, 
  X, 
  UserCircle,
  LogIn,
  UserPlus
} from 'lucide-react'; 
import Container from '../Container';
import useAuth from '../../../hooks/useAuth';


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinkClasses = ({ isActive }) =>
    `block w-full md:w-auto px-6 py-3 rounded-xl font-bold transition-all duration-300 text-left
    ${isActive
      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200 scale-[1.02]'
      : 'text-gray-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600 hover:shadow-md hover:scale-[1.02]'
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-md transition-all duration-500">
        <div className="py-4 lg:py-5">
          <Container>
            <div className="flex items-center justify-between">

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <FaGraduationCap className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Scholar<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Stream</span>
                  </h1>
                  <p className="hidden sm:block text-xs font-bold text-indigo-600 tracking-widest uppercase">
                    Empowering Dreams
                  </p>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-2">
                <NavLink to="/" className={navLinkClasses}>Home</NavLink>
                <NavLink to="/all-scholarships" className={navLinkClasses}>All Scholarships</NavLink>
              </nav>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-4">
                  {user ? (
                    <div className="relative group">
                      <button className="relative group/avatar">
                        <img
                          src={user.photoURL || avatarImg}
                          alt="Profile"
                          className="w-11 h-11 rounded-full object-cover ring-4 ring-indigo-100 group-hover/avatar:ring-indigo-300 shadow-lg group-hover/avatar:shadow-xl transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full ring-2 ring-white shadow-md"></span>
                      </button>

                      {/* Desktop Dropdown */}
                      <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border-2 border-indigo-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2">
                        <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50 border-b border-indigo-100">
                          <p className="font-bold text-gray-900">{user.displayName || 'Learner'}</p>
                          <p className="text-sm text-indigo-600 truncate">{user.email}</p>
                        </div>
                        <div className="p-3 space-y-1">
                          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
                            <LayoutDashboard size={18} className="text-indigo-500" />
                            <span>My Dashboard</span>
                          </Link>
                          <button onClick={logOut} className="w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg font-semibold text-rose-600 hover:bg-rose-50 transition-all duration-200">
                            <LogOut size={18} />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Link to="/login" className="px-6 py-2.5 font-bold text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-105">
                        Login
                      </Link>
                      <Link to="/signup" className="relative px-7 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden group">
                        <span className="relative z-10">Register</span>
                      </Link>
                    </div>
                  )}
                </div>

                {/* Mobile Toggle */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden relative p-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-300 group"
                >
                  <div className="relative w-6 h-6">
                    {isOpen ? (
                      <X className="w-6 h-6 text-indigo-600 transition-transform duration-300 rotate-90" />
                    ) : (
                      <Menu className="w-6 h-6 text-indigo-600 transition-transform duration-300 group-hover:scale-110" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          </Container>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-80 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-2xl shadow-2xl z-50 transform transition-all duration-500 ease-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="relative p-6 border-b border-indigo-100 bg-gradient-to-r from-indigo-500/5 to-purple-500/5">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-900">Menu</h2>
                <p className="text-xs text-indigo-600 font-semibold mt-0.5">Navigate your journey</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-2.5 rounded-xl bg-white hover:bg-indigo-50 border-2 border-indigo-100 hover:border-indigo-300 transition-all duration-300 group"
              >
                <X className="w-6 h-6 text-indigo-600 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={navLinkClasses}>
              <span className="flex items-center gap-3">
                <Home size={18} />
                <span>Home</span>
              </span>
            </NavLink>
            <NavLink to="/all-scholarships" onClick={() => setIsOpen(false)} className={navLinkClasses}>
              <span className="flex items-center gap-3">
                <GraduationCap size={18} />
                <span>All Scholarships</span>
              </span>
            </NavLink>

            <div className="pt-6 border-t border-indigo-100 space-y-4 mt-4">
              {user ? (
                <>
                  <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                          src={user.photoURL || avatarImg} 
                          className="w-14 h-14 rounded-full ring-4 ring-white shadow-lg object-cover" 
                          alt="Profile" 
                        />
                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full ring-2 ring-white"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-white truncate">{user.displayName || 'Learner'}</p>
                        <p className="text-xs text-indigo-100 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className={navLinkClasses}>
                    <span className="flex items-center gap-3">
                      <LayoutDashboard size={18} />
                      <span>My Dashboard</span>
                    </span>
                  </NavLink>
                  
                  <button 
                    onClick={() => { logOut(); setIsOpen(false); }} 
                    className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-3">
                  <Link 
                    to="/login" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-indigo-300 rounded-xl font-bold text-indigo-600 transition-all duration-300"
                  >
                    <LogIn size={18} /> Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsOpen(false)} 
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300"
                  >
                    <UserPlus size={18} /> Register
                  </Link>
                </div>
              )}
            </div>
          </nav>
          
          <div className="p-6 border-t border-indigo-100 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 text-center">
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-500">
              <FaGraduationCap className="text-indigo-600" />
              <span>ScholarStream © 2026</span>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)} 
          className="fixed inset-0 bg-gradient-to-br from-black/60 via-indigo-900/30 to-purple-900/30 backdrop-blur-md z-40 md:hidden"
        />
      )}

      <div className="h-20 lg:h-24" />
    </>
  );
};

export default Navbar;