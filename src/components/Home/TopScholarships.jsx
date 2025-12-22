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
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Scholarships
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most affordable and prestigious scholarships with the lowest application fees
          </p>
        </div>

        {/* Swiper Slider - Default internal pagination */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
            1280: { slidesPerView: 3, spaceBetween: 32 },
          }}
          className="topScholarshipsSwiper !pb-16" // Extra padding to push dots down
        >
          {scholarships.map((scholarship) => (
            <SwiperSlide key={scholarship._id}>
              <ScholarshipCard scholarship={scholarship} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default TopScholarships;