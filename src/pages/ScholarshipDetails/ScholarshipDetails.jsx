'use client';

import React, { useState, useEffect } from 'react';
import Container from '../../components/Shared/Container';
import Button from '../../components/Shared/Button/Button';
import PurchaseModal from '../../components/Shared/Modal/PurchaseModal';
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
import { useForm, useWatch } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ScholarshipDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm({
    defaultValues: { rating: 0, comment: '' }
  });

  const selectedRating = useWatch({ control, name: 'rating' });

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
        { headers: { Authorization: `Bearer ${idToken}` } }
      );
      return result.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['reviews', id]);
      reset();
      setShowReviewForm(false);
      toast.success('Thank you for your review!', { icon: '⭐' });
    },
  });

  const onSubmitReview = (data) => {
    if (!user) return toast.error('Please log in first');
    addReviewMutation.mutate({
      scholarshipId: id,
      scholarshipName: scholarship.scholarshipName,
      userName: user.displayName || 'Anonymous',
      userImage: user.photoURL || '',
      ratingPoint: parseInt(data.rating),
      reviewComment: data.comment,
      universityName: scholarship.universityName,
      reviewDate: new Date().toISOString()
    });
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (isLoading) return <LoadingSpinner />;
  if (isError || !scholarship?._id) {
    return (
      <Container>
        <div className="py-20 text-center">
          <h2 className="text-2xl font-bold">Scholarship Not Found</h2>
          <Button label="Go Back" onClick={() => navigate(-1)} className="mt-4" />
        </div>
      </Container>
    );
  }

  const {
    universityImage, scholarshipName, universityName, universityWorldRank,
    universityCountry, universityCity, applicationDeadline, applicationFees = 0,
    serviceCharge = 0, scholarshipDescription, stipend = 0, degree,
    scholarshipCategory, subjectCategory, tuitionFees = 0
  } = scholarship;

  const totalCost = Number(applicationFees) + Number(serviceCharge);
  const reviews = reviewsData.reviews || [];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section - Optimized for Mobile */}
      <div className="relative h-[350px] md:h-[500px] lg:h-[600px] w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          src={universityImage}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 w-full p-6 md:p-12 text-white">
          <Container>
            <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl md:text-5xl font-black">
              {scholarshipName}
            </motion.h1>
            <p className="text-lg md:text-2xl font-medium mt-2 opacity-90">{universityName}</p>
          </Container>
        </div>
      </div>

      <Container>
        <div className="relative -mt-12 md:-mt-20 z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <PerkCard icon={<Globe className="text-indigo-600" />} title="World Rank" value={`#${universityWorldRank}`} />
                <PerkCard icon={<MapPin className="text-purple-600" />} title="Location" value={`${universityCity}, ${universityCountry}`} />
                <PerkCard icon={<GraduationCap className="text-pink-600" />} title="Degree" value={degree} />
                <PerkCard icon={<Calendar className="text-red-600" />} title="Deadline" value={applicationDeadline ? format(new Date(applicationDeadline), 'MMM dd, yyyy') : 'N/A'} />
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-bold flex items-center gap-2 mb-4">
                  <CheckCircle2 className="text-green-500" /> Description
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{scholarshipDescription}</p>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold flex items-center gap-2"><Star className="text-amber-500 fill-amber-500" /> Reviews</h3>
                {user && (
                  <button onClick={() => setShowReviewForm(!showReviewForm)} className="text-indigo-600 font-semibold text-sm">
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {showReviewForm && (
                  <motion.form 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    onSubmit={handleSubmit(onSubmitReview)} className="mb-10 p-6 bg-slate-50 rounded-2xl space-y-4 overflow-hidden"
                  >
                    <div className="flex gap-2 justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} size={28} onClick={() => setValue('rating', s)}
                          className={`cursor-pointer transition-colors ${s <= selectedRating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <textarea 
                      {...register('comment', { required: true, minLength: 10 })}
                      placeholder="Share your thoughts..." className="w-full p-4 rounded-xl border-none ring-1 ring-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" rows={3}
                    />
                    <Button type="submit" label="Post Review" className="w-full" disabled={addReviewMutation.isLoading} />
                  </motion.form>
                )}
              </AnimatePresence>

              <div className="space-y-6">
                {reviews.map((rev) => (
                  <div key={rev._id} className="border-b border-gray-100 pb-6 last:border-0">
                    <div className="flex gap-4 items-start">
                      <img src={rev.userImage || '/default-avatar.png'} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-gray-900">{rev.userName}</h4>
                        <div className="flex gap-1 my-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < rev.ratingPoint ? 'fill-amber-400 text-amber-400' : 'text-gray-200'} />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm mt-2">{rev.reviewComment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Application Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-2xl shadow-indigo-200">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><DollarSign /> Cost Summary</h3>
              <div className="space-y-4">
                <PriceRow label="Tuition Fees" value={`$${tuitionFees}`} />
                <PriceRow label="Application Fee" value={`$${applicationFees}`} />
                <PriceRow label="Service Charge" value={`$${serviceCharge}`} />
                <div className="pt-4 border-t border-indigo-400 flex justify-between items-center">
                  <span className="text-lg font-medium">Total Payable</span>
                  <span className="text-2xl font-black">${totalCost}</span>
                </div>
                <button 
                  onClick={() => setIsOpen(true)}
                  className="w-full bg-white text-indigo-600 font-bold py-4 rounded-2xl mt-4 hover:scale-[1.02] transition-transform shadow-lg"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <PurchaseModal scholarship={scholarship} closeModal={() => setIsOpen(false)} isOpen={isOpen} totalCost={totalCost} />
    </div>
  );
};

const PerkCard = ({ icon, title, value }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-50">
    <div className="p-2 bg-white rounded-xl shadow-sm">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{title}</p>
      <p className="text-sm md:text-base font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const PriceRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm opacity-90 border-b border-indigo-500/30 pb-2">
    <span>{label}</span>
    <span className="font-bold">{value}</span>
  </div>
);

export default ScholarshipDetails;