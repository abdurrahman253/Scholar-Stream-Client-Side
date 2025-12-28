import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Shared/LoadingSpinner';
import ScholarshipCard from './ScholarshipCard';
import Container from '../Shared/Container';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Link } from 'react-router';

const TopScholarships = () => {
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['top-scholarships'],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/scholarships-top`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (!scholarships || scholarships.length === 0) return null;

  return (
   <section className="py-12 md:py-20 bg-[#F8FAFC]">
      <Container>
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

        <Swiper
          slidesPerView={1.15} 
          spaceBetween={16}
          centeredSlides={false}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="pb-14 !px-4 md:!px-0"
        >
          {scholarships.map((scholarship) => (
            <SwiperSlide key={scholarship._id} className="h-auto">
              <ScholarshipCard scholarship={scholarship} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default TopScholarships;