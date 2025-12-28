import { FaGraduationCap } from 'react-icons/fa'

const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${smallHeight ? 'h-[250px]' : 'h-[70vh]'} flex flex-col justify-center items-center`}
    >
      {/* Animated Container */}
      <div className='relative'>
        {/* Outer rotating ring with gradient */}
        <div className='absolute inset-0 animate-spin-slow'>
          <div className='w-32 h-32 rounded-full border-4 border-transparent border-t-indigo-600 border-r-purple-600'></div>
        </div>

        {/* Inner rotating ring (opposite direction) */}
        <div className='absolute inset-0 animate-spin-reverse'>
          <div className='w-32 h-32 rounded-full border-4 border-transparent border-b-purple-600 border-l-indigo-600'></div>
        </div>

        {/* Glowing background effect */}
        <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse'></div>

        {/* Center Icon */}
        <div className='relative w-32 h-32 flex items-center justify-center'>
          <div className='bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-full shadow-lg animate-bounce-slow'>
            <FaGraduationCap className='w-8 h-8 text-white' />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className='mt-8 text-center'>
        <h3 className='text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2'>
          Loading Scholarships...
        </h3>
        <div className='flex items-center justify-center gap-1'>
          <div className='w-2 h-2 bg-indigo-600 rounded-full animate-bounce'></div>
          <div 
            className='w-2 h-2 bg-purple-600 rounded-full animate-bounce' 
            style={{ animationDelay: '0.2s' }}
          ></div>
          <div 
            className='w-2 h-2 bg-indigo-600 rounded-full animate-bounce' 
            style={{ animationDelay: '0.4s' }}
          ></div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spin-reverse {
            from {
              transform: rotate(360deg);
            }
            to {
              transform: rotate(0deg);
            }
          }

          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }

          .animate-spin-slow {
            animation: spin-slow 3s linear infinite;
          }

          .animate-spin-reverse {
            animation: spin-reverse 2.5s linear infinite;
          }

          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
        `
      }} />
    </div>
  )
}

export default LoadingSpinner