'use client';

import React, { useState, useEffect } from 'react';
import Container from '../../components/Shared/Container';
import Heading from '../../components/Shared/Heading';
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
  Send, AlertCircle, LogIn
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';

const ScholarshipDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false); // Success message state
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
      setShowReviewForm(false);
      reset();
      setReviewSuccess(true); // Show success message
      setTimeout(() => setReviewSuccess(false), 5000); // Hide after 5 seconds
    },
    onError: (error) => {
      console.error('Review submission failed:', error);
    },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmitReview = (data) => {
    if (!user) return;
    addReviewMutation.mutate({
      scholarshipId: id,
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
      {/* Hero Section with Parallax-like Image */}
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
            {/* Left Column: Main Info */}
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
                <PerkCard icon={<DollarSign color="#10b981"/>} title="Stipend" value={stipend > 0 ? `$${stipend.toLocaleString()}` : 'Full'} />
                <PerkCard icon={<Calendar color="#ef4444"/>} title="Deadline" value={applicationDeadline ? format(new Date(applicationDeadline), 'MMM dd, yy') : 'Open'} />
                <PerkCard icon={<Clock color="#6366f1"/>} title="Subject" value={subjectCategory} />
              </div>
            </motion.div>

            {/* Right Column: Pricing & Action */}
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
                  🔒 Secure Payment via Stripe/SSLCommerz
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

              {/* Login Prompt or Write Review Button */}
              {!user ? (
                <div className="text-center text-gray-500 bg-gray-50 px-6 py-4 rounded-2xl flex items-center gap-3">
                  <LogIn size={20} />
                  <span>Please log in to write a review</span>
                </div>
              ) : !showReviewForm && (
                <Button
                  label="Write a Review"
                  onClick={() => setShowReviewForm(true)}
                  className="px-6 py-3 bg-indigo-100 text-indigo-600 hover:bg-indigo-200 font-medium"
                />
              )}
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {reviewSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-8 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-2xl flex items-center gap-3"
                >
                  <CheckCircle2 size={24} />
                  <span className="font-medium">Thank you! Your review has been submitted successfully.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Average Rating */}
            <div className="flex items-center gap-6 mb-12 border-b border-gray-100 pb-8">
              <div className="text-center">
                <p className="text-5xl font-black text-gray-900">{averageRating.toFixed(1)}</p>
                <p className="text-sm text-gray-500">out of 5</p>
              </div>
              <div className="flex flex-col gap-1">
                {[...Array(5)].reverse().map((_, i) => {
                  const ratingValue = 5 - i;
                  const percentage = (reviews.filter(r => r.ratingPoint === ratingValue).length / totalReviews) * 100 || 0;
                  return (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{ratingValue} ★</span>
                      <div className="w-48 h-2 bg-gray-200 rounded-full">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                      <span className="text-sm text-gray-500">{percentage.toFixed(0)}%</span>
                    </div>
                  );
                })}
              </div>
              <p className="text-gray-500">{totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}</p>
            </div>

            {/* Review Form */}
            <AnimatePresence>
              {showReviewForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-12 bg-gray-50 p-6 rounded-2xl"
                >
                  <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                      <select
                        {...register('rating', { required: true })}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-indigo-500"
                      >
                        <option value="">Select rating</option>
                        {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
                      </select>
                      {errors.rating && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14}/> Required</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                      <textarea
                        {...register('comment', { required: true, minLength: 20 })}
                        rows={4}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:border-indigo-500"
                        placeholder="Share your experience..."
                      />
                      {errors.comment && <p className="text-red-500 text-sm mt-1 flex items-center gap-1"><AlertCircle size={14}/> Minimum 20 characters</p>}
                    </div>
                    <div className="flex gap-4">
                      <Button
                        type="submit"
                        label={addReviewMutation.isLoading ? 'Submitting...' : 'Submit Review'}
                        disabled={addReviewMutation.isLoading}
                        className="flex-1"
                      />
                      <Button
                        label="Cancel"
                        onClick={() => setShowReviewForm(false)}
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200"
                      />
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reviews List */}
            <div className="space-y-8">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <motion.div
                    key={review._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-gray-100 pb-8 last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {review.userImage ? (
                          <img
                            src={review.userImage}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 shadow-sm"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                            <User size={24} className="text-indigo-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{review.userName}</h4>
                            <p className="text-sm text-gray-500">
                              {format(new Date(review.reviewDate), 'MMMM dd, yyyy')}
                            </p>
                          </div>
                          <div className="flex gap-0.5 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                fill={i < review.ratingPoint ? "currentColor" : "none"}
                                strokeWidth={2}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed mt-2">{review.reviewComment}</p>
                        {review.universityName && (
                          <p className="text-xs text-gray-400 mt-2 italic">
                            Reviewed for {review.universityName}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star size={32} className="text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-lg">No reviews yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Be the first to share your experience!
                  </p>
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
  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center mb-4">
      {icon}
    </div>
    <p className="text-sm text-gray-500 font-medium">{title}</p>
    <p className="text-xl font-bold text-gray-900">{value}</p>
  </div>
);

const PriceRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-600 font-medium text-lg">
    <span>{label}</span>
    <span className="text-gray-900 font-bold">{value}</span>
  </div>
);

export default ScholarshipDetails;