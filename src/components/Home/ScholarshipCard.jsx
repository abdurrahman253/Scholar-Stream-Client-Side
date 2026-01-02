import React from 'react';
import { Link } from 'react-router-dom';

const ScholarshipCard = ({ scholarship }) => {
  const { _id, universityName, universityImage, universityCity, universityCountry, scholarshipCategory, applicationFees } = scholarship;

  return (
    <div className="group h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col overflow-hidden relative">
      
      {/* Top Image Section */}
      <div className="relative h-44 md:h-52 overflow-hidden">
        <img
          src={universityImage}
          alt={universityName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-3 left-3">
          <span className={`backdrop-blur-md bg-white/20 border border-white/30 px-3 py-1 rounded-lg text-[10px] md:text-xs font-bold text-gray-900 uppercase tracking-wider shadow-xl ${
            scholarshipCategory === 'Full fund' ? 'bg-emerald-500/40' : 'bg-indigo-500/40'
          }`}>
            {scholarshipCategory}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 md:p-6 flex flex-grow flex-col">
        <h3 className="font-bold text-base md:text-xl text-gray-900 line-clamp-1 mb-2 group-hover:text-indigo-600 transition-colors">
          {universityName}
        </h3>

        <div className="flex items-center text-gray-400 text-xs md:text-sm mb-4 italic font-medium">
          <svg className="w-3.5 h-3.5 mr-1.5 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          {universityCity}, {universityCountry}
        </div>

        {/* Footer with Final Glow Button */}
        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">App Fee</span>
            <span className="font-extrabold text-indigo-600 text-sm md:text-lg">
              {applicationFees === 0 ? 'Free' : `$${applicationFees}`}
            </span>
          </div>
          
          <Link 
            to={`/scholarships/${_id}`}
            className="btn-neon-glow inline-flex items-center justify-center px-6 py-2.5 text-gray-900 text-xs md:text-sm font-bold uppercase rounded-xl transition-all shadow-lg"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;