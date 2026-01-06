'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FaSearch, FaChevronLeft, FaChevronRight, FaGraduationCap } from 'react-icons/fa';
import Container from '../components/Shared/Container';
import ScholarshipCard from '../components/Home/ScholarshipCard';


const ScholarshipSkeleton = () => (
  <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 animate-pulse">
    <div className="w-full h-44 bg-slate-200 rounded-2xl mb-4"></div>
    <div className="h-6 bg-slate-200 rounded-lg w-3/4 mb-3"></div>
    <div className="h-4 bg-slate-200 rounded-lg w-1/2 mb-6"></div>
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="h-4 bg-slate-100 rounded-lg w-1/4"></div>
        <div className="h-4 bg-slate-100 rounded-lg w-1/4"></div>
      </div>
      <div className="h-12 bg-indigo-50 rounded-xl w-full mt-4"></div>
    </div>
  </div>
);

const AllScholarships = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('postDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const limit = 8; // Per page limit

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['scholarships', searchTerm, category, sortBy, sortOrder, page],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/scholarships`, {
        params: { search: searchTerm, category, sortBy, sortOrder, page, limit }
      });
      return data;
    },
    keepPreviousData: true,
  });

  const scholarships = data?.scholarships || [];
  const totalPages = data?.totalPages || 1;

  const handleReset = () => {
    setSearchTerm('');
    setCategory('');
    setSortBy('postDate');
    setSortOrder('desc');
    setPage(1);
  };

  return (
    <div className='py-20 md:py-28 min-h-screen bg-[#F8FAFC]'>
      <Container>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-4 text-indigo-600'>
            <FaGraduationCap size={28} />
          </div>
          <h1 className='text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight'>
            Explore <span className='text-indigo-600'>Scholarships</span>
          </h1>
          <p className='text-slate-500 max-w-xl mx-auto text-sm md:text-base'>
            Your dream education is one click away. Filter through hundreds of opportunities.
          </p>
        </div>

        {/* Controls Section */}
        <div className='flex flex-col gap-6 mb-12'>
          {/* Search Bar */}
          <div className='relative w-full max-w-2xl mx-auto'>
            <FaSearch className='absolute left-5 top-1/2 -translate-y-1/2 text-slate-400' />
            <input
              type='text'
              placeholder='Search by name, university or degree...'
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setPage(1);}}
              className='w-full pl-12 pr-4 py-4 rounded-2xl bg-white shadow-sm border border-slate-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-slate-400'
            />
          </div>

          {/* Filters & Sorting */}
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <select 
              value={category} 
              onChange={(e) => {setCategory(e.target.value); setPage(1);}}
              className='px-5 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer shadow-sm'
            >
              <option value="">All Categories</option>
              <option value="Full Fund">Full Fund</option>
              <option value="Partial Fund">Partial Fund</option>
              <option value="Self Fund">Self Fund</option>
            </select>

            <select 
              value={`${sortBy}-${sortOrder}`} 
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
                setPage(1);
              }}
              className='px-5 py-3 rounded-2xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 outline-none focus:border-indigo-500 transition-colors cursor-pointer shadow-sm'
            >
              <option value="postDate-desc">Recently Posted</option>
              <option value="applicationFees-asc">Fees: Low to High</option>
              <option value="applicationFees-desc">Fees: High to Low</option>
            </select>

            {(searchTerm || category) && (
              <button 
                onClick={handleReset} 
                className='px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-all'
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className={`transition-all duration-300 ${isFetching && !isLoading ? 'opacity-40 grayscale-[0.5]' : 'opacity-100'}`}>
          {isLoading ? (
            /* Loading State with Skeletons */
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
              {[...Array(limit)].map((_, i) => (
                <ScholarshipSkeleton key={i} />
              ))}
            </div>
          ) : scholarships.length === 0 ? (
            /* Empty State */
            <div className='text-center py-24 bg-white rounded-[40px] border border-slate-100 shadow-sm'>
              <div className='bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4'>
                 <FaSearch className='text-slate-300 text-3xl' />
              </div>
              <h3 className='text-xl font-bold text-slate-800'>No Results Found</h3>
              <p className='text-slate-500'>Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          ) : (
            /* Data Grid */
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6'>
              {scholarships.map((s) => (
                <ScholarshipCard key={s._id} scholarship={s} />
              ))}
            </div>
          )}
        </div>

        {/* Modern Pagination */}
        {totalPages > 1 && (
          <div className='mt-20 flex items-center justify-center gap-3'>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className='w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 disabled:opacity-20 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm'
            >
              <FaChevronLeft size={14} />
            </button>
            
            <div className='flex items-center gap-2'>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`w-12 h-12 rounded-2xl font-bold transition-all border ${
                    page === i + 1 
                    ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100 scale-110' 
                    : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className='w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-600 disabled:opacity-20 hover:border-indigo-500 hover:text-indigo-600 transition-all shadow-sm'
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        )}
      </Container>
    </div>
  );
};

export default AllScholarships;