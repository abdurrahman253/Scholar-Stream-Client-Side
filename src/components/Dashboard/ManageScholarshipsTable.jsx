// src/components/Dashboard/ManageScholarshipsTable.jsx
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import toast from 'react-hot-toast';

const ManageScholarshipsTable = () => {
  const [scholarships, setScholarships] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/scholarships') // তোমার backend এ /scholarships GET route আছে
      .then(res => res.json())
      .then(data => setScholarships(data))
      .catch(err => toast.error('Failed to load scholarships'));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scholarship?')) return;

    try {
      const res = await fetch(`/scholarships/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setScholarships(scholarships.filter(s => s._id !== id));
        toast.success('Scholarship deleted successfully!');
      } else {
        toast.error('Failed to delete');
      }
    } catch (err) {
      toast.error('Error deleting scholarship');
    }
  };

  const openUpdateModal = (scholarship) => {
    setSelected(scholarship);
    setIsUpdateOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    
    try {
      const res = await fetch(`/scholarships/${selected._id}`, {
        method: 'PATCH',
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        setScholarships(scholarships.map(s => s._id === selected._id ? { ...s, ...Object.fromEntries(formData) } : s));
        setIsUpdateOpen(false);
        toast.success('Scholarship updated successfully! 🎉');
      } else {
        toast.error('Failed to update scholarship');
      }
    } catch (err) {
      toast.error('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
        Manage Scholarships
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-3">
          <thead>
            <tr className="text-gray-700 font-semibold">
              <th className="pb-4">Scholarship Name</th>
              <th className="pb-4">University</th>
              <th className="pb-4">Country</th>
              <th className="pb-4">Fees</th>
              <th className="pb-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {scholarships.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-10 text-gray-500">No scholarships found</td>
              </tr>
            ) : (
              scholarships.map((s) => (
                <tr key={s._id} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow hover:shadow-md transition">
                  <td className="p-4 rounded-l-xl font-medium">{s.name}</td>
                  <td className="p-4">{s.university}</td>
                  <td className="p-4">{s.country}, {s.city}</td>
                  <td className="p-4">${s.applicationFees + s.serviceCharge}</td>
                  <td className="p-4 rounded-r-xl text-center space-x-3">
                    <button
                      onClick={() => openUpdateModal(s)}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-5 py-2 rounded-lg font-medium transition transform hover:-translate-y-0.5 shadow"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-medium transition shadow"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Update Modal */}
      <Dialog open={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />

          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-10 my-8">
            <Dialog.Title className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Update Scholarship
            </Dialog.Title>

            {selected && (
              <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input name="name" defaultValue={selected.name} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Scholarship Name" />
                <input name="university" defaultValue={selected.university} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="University" />
                <input name="country" defaultValue={selected.country} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="Country" />
                <input name="city" defaultValue={selected.city} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" placeholder="City" />
                <input name="worldRank" type="number" defaultValue={selected.worldRank} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" />
                <input name="applicationFees" type="number" step="0.01" defaultValue={selected.applicationFees} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" />
                <input name="serviceCharge" type="number" step="0.01" defaultValue={selected.serviceCharge} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" />
                <input name="deadline" type="date" defaultValue={selected.deadline?.split('T')[0]} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" />
                <input name="postDate" type="date" defaultValue={selected.postDate?.split('T')[0]} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" />
                <input name="userEmail" type="email" defaultValue={selected.userEmail} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500" />

                <select name="subjectCategory" defaultValue={selected.subjectCategory} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500">
                  <option>Computer Science</option>
                  <option>Engineering</option>
                  <option>Business</option>
                  <option>Medicine</option>
                  <option>Arts</option>
                </select>

                <select name="scholarshipCategory" defaultValue={selected.scholarshipCategory} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500">
                  <option>Merit Based</option>
                  <option>Need Based</option>
                  <option>Full Scholarship</option>
                  <option>Partial Scholarship</option>
                </select>

                <select name="degree" defaultValue={selected.degree} required className="p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-500">
                  <option>Bachelors</option>
                  <option>Masters</option>
                  <option>PhD</option>
                </select>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Update Image (Optional)</label>
                  <input type="file" name="image" accept="image/*" className="w-full p-4 border border-purple-200 rounded-xl file:bg-gradient-to-r file:from-purple-500 file:to-pink-500 file:text-white file:border-0 file:px-6 file:py-3 file:rounded-lg hover:file:from-purple-600 hover:file:to-pink-600 cursor-pointer" />
                </div>

                <div className="md:col-span-2 flex justify-end space-x-4 mt-6">
                  <button type="button" onClick={() => setIsUpdateOpen(false)} className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-bold transition flex items-center gap-3">
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageScholarshipsTable;