import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'
import Container from '../components/Shared/Container'
import ScholarshipCard from '../components/Home/ScholarshipCard'
import LoadingSpinner from '../components/Shared/LoadingSpinner'
import { useEffect } from 'react'

const AllScholarships = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedSubject, setSelectedSubject] = useState('All')
  const [selectedCountry, setSelectedCountry] = useState('All')
  const [showFilters, setShowFilters] = useState(false)

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['all-scholarships'],
    queryFn: async () => {
      const result = await axios.get(`${import.meta.env.VITE_API_URL}/scholarships`)
      return result.data
    },
  })

  if (isLoading) return <LoadingSpinner />

  // Extract unique values for filters
  const categories = ['All', ...new Set(scholarships.map(s => s.scholarshipCategory))]
  const subjects = ['All', ...new Set(scholarships.map(s => s.subjectCategory))]
  const countries = ['All', ...new Set(scholarships.map(s => s.universityCountry))]

  // Filter scholarships
  const filteredScholarships = scholarships.filter(scholarship => {
    const matchesSearch = 
      scholarship.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.universityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scholarship.degree?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === 'All' || scholarship.scholarshipCategory === selectedCategory
    const matchesSubject = selectedSubject === 'All' || scholarship.subjectCategory === selectedSubject
    const matchesCountry = selectedCountry === 'All' || scholarship.universityCountry === selectedCountry

    return matchesSearch && matchesCategory && matchesSubject && matchesCountry
  })

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setSelectedSubject('All')
    setSelectedCountry('All')
  }

  const activeFiltersCount = [selectedCategory, selectedSubject, selectedCountry].filter(f => f !== 'All').length + (searchTerm ? 1 : 0)

  return (
    <>
      {/* Add top padding to push content below fixed navbar */}
      <div className='py-20 md:py-24 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'>
        <Container>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-lg'>
              Explore Scholarships
            </h1>
            <p className='text-gray-700 text-lg md:text-xl max-w-3xl mx-auto'>
              Discover <span className='font-bold text-indigo-600'>{scholarships.length}+</span> premium scholarship opportunities from top universities worldwide
            </p>
          </div>

          {/* Search Bar */}
          <div className='mb-10'>
            <div className='relative max-w-4xl mx-auto'>
              <FaSearch className='absolute left-6 top-1/2 -translate-y-1/2 text-indigo-500 w-6 h-6' />
              <input
                type='text'
                placeholder='Search by name, university, degree...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-16 pr-12 py-5 rounded-3xl bg-white/90 backdrop-blur-md shadow-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-300 text-lg'
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className='absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-indigo-600 transition-colors'
                >
                  <FaTimes className='w-5 h-5' />
                </button>
              )}
            </div>
          </div>

          {/* Mobile Filter Toggle & Results */}
          <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='md:hidden inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg'
            >
              <FaFilter className='w-5 h-5' />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className='px-3 py-1 bg-white/20 text-white text-sm font-bold rounded-full'>
                  {activeFiltersCount}
                </span>
              )}
            </button>

            <div className='flex items-center justify-between sm:justify-end gap-6'>
              <p className='text-gray-700 font-medium'>
                Showing <span className='font-bold text-indigo-600 text-xl'>{filteredScholarships.length}</span> scholarships
              </p>
              {(activeFiltersCount > 0 || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className='text-indigo-600 hover:text-indigo-800 font-semibold underline-offset-4 hover:underline transition-all'
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Filters Section */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block mb-12`}>
            <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/50'>
              <h3 className='text-xl font-bold text-gray-800 mb-6'>Refine Your Search</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Scholarship Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className='w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-white/70 transition-all duration-300 text-gray-800'
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Subject Category</label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className='w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-white/70 transition-all duration-300 text-gray-800'
                  >
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-3'>Country</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className='w-full px-5 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-white/70 transition-all duration-300 text-gray-800'
                  >
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Scholarships Grid */}
          {filteredScholarships.length === 0 ? (
            <div className='text-center py-32 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl'>
              <div className='mb-8'>
                <div className='inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full'>
                  <FaSearch className='w-16 h-16 text-indigo-500' />
                </div>
              </div>
              <h3 className='text-3xl font-bold text-gray-800 mb-4'>No scholarships found</h3>
              <p className='text-gray-600 text-lg mb-10 max-w-md mx-auto'>Try adjusting your search term or filters to see more results</p>
              <button
                onClick={resetFilters}
                className='px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-xl'
              >
                Clear Filters & Search Again
              </button>
            </div>
          ) : (
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 md:gap-8'>
              {filteredScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship._id} scholarship={scholarship} />
              ))}
            </div>
          )}
        </Container>
      </div>
    </>
  )
}

export default AllScholarships