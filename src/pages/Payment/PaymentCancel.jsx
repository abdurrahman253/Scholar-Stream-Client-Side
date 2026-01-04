import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Error Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4">
                    <svg className="w-10 h-10 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Failed</h1>
                <p className="text-gray-600 mb-6">
                    Your payment was not completed. Don't worry, you can try again from your dashboard.
                </p>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-yellow-800">
                        <strong>Note:</strong> Your application has been saved. You can retry the payment from your dashboard.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                   <button
                  onClick={() => navigate('/dashboard', { state: { section: 'my-applications' } })}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600 transition font-semibold shadow-lg"
                   >
                   Go to Dashboard & Retry
                 </button>
                    <button
                        onClick={() => navigate('/all-scholarships')}
                        className="w-full bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
                    >
                        Browse Scholarships
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentCancel;