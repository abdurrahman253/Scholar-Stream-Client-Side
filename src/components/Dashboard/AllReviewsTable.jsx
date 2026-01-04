import { useState } from 'react';
import { FaTrash, FaStar, FaQuoteLeft, FaCalendarAlt, FaSearch, FaChartBar, FaTimes } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllReviewsTable = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  
  // States for filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [showStats, setShowStats] = useState(false);

  // Fetch reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['allReviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/reviews/all');
      return data;
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axiosSecure.delete(`/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allReviews']);
      toast.success('Deleted successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to delete');
    },
  });

  const handleDelete = (id) => {
    if (!window.confirm('Delete this feedback?')) return;
    deleteMutation.mutate(id);
  };

  // Filter reviews based on search and rating
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = 
      review.scholarshipName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewComment?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = 
      selectedRating === 'all' || 
      review.ratingPoint === parseInt(selectedRating);

    return matchesSearch && matchesRating;
  });

  // Calculate statistics
  const stats = {
    total: reviews.length,
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.ratingPoint, 0) / reviews.length).toFixed(1)
      : 0,
    byRating: {
      5: reviews.filter(r => r.ratingPoint === 5).length,
      4: reviews.filter(r => r.ratingPoint === 4).length,
      3: reviews.filter(r => r.ratingPoint === 3).length,
      2: reviews.filter(r => r.ratingPoint === 2).length,
      1: reviews.filter(r => r.ratingPoint === 1).length,
    }
  };

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
          <div className="text-center">
            <TbFidgetSpinner className="w-16 h-16 animate-spin text-purple-600 mx-auto" />
            <p className="mt-4 text-gray-600 font-semibold">Loading Reviews...</p>
          </div>
        </div>
      );
    }

  return (
    <div className="max-w-7xl mx-auto px-1">
      {/* Header */}
      <div className="mb-6 px-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
              User <span className="text-indigo-600">Feedbacks</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-1 w-6 bg-indigo-600 rounded-full"></div>
              <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                {filteredReviews.length} of {reviews.length} Reviews
              </p>
            </div>
          </div>

          {/* Stats Toggle Button */}
          <button
            onClick={() => setShowStats(!showStats)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-600 hover:text-white transition-all"
          >
            <FaChartBar size={12} />
            {showStats ? 'Hide' : 'Show'} Statistics
          </button>
        </div>

        {/* Statistics Panel */}
        {showStats && (
          <div className="mt-4 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-800 text-lg mb-4">📊 Review Statistics</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              {/* Total Reviews */}
              <div className="bg-indigo-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-indigo-600">{stats.total}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Total</p>
              </div>

              {/* Average Rating */}
              <div className="bg-amber-50 rounded-xl p-4 text-center">
                <p className="text-2xl font-black text-amber-600">{stats.averageRating}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">Avg Rating</p>
              </div>

              {/* Rating Breakdown */}
              {[5, 4, 3, 2, 1].map(rating => (
                <div key={rating} className="bg-slate-50 rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <FaStar size={12} className="text-amber-400" />
                    <span className="text-xs font-bold text-slate-600">{rating}</span>
                  </div>
                  <p className="text-xl font-black text-slate-800">{stats.byRating[rating]}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="mt-4 flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search by scholarship, user, or comment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-10 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <FaTimes className="text-slate-400" size={12} />
              </button>
            )}
          </div>

          {/* Rating Filter */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">⭐ 5 Stars</option>
            <option value="4">⭐ 4 Stars</option>
            <option value="3">⭐ 3 Stars</option>
            <option value="2">⭐ 2 Stars</option>
            <option value="1">⭐ 1 Star</option>
          </select>
        </div>
      </div>

      {/* Reviews Grid */}
      {filteredReviews.length === 0 ? (
        <div className="bg-white p-10 rounded-[2rem] text-center border border-slate-100">
          <p className="text-slate-400 text-xs font-bold">
            {searchTerm || selectedRating !== 'all' 
              ? 'No reviews match your filters' 
              : 'No feedback yet.'}
          </p>
          {(searchTerm || selectedRating !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedRating('all');
              }}
              className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review._id}
              className="group relative bg-white rounded-[1.8rem] p-5 shadow-sm border border-slate-100 hover:border-indigo-100 transition-all duration-300"
            >
              {/* Top Section: User Info & Delete */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="relative shrink-0">
                    <img 
                      src={review.userImage || review.reviewerImage || 'https://i.ibb.co/mJRtjS3/user.png'} 
                      alt="user" 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover ring-2 ring-slate-50"
                    />
                    <div className="absolute -top-1 -right-1 bg-amber-400 text-white p-0.5 rounded-md shadow-sm">
                      <FaStar size={8} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-slate-800 text-sm md:text-base truncate leading-tight">
                      {review.userName || 'Student'}
                    </h4>
                    <p className="text-[10px] text-slate-400 truncate leading-tight">
                      {review.userEmail}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(review._id)}
                  disabled={deleteMutation.isPending}
                  className="p-2 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors disabled:opacity-30"
                >
                  {deleteMutation.isPending ? (
                    <TbFidgetSpinner className="animate-spin" size={12} />
                  ) : (
                    <FaTrash size={12} />
                  )}
                </button>
              </div>

              {/* Scholarship Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-tighter truncate max-w-[150px]">
                  {review.scholarshipName || 'Scholarship'}
                </span>
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i} 
                      size={10} 
                      className={i < review.ratingPoint ? "fill-current" : "text-slate-200"} 
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-500">
                  {review.ratingPoint}/5
                </span>
              </div>

              {/* Comment Area */}
              <div className="relative bg-slate-50/50 rounded-2xl p-3 border border-slate-100/50">
                <FaQuoteLeft className="absolute top-2 left-2 text-indigo-100 text-xl" />
                <p className="relative z-10 text-slate-600 text-[12px] md:text-sm leading-relaxed italic line-clamp-3 pl-4">
                  {review.reviewComment}
                </p>
              </div>

              {/* Footer: Date */}
              <div className="mt-4 flex items-center justify-end">
                <div className="flex items-center gap-1 text-slate-300 text-[9px] font-bold">
                  <FaCalendarAlt size={8} />
                  {new Date(review.reviewDate).toLocaleDateString('en-GB')}
                </div>
              </div>

              {/* Decorative Corner Glow */}
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-indigo-50/50 rounded-full blur-2xl group-hover:bg-indigo-200/40 transition-all"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllReviewsTable;