import { Link } from 'react-router'
import { FaSearch, FaGraduationCap, FaAward, FaGlobe, FaChartLine, FaQuoteLeft, FaStar } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCards, Autoplay } from 'swiper/modules'
import { useEffect, useState } from 'react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-cards'

const testimonials = [
  {
    name: "Maddie C.",
    image: "https://i.postimg.cc/PxW374Kn/Maddie-C.webp",
    scholarship: "Stanford - Engineering",
    amount: "$45,000",
    review: "ScholarStream made my scholarship search so much easier. I found the perfect opportunity and got accepted!",
    rating: 5
  },
  {
    name: "Nour I.",
    image: "https://i.postimg.cc/9FnpJKVs/Nour-I.webp",
    scholarship: "MIT - Computer Science",
    amount: "$52,000",
    review: "Amazing platform! The filtering options helped me find exactly what I was looking for.",
    rating: 5
  },
  {
    name: "Aaron H.",
    image: "https://i.postimg.cc/fWHjRp3L/Aaron-H.webp",
    scholarship: "Yale - Business",
    amount: "$48,000",
    review: "I couldn't believe how many scholarships matched my profile. Highly recommend!",
    rating: 5
  },
  {
    name: "Collin L.",
    image: "https://i.postimg.cc/k4T8DRgw/Collin-L.webp",
    scholarship: "Oxford - Medicine",
    amount: "$55,000",
    review: "The application tracking feature is incredible. It kept me organized throughout the process.",
    rating: 5
  },
  {
    name: "Krrisha P.",
    image: "https://i.postimg.cc/8P2vFSNm/Krrisha-P.webp",
    scholarship: "Cambridge - Law",
    amount: "$50,000",
    review: "This platform changed my life! I'm now studying at my dream university.",
    rating: 5
  },
  {
    name: "Matteo P.",
    image: "https://i.postimg.cc/CKNn6nk5/Matteo-P.webp",
    scholarship: "Princeton - Physics",
    amount: "$47,000",
    review: "User-friendly interface and excellent scholarship matches. Five stars!",
    rating: 5
  },
  {
    name: "Tyrese B.",
    image: "https://i.postimg.cc/FsLdXB3J/Tyrese-B.webp",
    scholarship: "Columbia - Arts",
    amount: "$43,000",
    review: "Found multiple scholarships in just one week. The search filters are amazing!",
    rating: 5
  },
  {
    name: "Gella H.",
    image: "https://i.postimg.cc/XJqqHHnq/Gella-H.webp",
    scholarship: "UCLA - Psychology",
    amount: "$40,000",
    review: "ScholarStream connected me with opportunities I never knew existed. Thank you!",
    rating: 5
  },
  {
    name: "Nour S.",
    image: "https://i.postimg.cc/LhKssmL1/Nour-S.webp",
    scholarship: "Berkeley - Environmental Science",
    amount: "$46,000",
    review: "The best scholarship platform out there. Simple, effective, and results-driven!",
    rating: 5
  },
  {
    name: "Veda K.",
    image: "https://i.postimg.cc/66DVZRhM/Veda-K.webp",
    scholarship: "Cornell - Architecture",
    amount: "$49,000",
    review: "I'm so grateful for this platform. It made my dreams come true!",
    rating: 5
  }
]

// Custom hook for animated counter
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.ceil(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [end, duration])

  return count
}

