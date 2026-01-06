// src/pages/Payment/PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [paymentData, setPaymentData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            if (!sessionId) {
                setError('No payment session found');
                setLoading(false);
                return;
            }

            try {
                const token = await user.getIdToken();
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/verify-payment/${sessionId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.success) {
                    setPaymentData(response.data);
                } else {
                    setError('Payment verification failed');
                }
            } catch (err) {
                console.error('Payment verification error:', err);
                setError(err.response?.data?.message || 'Failed to verify payment');
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [sessionId, user]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying payment...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                    <div className="text-pink-600 text-5xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-red-800 mb-2">Payment Error</h2>
                    <p className="text-pink-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/dashboard', { state: { section: 'my-applications' } })} 
                        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
                    >
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Success Icon */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
                    <p className="text-gray-600">Your scholarship application has been submitted</p>
                </div>

                {/* Payment Details */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Details</h3>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Scholarship:</span>
                            <span className="font-semibold text-gray-800">
                                {paymentData?.application?.scholarshipName}
                            </span>
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="text-gray-600">University:</span>
                            <span className="font-semibold text-gray-800">
                                {paymentData?.application?.universityName}
                            </span>
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="text-gray-600">Degree:</span>
                            <span className="font-semibold text-gray-800">
                                {paymentData?.application?.degree}
                            </span>
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="text-gray-600">Subject:</span>
                            <span className="font-semibold text-gray-800">
                                {paymentData?.application?.subjectCategory}
                            </span>
                        </div>
                        
                        <div className="flex justify-between border-t pt-3 mt-3">
                            <span className="text-gray-600">Application Fee:</span>
                            <span className="font-medium text-gray-800">
                                ${paymentData?.application?.applicationFees}
                            </span>
                        </div>
                        
                        <div className="flex justify-between">
                            <span className="text-gray-600">Service Charge:</span>
                            <span className="font-medium text-gray-800">
                                ${paymentData?.application?.serviceCharge}
                            </span>
                        </div>
                        
                        <div className="flex justify-between border-t pt-3 mt-3">
                            <span className="text-lg font-semibold text-gray-800">Total Paid:</span>
                            <span className="text-lg font-bold text-green-600">
                                ${paymentData?.amountPaid}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate('/dashboard', { state: { section: 'my-applications' } })} 
                        className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
                    >
                        Go to My Applications
                    </button>
                    <button
                        onClick={() => navigate('/all-scholarships')} 
                        className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                    >
                        Browse More Scholarships
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;