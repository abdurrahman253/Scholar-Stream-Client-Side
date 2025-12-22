import { Link } from 'react-router'
import { FaGraduationCap, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className='bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200'>
      {/* Main Footer Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
          
          {/* Logo & About Section */}
          <div className='lg:col-span-1'>
            <Link to='/' className='inline-block group mb-4'>
              <div className='flex items-center gap-2'>
                <div className='relative'>
                  <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-75'></div>
                  <div className='relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg'>
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
            <p className='text-gray-600 text-sm leading-relaxed mb-4'>
              Empowering students worldwide to discover and apply for scholarships that transform their educational dreams into reality.
            </p>
            
            {/* Social Media Links */}
            <div className='flex items-center gap-3'>
              <a 
                href='https://facebook.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-9 h-9 rounded-full bg-white hover:bg-indigo-600 border border-gray-200 hover:border-indigo-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md'
              >
                <FaFacebookF className='w-4 h-4' />
              </a>
              <a 
                href='https://twitter.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-9 h-9 rounded-full bg-white hover:bg-indigo-600 border border-gray-200 hover:border-indigo-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md'
              >
                <FaTwitter className='w-4 h-4' />
              </a>
              <a 
                href='https://linkedin.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-9 h-9 rounded-full bg-white hover:bg-indigo-600 border border-gray-200 hover:border-indigo-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md'
              >
                <FaLinkedinIn className='w-4 h-4' />
              </a>
              <a 
                href='https://instagram.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-9 h-9 rounded-full bg-white hover:bg-indigo-600 border border-gray-200 hover:border-indigo-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md'
              >
                <FaInstagram className='w-4 h-4' />
              </a>
              <a 
                href='https://youtube.com' 
                target='_blank' 
                rel='noopener noreferrer'
                className='w-9 h-9 rounded-full bg-white hover:bg-indigo-600 border border-gray-200 hover:border-indigo-600 flex items-center justify-center text-gray-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md'
              >
                <FaYoutube className='w-4 h-4' />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className='text-gray-900 font-semibold text-lg mb-4'>Quick Links</h3>
            <ul className='space-y-3'>
              <li>
                <Link to='/' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/all-scholarships' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  All Scholarships
                </Link>
              </li>
              <li>
                <Link to='/dashboard' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to='/about' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  About Us
                </Link>
              </li>
              <li>
                <Link to='/contact' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className='text-gray-900 font-semibold text-lg mb-4'>Resources</h3>
            <ul className='space-y-3'>
              <li>
                <Link to='/faq' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to='/blog' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  Blog
                </Link>
              </li>
              <li>
                <Link to='/success-stories' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  Success Stories
                </Link>
              </li>
              <li>
                <Link to='/privacy' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to='/terms' className='text-gray-600 hover:text-indigo-600 text-sm transition-colors duration-200 inline-block hover:translate-x-1 transform'>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className='text-gray-900 font-semibold text-lg mb-4'>Contact Us</h3>
            <ul className='space-y-3'>
              <li className='flex items-start gap-3 text-gray-600 text-sm'>
                <HiMail className='w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5' />
                <a href='mailto:support@scholarstream.com' className='hover:text-indigo-600 transition-colors'>
                  support@scholarstream.com
                </a>
              </li>
              <li className='flex items-start gap-3 text-gray-600 text-sm'>
                <HiPhone className='w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5' />
                <a href='tel:+1234567890' className='hover:text-indigo-600 transition-colors'>
                  +1 (234) 567-890
                </a>
              </li>
              <li className='flex items-start gap-3 text-gray-600 text-sm'>
                <HiLocationMarker className='w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5' />
                <span>
                  123 Education Street,<br />
                  Dhaka, Bangladesh
                </span>
              </li>
            </ul>

            {/* Newsletter (Optional) */}
            <div className='mt-6'>
              <p className='text-sm text-gray-600 mb-2'>Subscribe to our newsletter</p>
              <div className='flex gap-2'>
                <input 
                  type='email' 
                  placeholder='Your email' 
                  className='flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
                />
                <button className='px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className='border-t border-gray-200 bg-white/50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-gray-600 text-center md:text-left'>
              © {new Date().getFullYear()} ScholarStream. All rights reserved.
            </p>
            <div className='flex items-center gap-6 text-sm text-gray-600'>
              <Link to='/privacy' className='hover:text-indigo-600 transition-colors'>
                Privacy
              </Link>
              <Link to='/terms' className='hover:text-indigo-600 transition-colors'>
                Terms
              </Link>
              <Link to='/cookies' className='hover:text-indigo-600 transition-colors'>
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer