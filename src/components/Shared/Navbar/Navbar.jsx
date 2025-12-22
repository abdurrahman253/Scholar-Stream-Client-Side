import { useState } from 'react'
import { Link } from 'react-router'
import { AiOutlineMenu } from 'react-icons/ai'
import { HiOutlineX } from 'react-icons/hi'
import { FaGraduationCap } from 'react-icons/fa'
import Container from '../Container'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = (
    <>
      <Link
        to='/'
        className='text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-indigo-50'
      >
        Home
      </Link>
      <Link
        to='/all-scholarships'
        className='text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-indigo-50'
      >
        All Scholarships
      </Link>
    </>
  )

  return (
    <div className='fixed w-full bg-white/70 backdrop-blur-lg z-50 shadow-sm border-b border-gray-200/50'>
      <div className='py-3'>
        <Container>
          <div className='flex items-center justify-between'>
            {/* Logo */}
            <Link to='/' className='flex-shrink-0 group'>
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  {/* Gradient Background Circle */}
                  <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-75'></div>
                  {/* Icon Container */}
                  <div className='relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300'>
                    <FaGraduationCap className='w-6 h-6 text-white' />
                  </div>
                </div>
                <div className='flex flex-col'>
                  <span className='text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                    ScholarStream
                  </span>
                  <span className='text-[10px] text-gray-500 -mt-1 tracking-wide'>
                    Find Your Future
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation Links - Center */}
            <div className='hidden lg:flex items-center space-x-1'>
              {navLinks}
            </div>

            {/* Right Side - Auth Buttons/Profile */}
            <div className='flex items-center gap-4'>
              {/* Desktop Auth Section */}
              <div className='hidden lg:flex items-center gap-3'>
                {user ? (
                  // Logged In User - Profile Dropdown
                  <div className='relative'>
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className='flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-full pl-3 pr-2 py-1.5 transition-all duration-200 border border-gray-200 hover:border-gray-300'
                    >
                      <span className='text-sm font-medium text-gray-700 hidden xl:block'>
                        {user.displayName || 'User'}
                      </span>
                      <img
                        className='rounded-full w-9 h-9 object-cover border-2 border-white shadow-sm'
                        referrerPolicy='no-referrer'
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt='profile'
                      />
                    </div>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className='absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50'>
                        <div className='px-4 py-3 border-b border-gray-200 bg-gray-50'>
                          <p className='text-sm font-semibold text-gray-900'>
                            {user.displayName || 'User'}
                          </p>
                          <p className='text-xs text-gray-500 mt-0.5 truncate'>
                            {user.email}
                          </p>
                        </div>
                        <div className='py-1'>
                          <Link
                            to='/dashboard'
                            className='block px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150'
                            onClick={() => setIsOpen(false)}
                          >
                            Dashboard
                          </Link>
                          <button
                            onClick={() => {
                              logOut()
                              setIsOpen(false)
                            }}
                            className='w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150'
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  // Not Logged In - Login & Register Buttons
                  <>
                    <Link
                      to='/login'
                      className='px-5 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-indigo-50'
                    >
                      Login
                    </Link>
                    <Link
                      to='/signup'
                      className='px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200'
              >
                {isOpen ? (
                  <HiOutlineX className='w-6 h-6 text-gray-700' />
                ) : (
                  <AiOutlineMenu className='w-6 h-6 text-gray-700' />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className='lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white/95 -mx-4 px-4 rounded-b-lg'>
              <div className='flex flex-col space-y-1'>
                {navLinks}
                
                {user ? (
                  <>
                    <div className='flex items-center gap-3 px-3 py-3 bg-gray-50 rounded-lg mt-3'>
                      <img
                        className='rounded-full w-10 h-10 object-cover border-2 border-gray-200'
                        referrerPolicy='no-referrer'
                        src={user && user.photoURL ? user.photoURL : avatarImg}
                        alt='profile'
                      />
                      <div>
                        <p className='text-sm font-semibold text-gray-900'>
                          {user.displayName || 'User'}
                        </p>
                        <p className='text-xs text-gray-500 truncate'>
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <Link
                      to='/dashboard'
                      className='text-gray-700 hover:text-indigo-600 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-indigo-50'
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        logOut()
                        setIsOpen(false)
                      }}
                      className='text-left text-red-600 hover:text-red-700 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-red-50'
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <div className='flex flex-col gap-2 mt-3'>
                    <Link
                      to='/login'
                      className='text-center px-5 py-2.5 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 rounded-lg hover:bg-indigo-50 border border-gray-200'
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to='/signup'
                      className='text-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200 shadow-md'
                      onClick={() => setIsOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </Container>
      </div>

      {/* Backdrop for mobile menu */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-white/70  bg-opacity-20 backdrop-blur-sm lg:hidden -z-10'
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

export default Navbar