// src/components/Dashboard/ManageApplicationsTable.jsx

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { FaInfoCircle, FaCommentDots, FaTimes, FaCheckCircle, FaHourglassHalf, FaBan } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageApplicationsTable = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Fetch all applications
  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ['allApplications'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/applications/all');
      return data;
    },
    onError: () => toast.error('Failed to load applications'),
  });

  // Update Status Mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/applications/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allApplications']);
      toast.success('Status updated successfully!');
    },
    onError: () => toast.error('Failed to update status'),
  });

  // Save Feedback Mutation
  const saveFeedbackMutation = useMutation({
    mutationFn: async ({ id, feedback }) => {
      await axiosSecure.patch(`/applications/${id}/feedback`, { feedback });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allApplications']);
      toast.success('Feedback saved successfully!');
      setIsFeedbackOpen(false);
      setFeedback('');
    },
    onError: () => toast.error('Failed to save feedback'),
  });

  const handleUpdateStatus = (id, status) => {
    updateStatusMutation.mutate({ id, status });
  };

  const handleSaveFeedback = (id) => {
    if (!feedback.trim()) {
      toast.error('Feedback cannot be empty');
      return;
    }
    saveFeedbackMutation.mutate({ id, feedback });
  };

  const openDetails = (app) => {
    setSelected(app);
    setIsDetailsOpen(true);
  };

  const openFeedback = (app) => {
    setSelected(app);
    setFeedback(app.feedback || '');
    setIsFeedbackOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <TbFidgetSpinner className="w-16 h-16 animate-spin text-purple-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-semibold">Loading applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <p className="text-red-600 font-bold">Error loading applications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-2 sm:p-4 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 sm:mb-6 lg:mb-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border border-purple-100">
          <h1 className="text-xl sm:text-2xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
            Manage Applications
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
            Review and update student applications • Total: {applications.length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {applications.length === 0 && !isLoading && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-purple-100">
            <div className="text-6xl sm:text-8xl mb-4">📝</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Applications Yet</h3>
            <p className="text-gray-600 text-sm sm:text-base">Applications will appear here once submitted by students.</p>
          </div>
        </div>
      )}

      {/* Table - Desktop (lg and above) */}
      <div className="max-w-7xl mx-auto hidden lg:block">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100">
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Applicant
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Feedback
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-center text-xs font-black text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app, index) => (
                  <tr 
                    key={app._id} 
                    className={`hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="font-bold text-gray-900 text-sm xl:text-base">{app.applicant.name}</div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4 text-sm xl:text-base text-gray-600">{app.applicant.email}</td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4 text-sm xl:text-base text-gray-900">{app.universityName}</td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4 text-sm xl:text-base text-gray-600 truncate max-w-xs">
                      {app.feedback || 'No feedback'}
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        app.status === 'completed' ? 'bg-green-100 text-green-600' :
                        app.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-600' :
                        'bg-yellow-100 text-yellow-600'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        app.paymentStatus === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {app.paymentStatus.charAt(0).toUpperCase() + app.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openDetails(app)}
                          className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all shadow-md hover:shadow-xl"
                          title="Details"
                        >
                          <FaInfoCircle />
                        </button>
                        <button
                          onClick={() => openFeedback(app)}
                          className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-xl"
                          title="Feedback"
                        >
                          <FaCommentDots />
                        </button>
                        <select
                          value={app.status}
                          onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                          className="px-2 py-2 bg-gray-100 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-purple-300"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={() => handleUpdateStatus(app._id, 'rejected')}
                          className="p-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-md hover:shadow-xl"
                          title="Reject"
                        >
                          <FaBan />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Cards - Mobile & Tablet (below lg) */}
      <div className="max-w-7xl mx-auto lg:hidden space-y-4">
        {applications.map((app) => (
          <div 
            key={app._id}
            className="bg-white rounded-2xl shadow-lg border border-purple-100 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex items-center space-x-4 text-white">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                👤
              </div>
              <div>
                <h3 className="font-bold text-lg">{app.applicant.name}</h3>
                <p className="text-sm opacity-90">{app.universityName}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 font-semibold">Email</p>
                  <p className="font-medium truncate">{app.applicant.email}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Feedback</p>
                  <p className="font-medium truncate">{app.feedback || 'None'}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Status</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.status === 'completed' ? 'bg-green-100 text-green-600' :
                    app.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                    app.status === 'rejected' ? 'bg-red-100 text-red-600' :
                    'bg-yellow-100 text-yellow-600'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold">Payment</p>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    app.paymentStatus === 'paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {app.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => openDetails(app)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-bold text-sm hover:from-blue-600 hover:to-purple-600 transition-all shadow-md active:scale-95"
                >
                  Details
                </button>
                <button
                  onClick={() => openFeedback(app)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-bold text-sm hover:from-green-600 hover:to-emerald-600 transition-all shadow-md active:scale-95"
                >
                  Feedback
                </button>
                <button
                  onClick={() => handleUpdateStatus(app._id, 'rejected')}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-bold text-sm hover:from-red-600 hover:to-pink-600 transition-all shadow-md active:scale-95"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {isDetailsOpen && selected && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsDetailsOpen(false)}
            ></div>

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-6 md:p-8 overflow-y-auto max-h-[90vh]">
              <button
                onClick={() => setIsDetailsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Application Details</h2>

              <div className="space-y-4 text-sm md:text-base">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-500 font-semibold">Applicant Name</p>
                    <p className="text-gray-900 font-bold">{selected.applicant.name}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Email</p>
                    <p className="text-gray-900 font-bold">{selected.applicant.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">University</p>
                    <p className="text-gray-900 font-bold">{selected.universityName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Degree</p>
                    <p className="text-gray-900 font-bold">{selected.degree}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Total Fee</p>
                    <p className="text-purple-600 font-bold">${selected.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 font-semibold">Status</p>
                    <p className="text-gray-900 font-bold">{selected.status}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-gray-500 font-semibold">Feedback</p>
                  <p className="text-gray-900">{selected.feedback || 'No feedback yet'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {isFeedbackOpen && selected && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsFeedbackOpen(false)}
            ></div>

            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 md:p-8">
              <button
                onClick={() => setIsFeedbackOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={24} />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Feedback</h2>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none text-gray-900"
                placeholder="Enter your feedback here..."
              />

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setIsFeedbackOpen(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleSaveFeedback(selected._id)}
                  disabled={saveFeedbackMutation.isPending}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-600 transition-all active:scale-95 disabled:opacity-50"
                >
                  {saveFeedbackMutation.isPending ? 'Saving...' : 'Save Feedback'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplicationsTable;