import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ScholarshipCard from './ScholarshipCard';
import Container from '../Shared/Container';
import { Link } from 'react-router';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

/**
 * Top Scholarship Skeleton
 */
const TopScholarshipSkeleton = () => (
  <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 animate-pulse h-full">
    {/* Image placeholder */}
    <div className="w-full h-40 bg-slate-200 rounded-2xl mb-4"></div>
    {/* Title placeholder */}
    <div className="h-5 bg-slate-200 rounded-lg w-3/4 mb-3"></div>
    {/* Subtitle placeholder */}
    <div className="h-4 bg-slate-200 rounded-lg w-1/2 mb-6"></div>
    {/* Info placeholders */}
    <div className="flex justify-between items-center mt-auto">
      <div className="h-4 bg-slate-100 rounded w-1/4"></div>
      <div className="h-4 bg-slate-100 rounded w-1/4"></div>
    </div>
    <div className="h-10 bg-indigo-50 rounded-xl w-full mt-5"></div>
  </div>
);

const TopScholarships = () => {
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['top-scholarships'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/scholarships-top`);
      return result.data;
    },
  });


  const swiperBreakpoints = {
    640: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 24 },
    1280: { slidesPerView: 4, spaceBetween: 30 },
  };


  if (!isLoading && scholarships.length === 0) return null;

  return (
    <section className="py-12 md:py-20 bg-[#F8FAFC]">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 px-4 md:px-0 gap-4">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Top <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Scholarships</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm md:text-lg max-w-xl">
              Handpicked opportunities with low application fees to kickstart your career.
            </p>
          </div>
          <Link to="/all-scholarships" className="hidden md:inline-flex items-center text-indigo-600 font-semibold hover:gap-2 transition-all">
            View All Opportunities <span className="ml-1">→</span>
          </Link>
        </div>

        {/* Loading State with Swiper Skeletons */}
        {isLoading ? (
          <Swiper
            slidesPerView={1.15}
            spaceBetween={16}
            breakpoints={swiperBreakpoints}
            className="pb-14 !px-4 md:!px-0"
          >
            {[...Array(4)].map((_, i) => (
              <SwiperSlide key={i}>
                <TopScholarshipSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          /* Real Data Swiper */
          <Swiper
            slidesPerView={1.15}
            spaceBetween={16}
            freeMode={true}
            pagination={{ clickable: true }}
            modules={[FreeMode, Pagination]}
            breakpoints={swiperBreakpoints}
            className="pb-14 !px-4 md:!px-0"
          >
            {scholarships.map((scholarship) => (
              <SwiperSlide key={scholarship._id} className="h-auto">
                <ScholarshipCard scholarship={scholarship} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </section>
  );
};

export default TopScholarships;