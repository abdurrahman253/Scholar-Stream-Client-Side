import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { FaTrash, FaEdit, FaStar, FaCalendarAlt, FaUniversity, FaQuoteLeft, FaTimes } from 'react-icons/fa';
import { TbFidgetSpinner, TbMessageStar } from 'react-icons/tb';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { format } from 'date-fns';

const MyReviewsTable = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['myReviews'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/reviews/my');
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, reviewData }) => axiosSecure.patch(`/reviews/${id}`, reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(['myReviews']);
      toast.success('Feedback refined! ⭐');
      setIsEditOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['myReviews']);
      toast.success('Review removed');
    },
  });

  const openEditModal = (review) => {
    setSelected(review);
    setRating(review.ratingPoint);
    setComment(review.reviewComment);
    setIsEditOpen(true);
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
    <div className="max-w-7xl mx-auto px-2 md:px-6">
      {/* --- HEADER --- */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Insights</span>
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <div className="h-1 w-8 bg-indigo-600 rounded-full"></div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            {reviews.length} Experiences Shared
          </p>
        </div>
      </div>

      {/* --- CARD GRID --- */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm">
           <TbMessageStar className="mx-auto text-slate-200 mb-4" size={50} />
           <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No reviews posted yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => (
            <div key={review._id} className="group bg-white rounded-[2rem] p-5 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between overflow-hidden relative">
              
              {/* Top: Scholarship & Rating */}
              <div>
                <div className="flex justify-between items-start mb-4">
                   <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={12} className={i < review.ratingPoint ? "text-amber-400" : "text-slate-100"} />
                      ))}
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => openEditModal(review)} className="p-2 bg-slate-50 text-slate-400 hover:text-indigo-600 rounded-xl transition-colors">
                        <FaEdit size={14} />
                      </button>
                      <button onClick={() => deleteMutation.mutate(review._id)} className="p-2 bg-rose-50 text-rose-400 hover:text-rose-600 rounded-xl transition-colors">
                        <FaTrash size={14} />
                      </button>
                   </div>
                </div>

                <h3 className="font-black text-slate-800 text-base leading-tight mb-1 truncate">
                  {review.scholarshipName}
                </h3>
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-bold mb-4 uppercase tracking-tighter">
                  <FaUniversity size={10} className="text-indigo-300" />
                  <span className="truncate">{review.universityName || 'Global University'}</span>
                </div>

                {/* Comment Box */}
                <div className="relative bg-slate-50 rounded-2xl p-4 border border-slate-100/50">
                  <FaQuoteLeft className="absolute top-2 left-2 text-indigo-100 text-xl" />
                  <p className="relative z-10 text-slate-600 text-xs md:text-sm leading-relaxed italic line-clamp-4 pl-4 font-medium">
                    {review.reviewComment}
                  </p>
                </div>
              </div>

              {/* Bottom: Date */}
              <div className="mt-5 flex items-center justify-end border-t border-slate-50 pt-4">
                <div className="flex items-center gap-1.5 text-slate-300 text-[10px] font-black uppercase tracking-widest">
                  <FaCalendarAlt size={10} />
                  {format(new Date(review.reviewDate), 'dd MMM yyyy')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- EDIT MODAL (Optimized for Mobile) --- */}
      <Transition show={isEditOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setIsEditOpen(false)}>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl transition-all border border-slate-100">
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title className="text-2xl font-black text-slate-800 tracking-tight">Refine Review</Dialog.Title>
                    <button onClick={() => setIsEditOpen(false)} className="text-slate-400 hover:text-slate-600 p-2 bg-slate-50 rounded-full transition-colors">
                      <FaTimes />
                    </button>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Adjust Rating</p>
                      <div className="flex gap-2 justify-center py-2 bg-slate-50 rounded-2xl">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <button key={s} onClick={() => setRating(s)} className={`text-3xl transition-transform active:scale-90 ${s <= rating ? 'text-amber-400' : 'text-slate-200'}`}>
                            ★
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Update Thoughts</p>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full rounded-2xl bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white p-4 text-sm text-slate-600 transition-all h-32 resize-none shadow-inner"
                        placeholder="Tell us more..."
                      />
                    </div>

                    <button
                      onClick={() => updateMutation.mutate({ id: selected._id, reviewData: { ratingPoint: rating, reviewComment: comment } })}
                      disabled={updateMutation.isPending || !comment.trim()}
                      className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
                    >
                      {updateMutation.isPending ? 'Syncing...' : 'Save Changes'}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MyReviewsTable;