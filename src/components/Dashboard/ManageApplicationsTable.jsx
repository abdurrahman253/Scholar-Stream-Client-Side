// src/components/Dashboard/ManageApplicationsTable.jsx
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

const ManageApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch('/applications/all') // backend route for all applications
      .then(res => res.json())
      .then(data => setApplications(data));
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/applications/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    setApplications(applications.map(a => a._id === id ? { ...a, status } : a));
  };

  const saveFeedback = async (id) => {
    await fetch(`/applications/${id}/feedback`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ feedback })
    });
    setApplications(applications.map(a => a._id === id ? { ...a, feedback } : a));
    setIsFeedbackOpen(false);
    setFeedback('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">Manage Applied Applications</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-purple-50">
            <tr>
              <th className="p-4">Applicant</th>
              <th className="p-4">Email</th>
              <th className="p-4">University</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-t border-gray-700 hover:bg-purple-50">
                <td className="p-4">{app.applicant.name}</td>
                <td className="p-4">{app.applicant.email}</td>
                <td className="p-4">{app.universityName}</td>
                <td className="p-4">{app.status}</td>
                <td className="p-4">{app.paymentStatus}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => { setSelected(app); setIsDetailsOpen(true); }} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-blue-700 px-3 py-1 rounded">Details</button>
                  <button onClick={() => { setSelected(app); setIsFeedbackOpen(true); }} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded">Feedback</button>
                  <select
                    value={app.status}
                    onChange={e => updateStatus(app._id, e.target.value)}
                    className="bg-gray-600 px-2 py-1 rounded"
                  >
                    <option>pending</option>
                    <option>processing</option>
                    <option>completed</option>
                    <option>rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Dialog open={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          <div className="bg-white p-8 rounded-lg shadow-2xl max-w-2xl w-full mx-4">
            <Dialog.Title className="text-2xl font-bold text-purple-600 mb-4">Application Details</Dialog.Title>
            {selected && (
              <div className="space-y-3 text-gray-900">
                <p><strong>Applicant:</strong> {selected.applicant.name}</p>
                <p><strong>University:</strong> {selected.universityName}</p>
                <p><strong>Degree:</strong> {selected.degree}</p>
                <p><strong>Fees:</strong> ${selected.totalAmount}</p>
                <p><strong>Status:</strong> {selected.status}</p>
                <p><strong>Feedback:</strong> {selected.feedback || 'No feedback yet'}</p>
              </div>
            )}
            <button onClick={() => setIsDetailsOpen(false)} className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Close</button>
          </div>
        </div>
      </Dialog>

      {/* Feedback Modal */}
      <Dialog open={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-4">
            <Dialog.Title className="text-xl font-bold text-purple-600 mb-4">Write Feedback</Dialog.Title>
            <textarea
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
              className="w-full h-32 p-3 bg-purple-50 rounded text-gray-900"
              placeholder="Enter feedback..."
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button onClick={() => setIsFeedbackOpen(false)} className="px-4 py-2 bg-gray-600 rounded hover:bg-purple-50">Cancel</button>
              <button onClick={() => saveFeedback(selected?._id)} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageApplicationsTable;