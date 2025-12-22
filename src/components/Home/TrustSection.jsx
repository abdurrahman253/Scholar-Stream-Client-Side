import React from 'react';
import { FaStar, FaCheckCircle } from 'react-icons/fa';
import Container from '../Shared/Container';
import { Link } from 'react-router';

const TrustSection = () => {
  return (
    <section className="py-24 bg-white text-gray-900 overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Left Side: Stats & Trustpilot */}
          <div className="w-full lg:w-1/3 text-center lg:text-left space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold tracking-widest uppercase">
              Trusted by Students
            </div>
            
            <div className="space-y-3">
              <h2 className="text-7xl font-black text-gray-900 tracking-tighter">
                4.8
              </h2>
              <div className="flex items-center justify-center lg:justify-start gap-1 text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => <FaStar key={i} />)}
              </div>
              <p className="text-gray-500 font-medium text-lg">
                2k+ Reviews • <span className="text-emerald-600 font-bold">Excellent</span>
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-3xl font-bold text-gray-800">
                <span className="text-emerald-500 text-4xl">★</span>
                <span className="tracking-tighter">Trustpilot</span>
              </div>
            </div>
          </div>

          {/* Center: Main Content */}
          <div className="w-full lg:w-2/3 relative">
            <div className="relative z-10 space-y-10">
              <h3 className="text-4xl md:text-5xl font-extrabold leading-[1.1] text-gray-900">
                12 million students <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                  can't be wrong
                </span>
              </h3>

              <ul className="space-y-5">
                {[
                  "Trusted by millions of students and parents.",
                  "Access expert scholarship help and advice.",
                  "Highly rated with outstanding student reviews."
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-lg text-gray-600 font-medium">
                    <div className="bg-indigo-100 p-1 rounded-full">
                      <FaCheckCircle className="text-indigo-600 text-xl shrink-0" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side: Floating Illustration */}
            <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 hidden xl:block animate-float-light">
              <div className="relative">
                {/* Subtle Background Glow for Light Theme */}
                <div className="absolute -inset-10 bg-indigo-100/50 blur-[80px] rounded-full"></div>
                <img 
                  src="https://i.postimg.cc/43YVQ9x8/trustpilot-reading-illustration.jpg" 
                  alt="Student Reading" 
                  className="w-[480px] relative z-20 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border-8 border-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner Card (Premium Light Style) */}
        <div className="mt-24 premium-glass-light rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden group">
            {/* Soft Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-transparent to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="relative z-10 space-y-8">
              <h4 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                So many students earn scholarships <br className="hidden md:block" /> 
                with <span className="text-indigo-600">ScholarStream</span>. You can too!
              </h4>
              
              <Link to="/all-scholarships" className="px-12 py-5 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 hover:scale-105 transition-all duration-300 shadow-xl shadow-indigo-200 active:scale-95">
                Check My Matches
              </Link>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-50 rounded-full blur-3xl opacity-50"></div>
        </div>
      </Container>
    </section>
  );
};

export default TrustSection;