const Banner = () => {
  const scholarships = useCounter(5000, 1400)
  const countries = useCounter(150, 1100)
  const success = useCounter(99, 900)

  return (
    <div className='relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 opacity-20'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-blob'></div>
        <div className='absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000'></div>
        <div className='absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000'></div>
      </div>

      {/* Main Content */}
      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-24 md:pt-28 pb-16 md:pb-24'>
        <div className='grid lg:grid-cols-2 gap-12 items-center'>
          {/* Left Content */}
          <div className='text-white space-y-8'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300'>
              <HiSparkles className='w-5 h-5 text-yellow-300 animate-pulse' />
              <span className='text-sm font-medium'>Your Future Starts Here</span>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 animate-fade-in'>
                Empowering Your
                <span className='block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent'>
                  Scholarship Journey
                </span>
              </h1>
              <p className='text-lg md:text-xl text-white/90 max-w-xl leading-relaxed'>
                Discover thousands of scholarship opportunities worldwide. Apply with confidence and transform your educational dreams into reality.
              </p>
            </div>

            {/* Search Bar */}
            <div className='relative max-w-2xl'>
              <div className='relative flex items-center'>
                <FaSearch className='absolute left-5 text-gray-400 w-5 h-5 pointer-events-none' />
                <input
                  type='text'
                  placeholder='Search scholarships, universities, or majors...'
                  className='w-full pl-14 pr-32 py-4 rounded-2xl bg-white shadow-2xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition-all duration-300'
                />
                <button className='absolute right-2 px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'>
                  Search
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className='flex flex-wrap gap-8 pt-4'>
              <div className='flex items-center gap-3 group'>
                <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-300'>
                  <FaGraduationCap className='w-6 h-6 group-hover:scale-110 transition-transform duration-300' />
                </div>
                <div>
                  <p className='text-2xl font-bold'>{scholarships.toLocaleString()}+</p>
                  <p className='text-white/80 text-sm'>Scholarships</p>
                </div>
              </div>

              <div className='flex items-center gap-3 group'>
                <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-300'>
                  <FaGlobe className='w-6 h-6 group-hover:scale-110 transition-transform duration-300' />
                </div>
                <div>
                  <p className='text-2xl font-bold'>{countries}+</p>
                  <p className='text-white/80 text-sm'>Countries</p>
                </div>
              </div>

              <div className='flex items-center gap-3 group'>
                <div className='w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white/30 transition-all duration-300'>
                  <FaChartLine className='w-6 h-6 group-hover:scale-110 transition-transform duration-300' />
                </div>
                <div>
                  <p className='text-2xl font-bold'>{success}%</p>
                  <p className='text-white/80 text-sm'>Success Rate</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-wrap gap-4'>
              <Link
                to='/all-scholarships'
                className='inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105'
              >
                <span>Browse Scholarships</span>
                <FaAward className='w-5 h-5' />
              </Link>
              <Link
                to='/signup'
                className='inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border-2 border-white/30 hover:border-white/50'
              >
                <span>Get Started Free</span>
              </Link>
            </div>
          </div>

          {/* Right Content - Testimonial Slider */}
          <div className='relative flex justify-center items-center lg:justify-start'>
            <Swiper
              effect={'cards'}
              grabCursor={true}
              modules={[EffectCards, Autoplay]}
              className="w-[300px] h-[420px] sm:w-[340px] sm:h-[450px] lg:w-[360px] lg:h-[480px]"
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className='relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300'>
                    {/* Gradient Header */}
                    <div className='absolute top-0 left-0 right-0 h-24 sm:h-28 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'></div>
                    
                    {/* Content */}
                    <div className='relative z-10 flex flex-col items-center p-4 sm:p-6 pt-12 sm:pt-14'>
                      {/* Profile Image */}
                      <div className='relative mb-2 sm:mb-3'>
                        <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-75'></div>
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className='relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-white shadow-xl'
                        />
                        {/* Quote Icon */}
                        <div className='absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg'>
                          <FaQuoteLeft className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-white' />
                        </div>
                      </div>

                      {/* Name */}
                      <h3 className='text-base sm:text-lg font-bold text-gray-900 mb-1'>
                        {testimonial.name}
                      </h3>

                      {/* Scholarship Info */}
                      <div className='text-center mb-2 sm:mb-3'>
                        <p className='text-xs sm:text-sm font-medium text-indigo-600 mb-1 sm:mb-2'>
                          {testimonial.scholarship}
                        </p>
                        <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full'>
                          <span className='text-sm sm:text-base font-bold text-green-700'>
                            {testimonial.amount}
                          </span>
                        </div>
                      </div>

                      {/* Rating Stars */}
                      <div className='flex gap-1 mb-3 sm:mb-4'>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <FaStar key={i} className='w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400' />
                        ))}
                      </div>

                      {/* Review Text */}
                      <div className='relative px-2 sm:px-3'>
                        <p className='text-sm sm:text-base text-gray-700 text-center leading-relaxed font-medium'>
                          "{testimonial.review}"
                        </p>
                      </div>

                      {/* Success Badge */}
                      <div className='mt-3 sm:mt-4 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-full border border-indigo-100'>
                        <FaAward className='w-3 h-3 sm:w-3.5 sm:h-3.5 text-indigo-600' />
                        <span className='text-[10px] sm:text-xs font-semibold text-indigo-600'>Scholarship Winner</span>
                      </div>

                      {/* Decorative Bottom */}
                      <div className='absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600'></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Floating Stats Card */}
            <div className='hidden lg:block absolute -top-8 -right-8 bg-yellow-400 rounded-2xl p-5 shadow-xl transform rotate-6 hover:rotate-0 transition-all duration-500 z-20 cursor-pointer'>
              <div className='text-center'>
                <p className='text-3xl font-bold text-gray-900'>99.9%</p>
                <p className='text-xs font-medium text-gray-800'>Success Rate</p>
              </div>
            </div>

            {/* Floating Icon Card 1 */}
            <div className='hidden lg:block absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float z-20'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center'>
                <FaAward className='w-6 h-6 text-white' />
              </div>
            </div>

            {/* Floating Icon Card 2 */}
            <div className='hidden lg:block absolute top-1/3 -right-12 bg-white rounded-2xl p-4 shadow-xl animate-float animation-delay-2000 z-20'>
              <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center'>
                <FaGlobe className='w-6 h-6 text-white' />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .swiper-slide {
          background: transparent !important;
        }
      `}</style>
    </div>
  )
}

export default Banner