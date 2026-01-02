import { useNavigate } from 'react-router'
import { HiHome, HiArrowLeft } from 'react-icons/hi'
import { FaGraduationCap } from 'react-icons/fa'
import { useEffect } from 'react'

const ErrorPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12'>
      <div className='max-w-2xl w-full'>
        {/* Animated 404 with Gradient */}
        <div className='text-center mb-8'>
          <div className='relative inline-block'>
            {/* Glowing background effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 blur-3xl opacity-20 animate-pulse'></div>
            
            {/* 404 Text */}
            <h1 className='relative text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              404
            </h1>
          </div>
        </div>

        {/* Content Card */}
        <div className='bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8 md:p-12'>
          {/* Icon */}
          <div className='flex justify-center mb-6'>
            <div className='relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-75 animate-pulse'></div>
              <div className='relative bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-full shadow-lg'>
                <FaGraduationCap className='w-12 h-12 text-gray-900' />
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4'>
            Oops! Page Not Found
          </h2>

          {/* Description */}
          <p className='text-gray-600 text-center mb-8 text-lg leading-relaxed'>
            The scholarship page you're looking for seems to have graduated early. 
            Don't worry, we'll help you find your way back!
          </p>

          {/* Decorative divider */}
          <div className='flex items-center justify-center gap-2 mb-8'>
            <div className='h-px w-16 bg-gradient-to-r from-transparent to-gray-300'></div>
            <div className='w-2 h-2 rounded-full bg-indigo-600'></div>
            <div className='h-px w-16 bg-gradient-to-l from-transparent to-gray-300'></div>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
            <button
              onClick={() => navigate(-1)}
              className='group flex items-center justify-center gap-2 px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all duration-300 shadow-sm hover:shadow-md font-medium w-full sm:w-auto'
            >
              <HiArrowLeft className='w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300' />
              <span>Go Back</span>
            </button>

            <button
              onClick={() => navigate('/')}
              className='group flex items-center justify-center gap-2 px-6 py-3 text-gray-900 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl font-medium w-full sm:w-auto'
            >
              <HiHome className='w-5 h-5 group-hover:scale-110 transition-transform duration-300' />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Helpful Links */}
          <div className='mt-10 pt-8 border-t border-gray-200'>
            <p className='text-sm text-gray-500 text-center mb-4'>
              Or explore these helpful links:
            </p>
            <div className='flex flex-wrap items-center justify-center gap-4 text-sm'>
              <button
                onClick={() => navigate('/all-scholarships')}
                className='text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors'
              >
                All Scholarships
              </button>
              <span className='text-gray-300'>•</span>
              <button
                onClick={() => navigate('/dashboard')}
                className='text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors'
              >
                Dashboard
              </button>
              <span className='text-gray-300'>•</span>
              <button
                onClick={() => navigate('/contact')}
                className='text-indigo-600 hover:text-indigo-700 font-medium hover:underline transition-colors'
              >
                Contact Support
              </button>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className='mt-8 flex items-center justify-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-indigo-400 animate-bounce'></div>
          <div className='w-2 h-2 rounded-full bg-purple-400 animate-bounce' style={{ animationDelay: '0.2s' }}></div>
          <div className='w-2 h-2 rounded-full bg-pink-400 animate-bounce' style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage