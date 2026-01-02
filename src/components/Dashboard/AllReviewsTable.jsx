// src/components/Dashboard/AllReviewsTable.jsx
import { useEffect, useState } from 'react';

const AllReviewsTable = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch('/reviews/all') // backend route to get all reviews
      .then(res => res.json())
      .then(data => setReviews(data));
  }, []);

  const handleDelete = async (id) => {
    await fetch(`/reviews/${id}`, { method: 'DELETE' });
    setReviews(reviews.filter(r => r._id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">All Reviews</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-purple-50">
            <tr>
              <th className="p-4">Scholarship</th>
              <th className="p-4">User</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Comment</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map(review => (
              <tr key={review._id} className="border-t border-gray-700 hover:bg-purple-50">
                <td className="p-4">{review.scholarshipName}</td>
                <td className="p-4">{review.userEmail}</td>
                <td className="p-4">{'★'.repeat(review.ratingPoint)}</td>
                <td className="p-4 truncate max-w-xs">{review.reviewComment}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviewsTable;