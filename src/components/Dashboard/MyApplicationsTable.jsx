import { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaTrash, FaEdit, FaCreditCard, FaEye, FaStar, FaTimes, FaMapMarkerAlt, FaGraduationCap, FaCalendar, FaUniversity } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { getAuth } from 'firebase/auth';

const MyApplicationsTable = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Get current Firebase user
  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Fetch Applications Data
  const { data: response = {}, isLoading } = useQuery({
    queryKey: ['myApplications'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/my-applications');
      return data;
    },
  });

  const applications = response.applications || [];

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => axiosSecure.delete(`/applications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['myApplications']);
      toast.success('Application removed successfully!');
    },
    onError: () => toast.error('Failed to delete application'),
  });

  // Review Mutation
  const reviewMutation = useMutation({
    mutationFn: async (reviewData) => axiosSecure.post('/reviews', reviewData),
    onSuccess: () => {
      queryClient.invalidateQueries(['myApplications']);
      toast.success('Review added! ⭐');
      setIsReviewOpen(false);
      setComment('');
      setRating(5);
    },
    onError: () => toast.error('Failed to add review'),
  });

  // Handle Payment
  const handlePay = async (app) => {
    try {
      const { data } = await axiosSecure.post(`/retry-payment/${app._id}`);
      if (data.url) window.location.href = data.url;
    } catch (err) {
      toast.error('Payment failed to start');
    }
  };

  // Handle Details
  const handleDetails = (app) => {
    setSelected(app);
    setIsDetailsOpen(true);
  };

  // Handle Review
  const handleReview = (app) => {
    setSelected(app);
    setIsReviewOpen(true);
  };

   if (isLoading) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
         <div className="text-center">
           <TbFidgetSpinner className="w-16 h-16 animate-spin text-purple-600 mx-auto" />
           <p className="mt-4 text-gray-600 font-semibold">Loading Applications...</p>
         </div>
       </div>
     );
   }

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-6">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            My <span className="text-indigo-600 italic">Applications</span>
          </h1>
          <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-3 flex items-center gap-2">
            <span className="h-[2px] w-8 bg-indigo-600"></span>
            Manage your academic path ({applications.length})
          </p>
        </div>
      </div>

      {/* Applications Grid/Table */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-[2.5rem] p-16 text-center border border-slate-100 shadow-sm">
          <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">No applications found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {applications.map((app) => (
            <div 
              key={app._id} 
              className="group relative bg-white rounded-[2rem] p-5 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col justify-between overflow-hidden"
            >
              
              {/* Status Badges */}
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-col gap-1.5">
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter w-fit shadow-sm ${
                    app.status === 'completed' ? 'bg-green-500 text-white' :
                    app.status === 'rejected' ? 'bg-rose-500 text-white' : 'bg-amber-400 text-white'
                  }`}>
                    {app.status}
                  </span>
                  <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter w-fit border ${
                    app.paymentStatus === 'paid' ? 'border-green-200 text-green-600 bg-green-50' : 
                    'border-rose-200 text-rose-600 bg-rose-50'
                  }`}>
                    {app.paymentStatus}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-slate-800 leading-none">${app.totalAmount}</p>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Total Fee</span>
                </div>
              </div>

              {/* University Info */}
              <div className="mb-6">
                <h3 className="font-black text-slate-800 text-base md:text-lg leading-tight mb-2 group-hover:text-indigo-600 transition-colors">
                  {app.scholarshipName || app.universityName}
                </h3>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <FaMapMarkerAlt className="text-indigo-400 shrink-0" />
                    <span className="truncate">{app.universityCity}, {app.universityCountry}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <FaGraduationCap className="text-indigo-400 shrink-0" />
                    <span className="truncate">{app.subjectCategory}</span>
                  </div>
                </div>
              </div>

              {/* Feedback Alert */}
              {app.feedback && (
                <div className="mb-4 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100">
                  <p className="text-[10px] text-indigo-600 font-black uppercase mb-1 flex items-center gap-1">
                    💬 Moderator Feedback
                  </p>
                  <p className="text-[11px] text-slate-600 italic line-clamp-2">"{app.feedback}"</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-auto">
                {/* View Details Button - Always Visible */}
                <button
                  onClick={() => handleDetails(app)}
                  className="flex items-center justify-center gap-2 py-2.5 bg-slate-50 text-slate-700 rounded-xl font-bold text-[11px] hover:bg-slate-100 transition-colors"
                >
                  <FaEye size={12} /> View
                </button>

                {/* Edit Button - Only if Pending */}
                {app.status === 'pending' && (
                  <button 
                    onClick={() => toast.info('Edit feature coming soon!')}
                    className="flex items-center justify-center gap-2 py-2.5 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-[11px] hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    <FaEdit size={12} /> Edit
                  </button>
                )}

                {/* Complete Payment Button - Only if Pending Payment */}
                {app.status === 'pending' && app.paymentStatus === 'pending' && (
                  <button
                    onClick={() => handlePay(app)}
                    className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-xl font-bold text-[11px] hover:bg-green-600 shadow-lg shadow-green-100 transition-all"
                  >
                    <FaCreditCard size={12} /> Complete Payment
                  </button>
                )}

                {/* Cancel/Delete Button - Only if Pending */}
                {app.status === 'pending' && (
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to cancel this application?')) {
                        deleteMutation.mutate(app._id);
                      }
                    }}
                    disabled={deleteMutation.isPending}
                    className="col-span-2 flex items-center justify-center gap-2 py-2.5 text-rose-500 border border-rose-100 rounded-xl font-bold text-[11px] hover:bg-rose-500 hover:text-white transition-all disabled:opacity-50"
                  >
                    <FaTrash size={12} /> {deleteMutation.isPending ? 'Deleting...' : 'Cancel Application'}
                  </button>
                )}

                {/* Add Review Button - Only if Completed */}
                {app.status === 'completed' && (
                  <button
                    onClick={() => handleReview(app)}
                    className="col-span-2 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-xl font-bold text-[11px] shadow-lg shadow-amber-100 hover:scale-[1.02] transition-all"
                  >
                    <FaStar size={12} /> Write a Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <DetailsModal 
        isOpen={isDetailsOpen}
        setIsOpen={setIsDetailsOpen}
        application={selected}
      />

      <ReviewModal 
        isOpen={isReviewOpen} 
        setIsOpen={setIsReviewOpen} 
        selected={selected} 
        rating={rating}
        setRating={setRating} 
        comment={comment} 
        setComment={setComment} 
        mutation={reviewMutation}
        user={currentUser}
      />
    </div>
  );
};

// Details Modal Component
const DetailsModal = ({ isOpen, setIsOpen, application }) => {
  if (!application) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl transition-all border border-slate-100">
              
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-800 mb-1">Application Details</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Complete information
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  <FaTimes className="text-slate-400" />
                </button>
              </div>

              {/* University Image */}
              {application.universityImage && (
                <div className="mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src={application.universityImage} 
                    alt={application.universityName}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <DetailItem 
                  icon={<FaUniversity />}
                  label="Scholarship Name"
                  value={application.scholarshipName}
                />
                <DetailItem 
                  icon={<FaUniversity />}
                  label="University Name"
                  value={application.universityName}
                />
                <DetailItem 
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={`${application.universityCity}, ${application.universityCountry}`}
                />
                <DetailItem 
                  icon={<FaGraduationCap />}
                  label="Subject Category"
                  value={application.subjectCategory}
                />
                <DetailItem 
                  icon={<FaGraduationCap />}
                  label="Degree"
                  value={application.degree}
                />
                <DetailItem 
                  icon={<FaStar />}
                  label="Scholarship Category"
                  value={application.scholarshipCategory}
                />
                <DetailItem 
                  icon={<FaCreditCard />}
                  label="Application Fee"
                  value={`$${application.applicationFees}`}
                />
                <DetailItem 
                  icon={<FaCreditCard />}
                  label="Service Charge"
                  value={`$${application.serviceCharge}`}
                />
                <DetailItem 
                  icon={<FaCreditCard />}
                  label="Total Amount"
                  value={`$${application.totalAmount}`}
                  highlight
                />
                <DetailItem 
                  icon={<FaCalendar />}
                  label="Application Date"
                  value={new Date(application.applicationDate).toLocaleDateString()}
                />
                <DetailItem 
                  icon={<FaCalendar />}
                  label="Deadline"
                  value={new Date(application.applicationDeadline).toLocaleDateString()}
                />
                <DetailItem 
                  label="Status"
                  value={application.status}
                  badge={application.status}
                />
                <DetailItem 
                  label="Payment Status"
                  value={application.paymentStatus}
                  badge={application.paymentStatus}
                />
              </div>

              {/* Feedback Section */}
              {application.feedback && (
                <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
                  <p className="text-xs font-black uppercase tracking-wider text-indigo-600 mb-2">
                    💬 Moderator Feedback
                  </p>
                  <p className="text-sm text-slate-700 italic">"{application.feedback}"</p>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-6 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

// Detail Item Component
const DetailItem = ({ icon, label, value, highlight, badge }) => (
  <div className="bg-slate-50 p-4 rounded-xl">
    <div className="flex items-center gap-2 mb-1">
      {icon && <span className="text-indigo-400">{icon}</span>}
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
    </div>
    {badge ? (
      <span className={`inline-block px-2 py-1 rounded-lg text-xs font-black uppercase ${
        badge === 'completed' || badge === 'paid' ? 'bg-green-500 text-white' :
        badge === 'rejected' ? 'bg-rose-500 text-white' : 'bg-amber-400 text-white'
      }`}>
        {value}
      </span>
    ) : (
      <p className={`text-sm font-bold ${highlight ? 'text-indigo-600 text-lg' : 'text-slate-800'}`}>
        {value || 'N/A'}
      </p>
    )}
  </div>
);

// Review Modal Component
const ReviewModal = ({ isOpen, setIsOpen, selected, rating, setRating, comment, setComment, mutation, user }) => (
  <Transition show={isOpen} as={Fragment}>
    <Dialog as="div" className="relative z-[100]" onClose={() => setIsOpen(false)}>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl transition-all border border-slate-100">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-800 mb-1">Share Experience</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Rating for {selected?.scholarshipName}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <FaTimes className="text-slate-400" />
              </button>
            </div>
            
            {/* Star Rating */}
            <div className="flex justify-center gap-2 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star} 
                  onClick={() => setRating(star)} 
                  className={`text-3xl transition-transform active:scale-90 ${
                    star <= rating ? 'text-amber-400' : 'text-slate-200'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {/* Comment Textarea */}
            <textarea
              className="w-full rounded-2xl bg-slate-50 border-none p-4 text-sm focus:ring-2 focus:ring-indigo-500 h-32 mb-6 resize-none"
              placeholder="Share your experience with this scholarship..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
            />
            <p className="text-xs text-slate-400 text-right mb-6">{comment.length}/500</p>

            {/* Submit Button */}
            <button
              onClick={() => {
                if (!comment.trim()) {
                  toast.error('Please write a comment');
                  return;
                }
                mutation.mutate({ 
                  scholarshipId: selected.scholarshipId, 
                  scholarshipName: selected.scholarshipName, 
                  ratingPoint: rating, 
                  reviewComment: comment,
                  userName: user?.displayName || 'Anonymous',
                  userImage: user?.photoURL || ''
                });
              }}
              disabled={mutation.isPending || !comment.trim()}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {mutation.isPending ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  </Transition>
);

export default MyApplicationsTable;