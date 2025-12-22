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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 h-full flex flex-col">
          {/* University Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={universityImage}
              alt={universityName}
              className="w-full h-full object-cover"
            />
            {/* Scholarship Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold text-white ${
                scholarshipCategory === 'Full fund' 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600'
              }`}>
                {scholarshipCategory}
              </span>
            </div>
          </div>

          {/* Card Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">
              {universityName}
            </h3>

            {/* Location */}
            <div className="flex items-center text-gray-600 mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{universityCity}, {universityCountry}</span>
            </div>

            {/* Application Fee */}
            <div className="mt-auto">
              <p className="text-sm text-gray-600 mb-4">
                Application Fee:{' '}
                <span className="font-bold text-indigo-600">
                  {applicationFees === 0 ? 'Free' : `$${applicationFees}`}
                </span>
              </p>

              {/* View Details Button */}
              <button className="w-full py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg">
                View Details
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ScholarshipCard;