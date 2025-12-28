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
      quote: "ScholarStream transformed my dream of studying at Oxford into reality!",
      color: "142, 249, 252"
    },
    { 
      name: "Ariful Islam", 
      uni: "MIT", 
      country: "United States",
      degree: "PhD in Computer Science",
      amount: "$52,000",
      img: "https://i.postimg.cc/fWHjRp3L/Aaron-H.webp",
      quote: "The application tracking kept me organized throughout my journey!",
      color: "142, 252, 204"
    },
    { 
      name: "Tanvir Hasan", 
      uni: "Stanford University", 
      country: "United States",
      degree: "MBA",
      amount: "$60,000",
      img: "https://i.postimg.cc/k4T8DRgw/Collin-L.webp",
      quote: "ScholarStream guided me every step. Now I'm at Stanford!",
      color: "215, 252, 142"
    },
    { 
      name: "Nadia Akter", 
      uni: "Harvard University", 
      country: "United States",
      degree: "Masters in Public Health",
      amount: "$50,000",
      img: "https://i.postimg.cc/8P2vFSNm/Krrisha-P.webp",
      quote: "Found scholarships I never knew existed. Harvard was the beginning!",
      color: "252, 208, 142"
    },
    { 
      name: "M. Abdullah", 
      uni: "Yale University", 
      country: "United States",
      degree: "Masters in Economics",
      amount: "$48,000",
      img: "https://i.postimg.cc/CKNn6nk5/Matteo-P.webp",
      quote: "Connected me with opportunities that perfectly matched my profile.",
      color: "252, 142, 239"
    },
    { 
      name: "Sumaiya Khan", 
      uni: "Cambridge University", 
      country: "United Kingdom",
      degree: "PhD in Engineering",
      amount: "$45,000",
      img: "https://i.postimg.cc/9FnpJKVs/Nour-I.webp",
      quote: "User-friendly interface made my search stress-free!",
      color: "204, 142, 252"
    },
    { 
      name: "Rakib Ahmed", 
      uni: "UCL", 
      country: "United Kingdom",
      degree: "Masters in Architecture",
      amount: "$42,000",
      img: "https://i.postimg.cc/FsLdXB3J/Tyrese-B.webp",
      quote: "The platform opened doors I never thought possible!",
      color: "252, 142, 142"
    },
    { 
      name: "Zarin Tasnim", 
      uni: "NUS Singapore", 
      country: "Singapore",
      degree: "PhD in Data Science",
      amount: "$46,000",
      img: "https://i.postimg.cc/XJqqHHnq/Gella-H.webp",
      quote: "ScholarStream made my international study dreams come true!",
      color: "142, 202, 252"
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
            <HiSparkles className='w-5 h-5 text-yellow-500 animate-pulse' />
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

        {/* 3D Rotating Cards */}
        <div className='success-wrapper'>
          <div className='success-inner' style={{ '--quantity': stories.length }}>
            {stories.map((story, index) => (
              <div 
                key={index} 
                className='success-card' 
                style={{ 
                  '--index': index,
                  '--color-card': story.color
                }}
              >
                <div className='card-content'>
                  {/* Gradient Overlay */}
                  <div className='absolute top-0 left-0 right-0 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-t-2xl'></div>
                  
                  {/* Profile Section */}
                  <div className='relative pt-10 pb-3 flex flex-col items-center'>
                    {/* Image with Badge */}
                    <div className='relative mb-2'>
                      <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-75'></div>
                      <img
                        src={story.img}
                        alt={story.name}
                        className='relative w-16 h-16 rounded-full object-cover border-3 border-white shadow-xl'
                      />
                      {/* Success Badge */}
                      <div className='absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white'>
                        <FaCheckCircle className='w-3.5 h-3.5 text-white' />
                      </div>
                    </div>

                    {/* Name & University */}
                    <h3 className='text-sm font-bold text-gray-900 text-center px-2 leading-tight'>
                      {story.name}
                    </h3>
                    <div className='flex items-center gap-1 mt-1 text-indigo-600'>
                      <FaGraduationCap className='w-3 h-3 flex-shrink-0' />
                      <p className='text-[11px] font-semibold leading-tight'>{story.uni}</p>
                    </div>
                    <p className='text-[9px] text-gray-500 mt-0.5'>{story.country}</p>

                    {/* Details */}
                    <div className='space-y-1.5 mt-2 px-2 w-full'>
                      <div className='flex items-center justify-between px-2 py-1 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg'>
                        <span className='text-[9px] text-gray-600'>Degree</span>
                        <span className='text-[9px] font-semibold text-gray-900 text-right leading-tight'>{story.degree}</span>
                      </div>
                      <div className='flex items-center justify-between px-2 py-1 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg'>
                        <span className='text-[9px] text-gray-600'>Award</span>
                        <span className='text-[10px] font-bold text-green-700'>{story.amount}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <div className='relative bg-gray-50 rounded-lg p-2 mt-2 mx-2'>
                      <FaQuoteLeft className='absolute top-1.5 left-1.5 w-2.5 h-2.5 text-indigo-300' />
                      <p className='text-[9px] text-gray-700 leading-snug pl-3 italic'>
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Rating */}
                    <div className='flex items-center justify-center gap-0.5 text-yellow-400 mt-2'>
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className='w-2.5 h-2.5' />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className='mt-20 text-center relative z-10'>
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

      {/* Custom Styles */}
      <style>{`
        .success-wrapper {
          width: 100%;
          height: 550px;
          position: relative;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .success-inner {
          --w: 220px;
          --h: 340px;
          --translateZ: 400px;
          --rotateX: -8deg;
          --perspective: 1400px;
          position: absolute;
          width: var(--w);
          height: var(--h);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          transform-style: preserve-3d;
          animation: rotating 50s linear infinite;
        }

        @keyframes rotating {
          from {
            transform: translate(-50%, -50%) perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(0);
          }
          to {
            transform: translate(-50%, -50%) perspective(var(--perspective)) rotateX(var(--rotateX)) rotateY(1turn);
          }
        }

        .success-card {
          position: absolute;
          border: 2px solid rgba(var(--color-card), 0.6);
          border-radius: 16px;
          overflow: hidden;
          inset: 0;
          background: white;
          box-shadow: 0 8px 25px rgba(var(--color-card), 0.25);
          transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
          transition: all 0.3s ease;
          backface-visibility: visible;
        }

        .success-card:hover {
          box-shadow: 0 12px 35px rgba(var(--color-card), 0.4);
          border-color: rgba(var(--color-card), 0.9);
          transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ)) scale(1.05);
        }

        .card-content {
          width: 100%;
          height: 100%;
          position: relative;
          background: linear-gradient(135deg, 
            rgba(var(--color-card), 0.03) 0%, 
            rgba(var(--color-card), 0.1) 100%
          );
        }

        /* Pause animation on hover */
        .success-wrapper:hover .success-inner {
          animation-play-state: paused;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .success-wrapper {
            height: 450px;
          }
          
          .success-inner {
            --w: 200px;
            --h: 310px;
            --translateZ: 350px;
          }
        }
      `}</style>
    </div>
  )
}

export default SuccessStories