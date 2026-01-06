import React from 'react';
import Container from '../Shared/Container';
import { Link } from 'react-router';


const HowItWorks = () => {
  const steps = [
    {
      id: '01',
      title: 'Find Scholarships',
      description: 'Get matched to scholarships tailored to you! Complete your profile and discover thousands of opportunities instantly.',
    },
    {
      id: '02',
      title: 'Organize Matches',
      description: 'Filter your matches by due date or award amount. Keep track of your favorites and never miss a deadline.',
    },
    {
      id: '03',
      title: 'Apply and Win',
      description: 'Start your applications today! Use our expert tools to make college more affordable and win your future.',
    }
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">ScholarStream</span> Works
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            A simple three-step process to find and win the best scholarships for your education.
          </p>
        </div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
  {steps.map((step) => (
    <div key={step.id} className="work-card">
      {/* Step Number Badge */}
      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-gray-900 font-bold text-xl mb-6 shadow-lg shadow-indigo-200">
        {step.id}
      </div>
      
   
      <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
        {step.title}
      </h3>
      
      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
        {step.description}
      </p>

      {/* Subtle Glow Effect */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>
    </div>
  ))}
</div>

        <div className="mt-16 text-center px-6">
  <div className="relative inline-block group">

    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
    
    <Link 
      to='/signup' 
      className="relative flex items-center justify-center px-10 py-5 bg-gray-900 text-white font-black rounded-2xl transition-all duration-300 overflow-hidden border border-white/10 shadow-2xl"
    >
  
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
      
      <span className="relative uppercase tracking-[2px] text-sm">
        Get Started Now
      </span>
      
      
      <svg 
        className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </Link>
  </div>

 
  <p className="mt-6 text-[10px] font-bold text-gray-400 uppercase tracking-[3px] opacity-70">
    Join 2,000+ Students Today
  </p>


  <style>{`
    @keyframes shimmer {
      100% {
        transform: translateX(100%);
      }
    }
  `}</style>
</div>
      </Container>
    </section>
  );
};

export default HowItWorks;