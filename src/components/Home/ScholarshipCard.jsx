import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';

const ScholarshipCard = ({ scholarship }) => {
  if (!scholarship) return null;

  const { _id, universityName, universityImage, universityCity, universityCountry, scholarshipCategory, applicationFees } = scholarship;

  return (
    <div className="group h-full bg-white rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(79,70,229,0.15)] transition-all duration-700 flex flex-col overflow-hidden relative">
      
      {/* Top Image Section */}
      <div className="relative h-32 sm:h-40 md:h-56 overflow-hidden">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Category Badge */}
        <div className="absolute top-2 left-2 md:top-4 md:left-4">
          <span className="backdrop-blur-xl bg-white/60 border border-white/40 px-3 py-1 md:px-5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[1.5px] text-indigo-700 shadow-sm">
            {scholarshipCategory}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3 md:p-7 flex flex-grow flex-col">
        {/* Title */}
        <h3 className="font-extrabold text-[12px] md:text-xl text-slate-800 line-clamp-2 mb-1.5 md:mb-3 group-hover:text-indigo-600 transition-colors leading-tight min-h-[32px] md:min-h-auto">
          {universityName}
        </h3>

        {/* Location - Subtle & Elegant */}
        <div className="flex items-center text-slate-400 text-[10px] md:text-sm mb-4 md:mb-6">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-indigo-50 flex items-center justify-center mr-2">
            <FaMapMarkerAlt className="text-indigo-400 text-[10px] md:text-xs" />
          </div>
          <span className="font-medium truncate">{universityCity}, {universityCountry}</span>
        </div>

        {/* Footer - Premium Separation */}
        <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[8px] md:text-[10px] text-slate-400 uppercase font-black tracking-widest">App Fee</span>
            <span className="font-black text-slate-900 text-[13px] md:text-2xl">
              {applicationFees === 0 ? (
                <span className="text-emerald-500">FREE</span>
              ) : (
                `$${applicationFees}`
              )}
            </span>
          </div>
          
          
          <Link 
            to={`/scholarships/${_id}`}
            className="relative inline-flex items-center justify-center gap-2 px-3 py-2 md:px-7 md:py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white text-[10px] md:text-xs font-black uppercase rounded-xl md:rounded-2xl shadow-[0_10px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_15px_25px_rgba(79,70,229,0.4)] transition-all duration-300 hover:-translate-y-1 active:scale-95 group/btn overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Details 
              <FaArrowRight className="w-2.5 h-2.5 transform group-hover/btn:translate-x-1 transition-transform" />
            </span>
            {/* Glossy Reflection Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shine" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;