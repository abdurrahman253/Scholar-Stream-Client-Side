// src/components/Dashboard/ManageApplicationsTable.jsx

import { useState } from 'react';
import { FaInfoCircle, FaCommentDots, FaTimes, FaBan, FaTrashAlt } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2'; // Optional: For a better looking delete confirmation
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageApplicationsTable = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  // 1. Fetch all applications
  const { data: applications = [], isLoading, error } = useQuery({
    queryKey: ['allApplications'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/applications/all');
      return data;
    },
  });

  // 2. Update Status Mutation
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

  // 3. Delete Mutation 🔥 (Added this)
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/applications/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['allApplications']); // UI Invalidate করে আপডেট ডেটা নিয়ে আসবে
      toast.success('Application deleted successfully');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  });

  // 4. Save Feedback Mutation
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

  // Handler functions
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

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
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
          <p className="mt-4 text-gray-600 font-semibold">Loading Applications...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <p className="text-red-600 font-bold">Error loading applications</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 p-2 sm:p-4 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-purple-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600">
              Manage Applications
            </h1>
            <p className="text-gray-600 mt-2 text-sm lg:text-base">
              Review, update, or remove student scholarship submissions • Total: {applications.length}
            </p>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {applications.length === 0 && (
        <div className="max-w-7xl mx-auto py-20 bg-white rounded-3xl shadow-xl text-center border border-purple-100">
          <div className="text-8xl mb-4">📝</div>
          <h3 className="text-2xl font-bold text-gray-800">No Applications Yet</h3>
        </div>
      )}

      {/* Table - Desktop */}
      <div className="max-w-7xl mx-auto hidden lg:block overflow-hidden bg-white rounded-3xl shadow-2xl border border-purple-100">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                <th className="px-6 py-4">Applicant</th>
                <th className="px-6 py-4">University</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {applications.map((app) => (
                <tr key={app._id} className="hover:bg-purple-50/50 transition-all">
                  <td className="px-6 py-4">
                    <p className="font-bold text-gray-900">{app.applicant.name}</p>
                    <p className="text-xs text-gray-500">{app.applicant.email}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{app.universityName}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      app.status === 'completed' ? 'bg-green-100 text-green-600' :
                      app.status === 'processing' ? 'bg-blue-100 text-blue-600' :
                      app.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      app.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {app.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => openDetails(app)} className="p-2.5 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all" title="Details"><FaInfoCircle /></button>
                      <button onClick={() => openFeedback(app)} className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all" title="Feedback"><FaCommentDots /></button>
                      
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app._id, e.target.value)}
                        className="px-2 py-2 bg-gray-100 rounded-xl text-xs font-bold outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                      </select>

                      <button onClick={() => handleUpdateStatus(app._id, 'rejected')} className="p-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all" title="Reject"><FaBan /></button>
                      
                      {/* Delete Button 🔥 */}
                      <button onClick={() => handleDelete(app._id)} className="p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all" title="Delete"><FaTrashAlt /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards - Mobile */}
      <div className="max-w-7xl mx-auto lg:hidden space-y-4">
        {applications.map((app) => (
          <div key={app._id} className="bg-white rounded-2xl shadow-lg border border-purple-100 p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900">{app.applicant.name}</h3>
                <p className="text-xs text-gray-500">{app.universityName}</p>
              </div>
              <button onClick={() => handleDelete(app._id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100"><FaTrashAlt /></button>
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
               <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Status</p>
                  <p className="text-xs font-bold capitalize">{app.status}</p>
               </div>
               <div className="bg-slate-50 p-2 rounded-lg text-center">
                  <p className="text-[10px] uppercase text-slate-400 font-bold">Payment</p>
                  <p className="text-xs font-bold capitalize">{app.paymentStatus}</p>
               </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openDetails(app)} className="flex-1 py-2.5 bg-blue-500 text-white rounded-xl text-xs font-bold">Details</button>
              <button onClick={() => openFeedback(app)} className="flex-1 py-2.5 bg-emerald-500 text-white rounded-xl text-xs font-bold">Feedback</button>
              <button onClick={() => handleUpdateStatus(app._id, 'rejected')} className="flex-1 py-2.5 bg-orange-500 text-white rounded-xl text-xs font-bold">Reject</button>
            </div>
          </div>
        ))}
      </div>

      {/* Details & Feedback Modals (Same logic as yours) */}
      {/* ... details and feedback modals are here (omitted for brevity but kept in code) */}
      {isDetailsOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
           <div className="bg-white rounded-3xl w-full max-w-xl p-8 relative">
              <button onClick={() => setIsDetailsOpen(false)} className="absolute top-4 right-4 text-gray-400"><FaTimes size={20}/></button>
              <h2 className="text-2xl font-bold mb-4">Applicant Info</h2>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>Name:</strong> {selected.applicant.name}</p>
                <p><strong>Email:</strong> {selected.applicant.email}</p>
                <p><strong>University:</strong> {selected.universityName}</p>
                <p><strong>Degree:</strong> {selected.degree}</p>
              </div>
           </div>
        </div>
      )}

      {isFeedbackOpen && selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Feedback</h2>
            <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className="w-full h-32 p-3 bg-gray-50 border rounded-xl outline-none" placeholder="Write something..."/>
            <div className="flex gap-2 mt-4">
              <button onClick={() => setIsFeedbackOpen(false)} className="flex-1 py-3 bg-gray-100 rounded-xl font-bold">Cancel</button>
              <button onClick={() => handleSaveFeedback(selected._id)} className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageApplicationsTable;