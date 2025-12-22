import React from 'react';
import { Link } from 'react-router-dom';

const ScholarshipCard = ({ scholarship }) => {
  const {
    _id,
    universityName,
    universityImage,
    universityCity,
    universityCountry,
    scholarshipCategory,
    applicationFees,
  } = scholarship;

  return (
    <div className="h-full">
      <Link to={`/scholarship/${_id}`} className="block h-full">
        <div className="bg-white rounded-xl md:rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
          
          {/* University Image */}
          <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
            <img
              src={universityImage}
              alt={universityName}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            {/* Scholarship Category Badge - Mobile Responsive */}
            <div className="absolute top-2 left-2 md:top-4 md:left-4">
              <span className={`px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold text-white shadow-lg ${
                scholarshipCategory === 'Full fund' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600'
              }`}>
                {scholarshipCategory}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-3 md:p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-sm md:text-lg text-gray-900 line-clamp-1 md:line-clamp-2 mb-1 md:mb-2">
              {universityName}
            </h3>

            {/* Location */}
            <div className="flex items-center text-gray-500 mb-2 md:mb-4">
              <svg className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-[10px] md:text-sm truncate">
                {universityCity}, {universityCountry}
              </span>
            </div>

            {/* Application Fee & Button */}
            <div className="mt-auto">
              <p className="text-[11px] md:text-sm text-gray-600 mb-2 md:mb-4">
                Fee:{' '}
                <span className="font-bold text-indigo-600">
                  {applicationFees === 0 ? 'Free' : `$${applicationFees}`}
                </span>
              </p>

              {/* View Details Button - Smaller on Mobile */}
              <button className="w-full py-2 md:py-3 px-2 md:px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs md:text-sm font-semibold rounded-lg md:rounded-xl transition-all duration-200">
                Details
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ScholarshipCard;