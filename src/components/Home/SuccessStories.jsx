import { FaQuoteLeft, FaStar, FaGraduationCap, FaCheckCircle } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi'
import { motion } from 'framer-motion'

import { ArrowRight } from 'lucide-react' 
import Container from '../Shared/Container'
import { Link } from 'react-router-dom' 

const SuccessStories = () => {
  const stories = [
    { name: "Sarah Rahman", uni: "Oxford University", country: "UK", degree: "Masters in Law", amount: "$55k", img: "https://i.postimg.cc/PxW374Kn/Maddie-C.webp", quote: "ScholarStream transformed my dream of Oxford into reality!", color: "99, 102, 241" },
    { name: "Ariful Islam", uni: "MIT", country: "USA", degree: "PhD in CS", amount: "$52k", img: "https://i.postimg.cc/fWHjRp3L/Aaron-H.webp", quote: "The application tracking kept me organized throughout!", color: "16, 185, 129" },
    { name: "Tanvir Hasan", uni: "Stanford", country: "USA", degree: "MBA", amount: "$60k", img: "https://i.postimg.cc/k4T8DRgw/Collin-L.webp", quote: "Guided me every step. Now I'm at Stanford!", color: "245, 158, 11" },
    { name: "Nadia Akter", uni: "Harvard", country: "USA", degree: "Masters in PH", amount: "$50k", img: "https://i.postimg.cc/8P2vFSNm/Krrisha-P.webp", quote: "Found scholarships I never knew existed. Harvard was the start!", color: "236, 72, 153" },
    { name: "M. Abdullah", uni: "Yale University", country: "USA", degree: "Masters Econ", amount: "$48k", img: "https://i.postimg.cc/CKNn6nk5/Matteo-P.webp", quote: "Matched me with opportunities that perfectly fit my profile.", color: "139, 92, 246" },
    { name: "Sumaiya Khan", uni: "Cambridge", country: "UK", degree: "PhD Eng", amount: "$45k", img: "https://i.postimg.cc/9FnpJKVs/Nour-I.webp", quote: "User-friendly interface made my search stress-free!", color: "20, 184, 166" },
    { name: "Rakib Ahmed", uni: "UCL", country: "UK", degree: "Masters Arch", amount: "$42k", img: "https://i.postimg.cc/FsLdXB3J/Tyrese-B.webp", quote: "The platform opened doors I never thought possible!", color: "239, 68, 68" },
    { name: "Zarin Tasnim", uni: "NUS Singapore", country: "SG", degree: "PhD Data Sc", amount: "$46k", img: "https://i.postimg.cc/XJqqHHnq/Gella-H.webp", quote: "Made my international study dreams finally come true!", color: "59, 130, 246" }
  ]

  return (
    <div className='py-16 md:py-24 bg-white relative overflow-hidden'>
      {/* Soft Premium Glows */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none'>
        <div className='absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-50/50 blur-[120px] rounded-full'></div>
        <div className='absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-50/50 blur-[120px] rounded-full'></div>
      </div>

      <Container>
        {/* Header Section */}
        <div className='text-center mb-12 md:mb-20 relative z-10 px-4'>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className='inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full border border-indigo-100 mb-4'
          >
            <HiSparkles className='w-4 h-4 text-indigo-600' />
            <span className='text-[10px] md:text-xs font-bold text-indigo-700 uppercase tracking-widest'>Success Stories</span>
          </motion.div>
          
          <h2 className='text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight leading-tight'>
            Inspiring <span className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600'>Scholar Journeys</span>
          </h2>
          
          <div className='flex justify-center gap-4 md:gap-12 mt-6 py-4 border-y border-gray-50 bg-white/50 backdrop-blur-sm'>
            {[
              { val: "2k+", label: "Stories" },
              { val: "$120M+", label: "Won" },
              { val: "99%", label: "Happy" }
            ].map((stat, i) => (
              <div key={i} className='text-center'>
                <p className='text-lg md:text-2xl font-black text-gray-900 leading-none'>{stat.val}</p>
                <p className='text-[10px] md:text-xs text-gray-500 font-bold uppercase mt-1 tracking-tighter'>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Carousel Wrapper */}
        <div className='success-wrapper'>
          <div className='success-inner' style={{ '--quantity': stories.length }}>
            {stories.map((story, index) => (
              <div 
                key={index} 
                className='success-card group' 
                style={{ '--index': index, '--color-card': story.color }}
              >
                <div className='card-content p-4 flex flex-col items-center justify-between h-full border border-gray-100 bg-white rounded-2xl'>
                  <div className='w-full flex flex-col items-center'>
                    <div className='relative mb-3'>
                      <div className='absolute -inset-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity'></div>
                      <img src={story.img} alt={story.name} className='relative w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border-2 border-white shadow-lg' />
                      <div className='absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white'>
                        <FaCheckCircle className='w-2.5 h-2.5 text-white' />
                      </div>
                    </div>
                    
                    <h3 className='text-xs md:text-sm font-black text-gray-900 text-center leading-none'>{story.name}</h3>
                    <p className='text-[9px] md:text-[10px] font-bold text-indigo-600 mt-1 flex items-center gap-1 uppercase tracking-tighter'>
                       {story.uni}
                    </p>
                  </div>

                  <div className='w-full bg-slate-50 rounded-lg py-1.5 px-2 my-2 border border-slate-100'>
                    <div className='flex justify-between items-center'>
                      <span className='text-[8px] uppercase font-bold text-gray-400 tracking-wider'>Grant</span>
                      <span className='text-[10px] font-black text-emerald-600'>{story.amount}</span>
                    </div>
                  </div>

                  <div className='relative mb-2'>
                    <FaQuoteLeft className='text-indigo-200 w-2 h-2 mb-1' />
                    <p className='text-[9px] md:text-[11px] text-gray-600 leading-tight italic line-clamp-3 px-1'>
                      {story.quote}
                    </p>
                  </div>

                  <div className='flex gap-0.5 text-yellow-400'>
                    {[...Array(5)].map((_, i) => <FaStar key={i} className='w-2 h-2' />)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 px-6 relative z-10'>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href='/all-scholarships'
            className='w-full sm:w-auto px-8 py-4 bg-gray-900 text-white text-xs font-black rounded-xl uppercase tracking-[2px] shadow-xl flex items-center justify-center gap-2 group'
          >
            Start My Journey <ArrowRight size={14} className='group-hover:translate-x-1 transition-transform' />
          </motion.a>
          
          <Link
            to='/success-stories'
            className='w-full sm:w-auto px-8 py-4 bg-white text-gray-900 text-xs font-black rounded-xl uppercase tracking-[2px] border border-gray-200 hover:bg-gray-50 transition-colors flex items-center justify-center'
          >
            Read All Stories
          </Link>
        </div>
      </Container>

      <style>{`
        .success-wrapper {
          width: 100%;
          height: 400px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1000px;
        }
        .success-inner {
          --w: 140px; 
          --h: 220px;
          --translateZ: 250px;
          --rotateX: -5deg;
          position: absolute;
          width: var(--w);
          height: var(--h);
          transform-style: preserve-3d;
          animation: rotating 40s linear infinite;
        }
        @keyframes rotating {
          from { transform: rotateX(var(--rotateX)) rotateY(0); }
          to { transform: rotateX(var(--rotateX)) rotateY(1turn); }
        }
        .success-card {
          position: absolute;
          inset: 0;
          transform: rotateY(calc((360deg / var(--quantity)) * var(--index))) translateZ(var(--translateZ));
          backface-visibility: visible;
        }
        @media (min-width: 768px) {
          .success-wrapper { height: 500px; }
          .success-inner {
            --w: 200px;
            --h: 300px;
            --translateZ: 450px;
          }
        }
      `}</style>
    </div>
  )
}

export default SuccessStories