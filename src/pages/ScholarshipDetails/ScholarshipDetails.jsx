'use client';

import React, { useState, useEffect } from 'react';
import Container from '../../components/Shared/Container';
import Button from '../../components/Shared/Button/Button';
import PurchaseModal from '../../components/Modal/PurchaseModal';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../../components/Shared/LoadingSpinner';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Calendar, DollarSign, Award, Globe,
  Star, GraduationCap, Clock, CheckCircle2, User,
  AlertCircle, LogIn
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast'; // ← যোগ করা হয়েছে

const ScholarshipDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: scholarship = {}, isLoading, isError } = useQuery({
    queryKey: ['scholarship', id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/scholarships/${id}`);
      return result.data;
    },
    retry: false,
  });

  const { data: reviewsData = { reviews: [], averageRating: 0, totalReviews: 0 } } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
      return result.data;
    },
    enabled: !!id,
    retry: false,
  });

  const addReviewMutation = useMutation({
    mutationFn: async (reviewData) => {
      if (!user) throw new Error('User not authenticated');
      const idToken = await user.getIdToken();
      const result = await axios.post(
        `${import.meta.env.VITE_API_URL}/reviews`,
        reviewData,
        {
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', id]);
      reset();
      setShowReviewForm(false);
      toast.success('🎉 Thank you! Your review has been submitted successfully!', {
        duration: 5000,
        position: 'top-center',
        style: {
          background: '#10b981',
          color: 'white',
          fontWeight: 'bold',
        },
        icon: '⭐',
      });
    },
    onError: (error) => {
      console.error('Review submission failed:', error);
      toast.error('Failed to submit review. Please try again.');
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmitReview = (data) => {
    if (!user) {
      toast.error('Please log in to write a review');
      return;
    }
    addReviewMutation.mutate({
      scholarshipId: id,
      scholarshipName: scholarship.scholarshipName, // ← এটা পাঠানো হচ্ছে
      userName: user.displayName || 'Anonymous',
      userImage: user.photoURL || '',
      ratingPoint: parseInt(data.rating),
      reviewComment: data.comment,
      universityName: scholarship.universityName
    });
  };

  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (isError || !scholarship?._id) {
    return (
      <Container>
        <div className="max-w-4xl mx-auto text-center py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">Scholarship Not Found</h2>
            <p className="text-xl text-gray-500 mb-8">It seems this opportunity is no longer available.</p>
            <Button label="Explore Others" onClick={() => navigate('/scholarships')} />
          </motion.div>
        </div>
      </Container>
    );
  }

  const {
    universityImage, scholarshipName, universityName, universityWorldRank,
    universityCountry, universityCity, applicationDeadline, applicationFees,
    serviceCharge, scholarshipDescription, stipend, degree,
    scholarshipCategory, subjectCategory,
  } = scholarship;

  const totalApplicationCost = Number(applicationFees) + Number(serviceCharge);
  const reviews = reviewsData.reviews || [];
  const averageRating = reviewsData.averageRating || 0;
  const totalReviews = reviewsData.totalReviews || 0;

  return (
    <div className="bg-[#FAFBFF] min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden">
        <motion.img
          src={universityImage}
          className="w-full h-full object-cover"
          alt={universityName}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'linear' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-[#FAFBFF]" />
      </div>

      <Container>
        <div className="relative -mt-64 md:-mt-80 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-2 space-y-8">
              <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <GraduationCap size={14} /> {degree}
                  </span>
                  <span className="px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Award size={14} /> {scholarshipCategory}
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-4">
                  {scholarshipName}
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-6">{universityName}</h2>
                <div className="flex flex-wrap items-center gap-6 text-gray-500 font-medium">
                  <div className="flex items-center gap-2 text-indigo-600 bg-indigo-50/50 px-3 py-1 rounded-lg">
                    <Globe size={18} />
                    <span>Rank #{universityWorldRank}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={18} className="text-gray-400" />
                    <span>{universityCity}, {universityCountry}</span>
                  </div>
                </div>
                <div className="mt-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <CheckCircle2 className="text-green-500" /> About Scholarship
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                    {scholarshipDescription}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PerkCard icon={<DollarSign color="#10b981"/>} title="Stipend" value={stipend > 0 ? `$${stipend.toLocaleString()}` : 'Full Funded'} />
                <PerkCard icon={<Calendar color="#ef4444"/>} title="Deadline" value={applicationDeadline ? format(new Date(applicationDeadline), 'MMM dd, yyyy') : 'Open'} />
                <PerkCard icon={<Clock color="#6366f1"/>} title="Subject" value={subjectCategory} />
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-[2.5rem] p-8 shadow-xl border border-indigo-50">
                <h4 className="text-xl font-bold text-gray-900 mb-8 text-center">Application Summary</h4>
                <div className="space-y-5 mb-8">
                  <PriceRow label="University Fee" value={`$${applicationFees}`} />
                  <PriceRow label="Service Charge" value={`$${serviceCharge}`} />
                  <div className="pt-4 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 font-bold">Total Payable</span>
                      <span className="text-3xl font-black text-indigo-600">${totalApplicationCost}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => setIsOpen(true)}
                  label="Apply Now"
                  className="w-full py-5 rounded-2xl text-lg font-bold bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 shadow-2xl transition-all"
                />
                <p className="text-center text-xs text-gray-400 mt-6">
                  🔒 Secure Payment via Stripe
                </p>
              </div>
            </motion.div>
          </div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-24 bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-sm"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-gray-900">Student Reviews</h2>

              {/* Write Review Button */}
              {!user ? (
                <div className="text-gray-500 bg-gray-50 px-6 py-4 rounded-2xl flex items-center gap-3">
                  <LogIn size={20} />
                  <span>Please log in to write a review</span>
                </div>
              ) : !showReviewForm ? (
                <Button
                  label="Write a Review"
                  onClick={() => setShowReviewForm(true)}
                  className="px-6 py-3 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 font-medium rounded-xl"
                />
              ) : null}
            </div>

            {/* Average Rating */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-gray-100 pb-8">
              <div className="text-center">
                <p className="text-6xl font-black text-gray-900">{averageRating.toFixed(1)}</p>
                <p className="text-lg text-gray-500">out of 5</p>
                <p className="text-sm text-gray-400 mt-1">{totalReviews} reviews</p>
              </div>
              <div className="flex-1 max-w-md">
                {[...Array(5)].reverse().map((_, i) => {
                  const ratingValue = 5 - i;
                  const percentage = totalReviews > 0
                    ? (reviews.filter(r => r.ratingPoint === ratingValue).length / totalReviews) * 100
                    : 0;
                  return (
                    <div key={i} className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-600 w-8">{ratingValue} ⭐</span>
                      <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className="h-full bg-amber-400"
                        />
                      </div>
                      <span className="text-sm text-gray-500 w-12 text-right">{percentage.toFixed(0)}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review Form */}
            <AnimatePresence>
              {showReviewForm && user && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-12 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 md:p-8 rounded-3xl border border-indigo-100"
                >
                  {/* User Info */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-indigo-200">
                    <img
                      src={user.photoURL || '/default-avatar.png'}
                      alt={user.displayName}
                      className="w-14 h-14 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <p className="font-bold text-gray-900">Writing as</p>
                      <p className="text-lg font-semibold text-indigo-700">{user.displayName || 'Anonymous User'}</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Rating *</label>
                      <select
                        {...register('rating', { required: 'Rating is required' })}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-base"
                      >
                        <option value="">Choose a rating</option>
                        {[5,4,3,2,1].map(n => (
                          <option key={n} value={n}>{n} Star{ n > 1 ? 's' : ''}</option>
                        ))}
                      </select>
                      {errors.rating && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle size={16}/> {errors.rating.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Your Review *</label>
                      <textarea
                        {...register('comment', { 
                          required: 'Review is required', 
                          minLength: { value: 20, message: 'Minimum 20 characters required' }
                        })}
                        rows={5}
                        className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all resize-none text-base"
                        placeholder="Share your honest experience about this scholarship..."
                      />
                      {errors.comment && <p className="text-red-500 text-sm mt-2 flex items-center gap-1"><AlertCircle size={16}/> {errors.comment.message}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        type="submit"
                        label={addReviewMutation.isPending ? 'Submitting...' : 'Submit Review'}
                        disabled={addReviewMutation.isPending}
                        className="flex-1 py-4 text-lg font-bold"
                      />
                      <Button
                        label="Cancel"
                        onClick={() => {
                          setShowReviewForm(false);
                          reset();
                        }}
                        className="flex-1 bg-gray-200 text-gray-700 hover:bg-gray-300 py-4 text-lg font-bold"
                      />
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reviews List */}
            <div className="space-y-10">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-50 to-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-md hover:shadow-xl transition-all"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <img
                          src={review.userImage || '/default-avatar.png'}
                          alt={review.userName}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{review.userName || 'Anonymous'}</h4>
                            <p className="text-sm text-gray-500">
                              {format(new Date(review.reviewDate), 'MMMM dd, yyyy')}
                            </p>
                            {/* Fallback for scholarship name */}
                            <p className="text-xs text-indigo-600 mt-1 italic">
                              Reviewed: {review.scholarshipName || scholarship.scholarshipName || 'Unknown Scholarship'}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={20}
                                className={i < review.ratingPoint ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-base leading-relaxed">
                          {review.reviewComment}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Star size={40} className="text-gray-400" />
                  </div>
                  <p className="text-2xl font-bold text-gray-700 mb-2">No reviews yet</p>
                  <p className="text-gray-500">Be the first to share your experience!</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </Container>

      <PurchaseModal
        scholarship={scholarship}
        closeModal={closeModal}
        isOpen={isOpen}
        totalCost={totalApplicationCost}
      />
    </div>
  );
};

const PerkCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all">
    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center mb-5">
      {icon}
    </div>
    <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{title}</p>
    <p className="text-2xl font-black text-gray-900 mt-2">{value}</p>
  </div>
);

const PriceRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-700 font-medium text-lg py-3 border-b border-gray-100 last:border-0">
    <span>{label}</span>
    <span className="font-bold text-gray-900">{value}</span>
  </div>
);

export default ScholarshipDetails;