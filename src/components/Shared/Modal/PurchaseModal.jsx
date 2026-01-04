import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { X, CheckCircle2, CreditCard, Shield, Calendar, DollarSign, Award, GraduationCap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import toast from 'react-hot-toast'
import useAuth from '../../../hooks/useAuth'

const PurchaseModal = ({ closeModal, isOpen, scholarship, totalCost }) => {
  const { user } = useAuth()
  
  const {
    _id,
    scholarshipName,
    universityName,
    universityImage,
    applicationFees,
    serviceCharge,
    applicationDeadline,
    scholarshipCategory,
    degree,
    universityCountry,
    universityCity,
    subjectCategory,
    scholarshipDescription
  } = scholarship || {}

  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue')
      return
    }

    try {
      // Get Firebase ID token
      const idToken = await user.getIdToken()

      const paymentInfo = {
        // Scholarship Information
        scholarshipId: _id,
        scholarshipName,
        universityName,
        universityImage,
        universityCountry,
        universityCity,
        degree,
        subjectCategory,
        scholarshipCategory,
        
        // Pricing Details
        applicationFees: Number(applicationFees),
        serviceCharge: Number(serviceCharge),
        totalAmount: totalCost,
        
        // Applicant Information
        applicant: {
          name: user?.displayName || 'Anonymous',
          email: user?.email,
          image: user?.photoURL || '',
        },
        
        // Additional Details
        applicationDeadline,
        applicationDate: new Date().toISOString(),
        status: 'pending', // pending, paid, processing, completed
      }

      // Send to backend for Stripe checkout with Authorization header
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-checkout-session`,
        paymentInfo,
        {
          headers: {
            Authorization: `Bearer ${idToken}`
          }
        }
      )
      
      // Redirect to Stripe payment page
      if (data.url) {
        window.location.href = data.url
      } else {
        toast.error('Failed to initiate payment')
      }
    } catch (error) {
      console.error('Payment error:', error)
      toast.error(error.response?.data?.message || 'Payment failed. Please try again.')
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          as={motion.div}
          className="relative z-50"
          onClose={closeModal}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
              >
                {/* Header with Image */}
                <div className="relative h-32 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
                  {universityImage && (
                    <img
                      src={universityImage}
                      alt={universityName}
                      className="w-full h-full object-cover opacity-30"
                    />
                  )}
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-all"
                  >
                    <X className="text-gray-900" size={20} />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
                    <DialogTitle className="text-2xl font-black text-gray-900">
                      Review Your Application
                    </DialogTitle>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  {/* Scholarship Info */}
                  <div className="mb-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="text-indigo-600" size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {scholarshipName}
                        </h3>
                        <p className="text-gray-600 font-medium">{universityName}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {degree && (
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">
                              {degree}
                            </span>
                          )}
                          {scholarshipCategory && (
                            <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold">
                              {scholarshipCategory}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Deadline Alert */}
                    {applicationDeadline && (
                      <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                        <Calendar className="text-blue-600 flex-shrink-0" size={20} />
                        <div>
                          <p className="text-sm font-semibold text-blue-900">Application Deadline</p>
                          <p className="text-xs text-blue-700">
                            {new Date(applicationDeadline).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cost Breakdown */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <DollarSign size={20} className="text-green-600" />
                      Payment Summary
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium">University Application Fee</span>
                        <span className="font-bold text-gray-900">${applicationFees}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium">Service Charge</span>
                        <span className="font-bold text-gray-900">${serviceCharge}</span>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Total Amount</span>
                          <span className="text-3xl font-black text-indigo-600">
                            ${totalCost}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl mb-6">
                    <Shield className="text-green-600" size={20} />
                    <p className="text-sm font-semibold text-green-900">
                      Secure Payment • Your data is protected with 256-bit SSL encryption
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handlePayment}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-gray-900 font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                      <CreditCard size={20} />
                      Proceed to Payment
                    </button>
                    
                    <button
                      onClick={closeModal}
                      className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Payment Methods */}
                  <div className="mt-6 text-center">
                    <p className="text-xs text-gray-500 mb-3">We accept</p>
                    <div className="flex items-center justify-center gap-4 flex-wrap">
                      <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                        Stripe
                      </div>
                      <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                        SSLCommerz
                      </div>
                      <div className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                        Visa/Mastercard
                      </div>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default PurchaseModal