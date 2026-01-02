// src/components/Dashboard/MyReviewsTable.jsx
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';

const MyReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetch('/reviews/my') // backend route for user's reviews
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/reviews/${id}`, { method: 'DELETE' });
    setReviews(reviews.filter(r => r._id !== id));
  };

  const openEdit = (review) => {
    setSelected(review);
    setRating(review.ratingPoint);
    setComment(review.reviewComment);
    setIsEditOpen(true);
  };

  const updateReview = async () => {
    await fetch(`/reviews/${selected._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ratingPoint: rating, reviewComment: comment })
    });
    setReviews(reviews.map(r => r._id === selected._id ? { ...r, ratingPoint: rating, reviewComment: comment } : r));
    setIsEditOpen(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">My Reviews</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-purple-50">
            <tr>
              <th className="p-4">Scholarship</th>
              <th className="p-4">University</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Comment</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id} className="border-t border-gray-700 hover:bg-purple-50">
                <td className="p-4">{review.scholarshipName}</td>
                <td className="p-4">{review.universityName}</td>
                <td className="p-4">{'★'.repeat(review.ratingPoint)}</td>
                <td className="p-4 truncate max-w-xs">{review.reviewComment}</td>
                <td className="p-4">{new Date(review.reviewDate).toLocaleDateString()}</td>
                <td className="p-4 space-x-2">
                  <button onClick={() => openEdit(review)} className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(review._id)} className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onClose={() => setIsEditOpen(false)} className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-60" />
          <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md mx-4">
            <Dialog.Title className="text-xl font-bold text-purple-600 mb-4">Edit Review</Dialog.Title>
            <div className="mb-4">
              <label>Rating</label>
              <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full p-2 bg-purple-50 rounded mt-1">
                {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}
              </select>
            </div>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="w-full h-32 p-3 bg-purple-50 rounded text-gray-900"
            />
            <div className="mt-4 flex justify-end space-x-3">
              <button onClick={() => setIsEditOpen(false)} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
              <button onClick={updateReview} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded hover:bg-blue-700">Update</button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MyReviewsTable;