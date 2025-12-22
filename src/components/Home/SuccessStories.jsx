import { FaQuoteLeft, FaStar, FaGraduationCap, FaCheckCircle } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import Container from '../Shared/Container'

const SuccessStories = () => {
  const stories = [
    { 
      name: "Sarah Rahman", 
      uni: "Oxford University", 
      country: "United Kingdom",
      degree: "Masters in Law",
      amount: "$55,000",
      img: "https://i.postimg.cc/PxW374Kn/Maddie-C.webp",
      quote: "ScholarStream transformed my dream of studying at Oxford into reality. The platform made finding the perfect scholarship effortless!"
    },
    { 
      name: "Ariful Islam", 
      uni: "MIT", 
      country: "United States",
      degree: "PhD in Computer Science",
      amount: "$52,000",
      img: "https://i.postimg.cc/fWHjRp3L/Aaron-H.webp",
      quote: "The application tracking feature kept me organized throughout my journey. I'm now pursuing my PhD at my dream institution!"
    },
    { 
      name: "Tanvir Hasan", 
      uni: "Stanford University", 
      country: "United States",
      degree: "MBA",
      amount: "$60,000",
      img: "https://i.postimg.cc/k4T8DRgw/Collin-L.webp",
      quote: "From application to acceptance, ScholarStream guided me every step. Now I'm at Stanford pursuing my MBA!"
    },
    { 
      name: "Nadia Akter", 
      uni: "Harvard University", 
      country: "United States",
      degree: "Masters in Public Health",
      amount: "$50,000",
      img: "https://i.postimg.cc/8P2vFSNm/Krrisha-P.webp",
      quote: "The filtering options helped me find scholarships I never knew existed. Harvard was just the beginning!"
    },
    { 
      name: "M. Abdullah", 
      uni: "Yale University", 
      country: "United States",
      degree: "Masters in Economics",
      amount: "$48,000",
      img: "https://i.postimg.cc/CKNn6nk5/Matteo-P.webp",
      quote: "ScholarStream's comprehensive database connected me with opportunities that perfectly matched my profile."
    },
    { 
      name: "Sumaiya Khan", 
      uni: "Cambridge University", 
      country: "United Kingdom",
      degree: "PhD in Engineering",
      amount: "$45,000",
      img: "https://i.postimg.cc/9FnpJKVs/Nour-I.webp",
      quote: "The platform's user-friendly interface made my scholarship search stress-free. Cambridge was worth every effort!"
    }
  ]

  return (
    <div className='py-20 bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30 relative overflow-hidden'>
      {/* Background Decorations */}
      <div className='absolute inset-0 opacity-10'>
        <div className='absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full blur-3xl'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl'></div>
      </div>

      <Container>
        {/* Header */}
        <div className='text-center mb-16 relative z-10'>
          <div className='inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full border border-indigo-200 mb-4'>
            <HiSparkles className='w-5 h-5 text-yellow-500' />
            <span className='text-sm font-semibold text-gray-700'>Success Stories</span>
          </div>
          
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Inspiring{' '}
            <span className='bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              Scholar Journeys
            </span>
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Meet our scholars who transformed their educational dreams into reality through ScholarStream
          </p>
          
          {/* Stats */}
          <div className='flex flex-wrap justify-center gap-8 mt-8'>
            <div className='text-center'>
              <p className='text-3xl font-bold text-indigo-600'>2000+</p>
              <p className='text-sm text-gray-600'>Success Stories</p>
            </div>
            <div className='text-center'>
              <p className='text-3xl font-bold text-purple-600'>$120M+</p>
              <p className='text-sm text-gray-600'>Scholarships Won</p>
            </div>
            <div className='text-center'>
              <p className='text-3xl font-bold text-pink-600'>98.9%</p>
              <p className='text-sm text-gray-600'>Satisfaction Rate</p>
            </div>
          </div>
        </div>

        {/* Stories Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10'>
          {stories.map((story, index) => (
            <div
              key={index}
              className='group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-indigo-200'
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Gradient Overlay */}
              <div className='absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600'></div>
              
              {/* Content */}
              <div className='relative p-6'>
                {/* Profile Section */}
                <div className='flex flex-col items-center mb-4'>
                  {/* Image with Badge */}
                  <div className='relative mb-4'>
                    <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-75'></div>
                    <img
                      src={story.img}
                      alt={story.name}
                      className='relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl'
                    />
                    {/* Success Badge */}
                    <div className='absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white'>
                      <FaCheckCircle className='w-5 h-5 text-white' />
                    </div>
                  </div>

                  {/* Name & University */}
                  <h3 className='text-xl font-bold text-gray-900 text-center'>
                    {story.name}
                  </h3>
                  <div className='flex items-center gap-2 mt-2 text-indigo-600'>
                    <FaGraduationCap className='w-4 h-4' />
                    <p className='text-sm font-semibold'>{story.uni}</p>
                  </div>
                  <p className='text-xs text-gray-500 mt-1'>{story.country}</p>
                </div>

                {/* Details */}
                <div className='space-y-3 mb-4'>
                  <div className='flex items-center justify-between px-3 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg'>
                    <span className='text-xs text-gray-600'>Degree</span>
                    <span className='text-sm font-semibold text-gray-900'>{story.degree}</span>
                  </div>
                  <div className='flex items-center justify-between px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg'>
                    <span className='text-xs text-gray-600'>Award</span>
                    <span className='text-sm font-bold text-green-700'>{story.amount}</span>
                  </div>
                </div>

                {/* Quote */}
                <div className='relative bg-gray-50 rounded-xl p-4 mb-4'>
                  <FaQuoteLeft className='absolute top-3 left-3 w-4 h-4 text-indigo-300' />
                  <p className='text-sm text-gray-700 leading-relaxed pl-6 italic'>
                    "{story.quote}"
                  </p>
                </div>

                {/* Rating */}
                <div className='flex items-center justify-center gap-1 text-yellow-400'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className='w-4 h-4' />
                  ))}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500' style={{ padding: '2px', zIndex: -1 }}></div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-16 text-center relative z-10'>
          <div className='inline-flex flex-col sm:flex-row items-center gap-4'>
            <a
              href='/all-scholarships'
              className='px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105'
            >
              Start Your Journey
            </a>
            <a
              href='/success-stories'
              className='px-8 py-4 bg-white text-indigo-600 font-semibold rounded-xl hover:bg-gray-50 transition-all duration-300 shadow-md border-2 border-indigo-200'
            >
              View All Stories
            </a>
          </div>
        </div>
      </Container>

      {/* Custom Animation */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default SuccessStories