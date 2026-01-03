import { FaTrash, FaStar, FaQuoteLeft, FaCalendarAlt } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AllReviewsTable = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['allReviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/reviews/all');
      return data;
    },
  });

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

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <TbFidgetSpinner className="w-12 h-12 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-1">
      {/* --- COMPACT HEADER --- */}
      <div className="mb-6 px-2">
        <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
          User <span className="text-indigo-600">Feedbacks</span>
        </h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-1 w-6 bg-indigo-600 rounded-full"></div>
          <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
            {reviews.length} Verified Reviews
          </p>
        </div>
      </div>

      {/* --- GRID --- */}
      {reviews.length === 0 ? (
        <div className="bg-white p-10 rounded-[2rem] text-center border border-slate-100">
           <p className="text-slate-400 text-xs font-bold">No feedback yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {reviews.map((review) => (
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
                  <FaTrash size={12} />
                </button>
              </div>

              {/* Scholarship Tag */}
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase tracking-tighter">
                   {review.scholarshipName || 'Scholarship'}
                </span>
                <div className="flex gap-0.5 text-amber-400">
                   {[...Array(5)].map((_, i) => (
                     <FaStar key={i} size={10} className={i < review.ratingPoint ? "fill-current" : "text-slate-200"} />
                   ))}
                </div>
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