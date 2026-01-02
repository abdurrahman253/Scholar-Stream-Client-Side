import { Link } from 'react-router-dom'
import { 
  FaGraduationCap, 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaYoutube 
} from 'react-icons/fa'
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        {/* Main Grid: Mobile এ ১ কলাম, Tablet এ ২ কলাম, Desktop এ ৪ কলাম */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          
          {/* Logo & About Section */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <Link to="/" className="inline-block group mb-6">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-md opacity-70"></div>
                  <div className="relative bg-gradient-to-br from-indigo-600 to-purple-600 p-2.5 rounded-xl shadow-lg">
                    <FaGraduationCap className="w-6 h-6 text-gray-900" />
                  </div>
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ScholarStream
                  </span>
                  <span className="text-xs text-gray-500 tracking-wider font-medium">Find Your Future</span>
                </div>
              </div>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering students worldwide to discover and apply for scholarships that transform their educational dreams into reality.
            </p>
            {/* Social Icons - Mobile এ সেন্টারে থাকবে */}
            <div className="flex items-center gap-3 justify-center sm:justify-start">
              {[
                { icon: FaFacebookF, href: '#' },
                { icon: FaTwitter, href: '#' },
                { icon: FaLinkedinIn, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: FaYoutube, href: '#' },
              ].map(({ icon: Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-indigo-600 hover:text-gray-900 transition-all shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Mobile এ সেন্টারে থাকবে */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'All Scholarships', 'Dashboard', 'About Us', 'Contact'].map((label) => (
                <li key={label}>
                  <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm transition-all inline-flex items-center group">
                    <span className="opacity-0 group-hover:opacity-100 transition-all mr-1">→</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources - Mobile এ সেন্টারে থাকবে */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Resources</h3>
            <ul className="space-y-3">
              {['FAQ', 'Blog', 'Success Stories', 'Privacy Policy', 'Terms'].map((label) => (
                <li key={label}>
                  <Link to="/" className="text-gray-600 hover:text-indigo-600 text-sm transition-all inline-flex items-center group">
                    <span className="opacity-0 group-hover:opacity-100 transition-all mr-1">→</span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="text-center sm:text-left">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-5">Stay Connected</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-3 text-gray-600">
                <HiMail className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-sm truncate">support@scholarstream.com</span>
              </li>
              <li className="flex items-center sm:items-start justify-center sm:justify-start gap-3 text-gray-600">
                <HiLocationMarker className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="text-sm">Dhaka, Bangladesh</span>
              </li>
            </ul>

            {/* Newsletter - Mobile Optimized */}
            <div className="w-full max-w-sm mx-auto sm:mx-0">
              <form className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <button className="w-full py-2.5 bg-indigo-600 text-gray-900 font-semibold rounded-lg hover:bg-indigo-700 transition-all shadow-md">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white/50 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 order-2 md:order-1">
            © {new Date().getFullYear()} ScholarStream. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 order-1 md:order-2">
            <Link to="/" className="hover:text-indigo-600">Privacy</Link>
            <Link to="/" className="hover:text-indigo-600">Terms</Link>
            <Link to="/" className="hover:text-indigo-600">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;