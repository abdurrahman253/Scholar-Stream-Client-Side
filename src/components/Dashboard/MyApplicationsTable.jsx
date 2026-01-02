// src/components/Dashboard/MyApplicationsTable.jsx
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

const MyApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch('/my-applications')
      .then(res => res.json())
      .then(data => setApplications(data.applications || []));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/applications/${id}`, { method: 'DELETE' });
    setApplications(applications.filter(a => a._id !== id));
  };

  const handlePay = (app) => {
    // Retry payment – use existing /retry-payment route
    fetch(`/retry-payment/${app._id}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.url) window.location.href = data.url;
      });
  };

  const submitReview = async () => {
    await fetch('/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        scholarshipId: selected.scholarshipId,
        ratingPoint: rating,
        reviewComment: comment
      })
    });
    setIsReviewOpen(false);
    setComment('');
    setRating(5);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">My Applications</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-purple-50">
            <tr>
              <th className="p-4">University</th>
              <th className="p-4">Subject</th>
              <th className="p-4">Fees</th>
              <th className="p-4">Status</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id} className="border-t border-gray-700 hover:bg-purple-50">
                <td className="p-4">{app.universityName}</td>
                <td className="p-4">{app.subjectCategory}</td>
                <td className="p-4">${app.totalAmount}</td>
                <td className="p-4">{app.status}</td>
                <td className="p-4">{app.paymentStatus}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => { setSelected(app); setIsDetailsOpen(true); }} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-blue-700 px-3 py-1 rounded">Details</button>
                  {app.status === 'pending' && (
                    <>
                      <button className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded">Edit</button>
                      {app.paymentStatus === 'unpaid' && <button onClick={() => handlePay(app)} className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded">Pay</button>}
                      <button onClick={() => handleDelete(app._id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Delete</button>
                    </>
                  )}
                  {app.status === 'completed' && (
                    <button onClick={() => { setSelected(app); setIsReviewOpen(true); }} className="bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded">Add Review</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal – similar to moderator's */}
      {/* Review Modal */}
      <Dialog open={isReviewOpen} onClose={() => setIsReviewOpen(false)} className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-4">
            <Dialog.Title className="text-xl font-bold text-purple-600 mb-4">Add Review</Dialog.Title>
            <div className="mb-4">
              <label>Rating</label>
              <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full p-2 bg-purple-50 rounded mt-1">
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
            </div>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full h-32 p-3 bg-purple-50 rounded text-gray-900"
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button onClick={() => setIsReviewOpen(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
              <button onClick={submitReview} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded hover:bg-blue-700">Submit</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MyApplicationsTable;