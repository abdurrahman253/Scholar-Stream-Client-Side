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

        <div className="mt-16 text-center">
          <Link to='/signup' className="px-8 py-4 bg-gray-900 text-gray-900 font-bold rounded-2xl hover:bg-indigo-600 transition-all shadow-xl hover:shadow-indigo-200">
            Get Started Now
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default HowItWorks;