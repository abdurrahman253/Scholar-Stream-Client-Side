import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { HiOutlineX } from 'react-icons/hi'
import { FaGraduationCap } from 'react-icons/fa'
import Container from '../Container'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Auto close mobile menu on resize (when entering desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

 const navLinks = (
  <>
    <NavLink
      to="/"
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        `block w-full md:w-auto text-left px-5 py-2.5 rounded-xl font-medium transition-all ${
          isActive
            ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100' // Active Style
            : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' // Normal Style
        }`
      }
    >
      Home
    </NavLink>

    <NavLink
      to="/all-scholarships"
      onClick={() => setIsOpen(false)}
      className={({ isActive }) =>
        `block w-full md:w-auto text-left px-5 py-2.5 rounded-xl font-medium transition-all whitespace-nowrap ${
          isActive
            ? 'bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-100' // Active Style
            : 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50' // Normal Style
        }`
      }
    >
      All Scholarships
    </NavLink>
  </>
)
  return (
    <>
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 shadow-sm border-b border-gray-100">
        <div className="py-3 lg:py-4">
          <Container>
            <div className="flex items-center justify-between">
              {/* Logo - Responsive sizing */}
              <Link to="/" className="flex items-center gap-2 group">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg blur-md group-hover:blur-lg transition-all duration-500 opacity-70"></div>
                  <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-500">
                    <FaGraduationCap className="w-5 h-5 text-gray-900 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ScholarStream
                  </span>
                  <span className="hidden sm:block text-xs text-gray-500 tracking-wider">
                    Find Your Future
                  </span>
                </div>
              </Link>

              {/* Desktop & Tablet Navigation */}
              <div className="hidden md:flex items-center gap-6">
                {navLinks}
              </div>

              {/* Auth Buttons (Desktop) + Mobile Menu Toggle */}
              <div className="flex items-center gap-3">
                {/* Desktop Auth */}
                <div className="hidden md:flex items-center gap-4">
                  {user ? (
                    <div className="relative group">
                      <button className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-full px-3 py-1.5 transition-all border border-gray-200 hover:border-indigo-300">
                        <span className="text-sm font-medium text-gray-800 hidden lg:block">
                          {user.displayName || 'User'}
                        </span>
                        <img
                          src={user.photoURL || avatarImg}
                          alt="Profile"
                          className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover border-2 border-white shadow"
                          referrerPolicy="no-referrer"
                        />
                      </button>

                      {/* Dropdown */}
                      <div className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                        <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50">
                          <p className="font-semibold text-gray-900">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-600 truncate">{user.email}</p>
                        </div>
                        <div className="py-1">
                          <Link to="/dashboard" className="block px-4 py-2.5 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600">
                            Dashboard
                          </Link>
                          <button onClick={logOut} className="w-full text-left px-4 py-2.5 text-pink-600 hover:bg-red-50">
                            Logout
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                   <div className="flex items-center gap-3">
                 {/* Login Button */}
                  <Link to="/login" className="nav-auth-btn group">
                  <div className="nav-auth-inner">
                 <svg
                className="w-5 h-5 fill-indigo-400 group-hover:fill-white transition-colors"
                 viewBox="0 0 24 24"
                        >
                <path d="m15.626 11.769a6 6 0 1 0 -7.252 0 9.008 9.008 0 0 0 -5.374 8.231 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 9.008 9.008 0 0 0 -5.374-8.231zm-7.626-4.769a4 4 0 1 1 4 4 4 4 0 0 1 -4-4zm10 14h-12a1 1 0 0 1 -1-1 7 7 0 0 1 14 0 1 1 0 0 1 -1 1z" />
                  </svg>
                <span>Login</span>
                </div>
               </Link>

               {/* Register Button */}
               <Link to="/signup" className="nav-auth-btn group !bg-indigo-600">
              <div className="nav-auth-inner !bg-indigo-600 group-hover:!bg-indigo-700">
                  <span>Register</span>
                 </div>
                   </Link>
                </div>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2.5 rounded-lg hover:bg-gray-100 transition"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <HiOutlineX className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </Container>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-80 max-w-[90vw] bg-white shadow-2xl z-50 transform transition-transform duration-400 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b">
            <h3 className="text-xl font-bold text-gray-900">Menu</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Close menu"
            >
              <HiOutlineX className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
            {navLinks}

            {user ? (
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={user.photoURL || avatarImg}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-4 border-indigo-100 shadow-lg object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{user.displayName || 'User'}</p>
                    <p className="text-sm text-gray-600 truncate max-w-[200px]">{user.email}</p>
                  </div>
                </div>
               <NavLink 
                 to="/dashboard" 
                 className={({ isActive }) => 
                 `block px-4 py-2.5 transition-all ${
                  isActive ? 'bg-indigo-50 text-indigo-600 font-bold' : 'text-gray-700 hover:bg-indigo-50'
                   }`
                     }
                  >
                  Dashboard
               </NavLink>
                <button
                  onClick={() => {
                    logOut()
                    setIsOpen(false)
                  }}
                  className="w-full py-4 text-pink-600 font-semibold hover:bg-red-50 rounded-xl transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="mt-8 pt-6 border-t space-y-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-gray-900 font-bold rounded-xl shadow-lg hover:shadow-xl transition"
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Spacer to prevent content jump */}
      <div className="h-16 md:h-20" />
    </>
  )
}

export default Navbar