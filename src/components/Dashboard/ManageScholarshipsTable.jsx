// src/pages/Dashboard/Admin/ManageScholarships.jsx

import { useState } from 'react';
import { FaEdit, FaTrash, FaTimes, FaUpload } from 'react-icons/fa';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // ✅ Fetch Scholarships from API
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ['scholarships'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/scholarships');
      return data;
    },
    onError: (error) => {
      console.error('Error fetching scholarships:', error);
      toast.error('Failed to load scholarships');
    }
  });

  // ✅ Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/scholarships/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['scholarships']);
      toast.success('Scholarship deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to delete');
    },
  });

  // ✅ Update Mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const { data } = await axiosSecure.patch(`/scholarships/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['scholarships']);
      toast.success('Scholarship updated successfully! 🎉');
      closeModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update');
    },
  });

  const openUpdateModal = (scholarship) => {
    setSelected(scholarship);
    setImagePreview(scholarship.universityImage);
    setIsUpdateOpen(true);
  };

  const closeModal = () => {
    setIsUpdateOpen(false);
    setSelected(null);
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this scholarship?')) return;
    deleteMutation.mutate(id);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();

    formData.append('name', form.name.value);
    formData.append('university', form.university.value);
    formData.append('country', form.country.value);
    formData.append('city', form.city.value);
    formData.append('worldRank', form.worldRank.value);
    formData.append('subjectCategory', form.subjectCategory.value);
    formData.append('scholarshipCategory', form.scholarshipCategory.value);
    formData.append('degree', form.degree.value);
    formData.append('applicationFees', form.applicationFees.value);
    formData.append('serviceCharge', form.serviceCharge.value);
    formData.append('deadline', form.deadline.value);

    if (form.image.files[0]) {
      formData.append('image', form.image.files[0]);
    }

    updateMutation.mutate({ id: selected._id, formData });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <TbFidgetSpinner className="w-16 h-16 animate-spin text-purple-600 mx-auto" />
          <p className="mt-4 text-gray-600 font-semibold">Loading scholarships...</p>
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
            Manage Scholarships
          </h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-sm lg:text-base">
            Update or remove scholarships • Total: {scholarships.length}
          </p>
        </div>
      </div>

      {/* Empty State */}
      {scholarships.length === 0 && !isLoading && (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center border border-purple-100">
            <div className="text-6xl sm:text-8xl mb-4">📚</div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">No Scholarships Yet</h3>
            <p className="text-gray-600 text-sm sm:text-base">Add your first scholarship to get started!</p>
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
                    Scholarship
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    University
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider">
                    Fees
                  </th>
                  <th className="px-4 xl:px-6 py-3 xl:py-4 text-center text-xs font-black text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {scholarships.map((s, index) => (
                  <tr 
                    key={s._id} 
                    className={`hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={s.universityImage || 'https://via.placeholder.com/48'} 
                          alt={s.scholarshipName}
                          className="w-10 h-10 xl:w-12 xl:h-12 rounded-full object-cover border-2 border-purple-200"
                        />
                        <div>
                          <div className="font-bold text-gray-900 text-sm xl:text-base">{s.scholarshipName}</div>
                          <div className="text-xs xl:text-sm text-gray-500">{s.degree} • {s.subjectCategory}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="font-semibold text-gray-900 text-sm xl:text-base">{s.universityName}</div>
                      <div className="text-xs xl:text-sm text-gray-500">Rank #{s.worldRank}</div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="text-gray-900 text-sm xl:text-base">{s.universityCity}</div>
                      <div className="text-xs xl:text-sm text-gray-500">{s.universityCountry}</div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="font-bold text-purple-600 text-sm xl:text-base">${s.applicationFees + s.serviceCharge}</div>
                      <div className="text-xs text-gray-500">Total Fee</div>
                    </td>
                    <td className="px-4 xl:px-6 py-3 xl:py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => openUpdateModal(s)}
                          className="inline-flex items-center justify-center px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg xl:rounded-xl text-xs xl:text-sm font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105"
                        >
                          <FaEdit className="mr-1 xl:mr-2" />
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          disabled={deleteMutation.isPending}
                          className="inline-flex items-center justify-center px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg xl:rounded-xl text-xs xl:text-sm font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 disabled:opacity-50"
                        >
                          <FaTrash className="mr-1 xl:mr-2" />
                          Delete
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
      <div className="max-w-7xl mx-auto lg:hidden space-y-3 sm:space-y-4">
        {scholarships.map((s) => (
          <div 
            key={s._id}
            className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl border border-purple-100 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 sm:p-4 flex items-center space-x-3 sm:space-x-4">
              <img 
                src={s.universityImage || 'https://via.placeholder.com/64'} 
                alt={s.scholarshipName}
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 sm:border-4 border-white shadow-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm sm:text-lg truncate">{s.scholarshipName}</h3>
                <p className="text-purple-100 text-xs sm:text-sm truncate">{s.universityName}</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-gray-500 font-semibold mb-0.5 sm:mb-1">Location</p>
                  <p className="text-gray-900 font-bold text-xs sm:text-sm">{s.universityCity}, {s.universityCountry}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold mb-0.5 sm:mb-1">World Rank</p>
                  <p className="text-gray-900 font-bold text-xs sm:text-sm">#{s.worldRank}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold mb-0.5 sm:mb-1">Degree</p>
                  <p className="text-gray-900 font-bold text-xs sm:text-sm">{s.degree}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-semibold mb-0.5 sm:mb-1">Total Fee</p>
                  <p className="text-purple-600 font-bold text-xs sm:text-sm">${s.applicationFees + s.serviceCharge}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4 border-t border-gray-100">
                <button
                  onClick={() => openUpdateModal(s)}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 flex items-center justify-center"
                >
                  <FaEdit className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                  Update
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  disabled={deleteMutation.isPending}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-xl active:scale-95 disabled:opacity-50 flex items-center justify-center"
                >
                  {deleteMutation.isPending ? (
                    <TbFidgetSpinner className="animate-spin text-sm sm:text-base" />
                  ) : (
                    <>
                      <FaTrash className="mr-1 sm:mr-2 text-xs sm:text-sm" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal - Responsive */}
      {isUpdateOpen && selected && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-2 sm:p-4">
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
              onClick={closeModal}
            ></div>

            {/* Modal */}
            <div className="relative w-full max-w-4xl my-4 sm:my-8 bg-white shadow-2xl rounded-2xl sm:rounded-3xl max-h-[95vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
                <h2 className="text-lg sm:text-2xl lg:text-3xl font-black text-white">
                  Update Scholarship
                </h2>
                <button
                  onClick={closeModal}
                  className="text-white hover:bg-white/20 rounded-full p-1.5 sm:p-2 transition-colors"
                >
                  <FaTimes size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

                {/* Update Modal - Form Fields (Matched with MongoDB field names) */}
<form onSubmit={handleUpdate} className="p-4 sm:p-6 lg:p-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {/* Scholarship Name */}
    <div className="sm:col-span-2">
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Scholarship Name *
      </label>
      <input
        name="name" // ← ফর্মে এটাই থাকবে, ব্যাকএন্ডে ম্যাপ করা হবে scholarshipName-এ
        type="text"
        defaultValue={selected.scholarshipName}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    {/* University Name */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        University *
      </label>
      <input
        name="university"
        type="text"
        defaultValue={selected.universityName}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    {/* Subject Category */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Subject *
      </label>
      <select
        name="subjectCategory"
        defaultValue={selected.subjectCategory}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      >
        <option value="Agriculture">Agriculture</option>
        <option value="Engineering">Engineering</option>
        <option value="Doctor">Doctor</option>
        <option value="Business">Business</option>
        <option value="Science">Science</option>
        <option value="Arts">Arts</option>
      </select>
    </div>

    {/* Country & City */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Country *
      </label>
      <input
        name="country"
        type="text"
        defaultValue={selected.universityCountry}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        City *
      </label>
      <input
        name="city"
        type="text"
        defaultValue={selected.universityCity}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    {/* World Rank */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Rank *
      </label>
      <input
        name="worldRank"
        type="number"
        defaultValue={selected.worldRank}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    {/* Degree */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Degree *
      </label>
      <select
        name="degree"
        defaultValue={selected.degree}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      >
        <option value="Diploma">Diploma</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Masters">Masters</option>
        <option value="PhD">PhD</option>
      </select>
    </div>

    {/* Scholarship Category */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Category
      </label>
      <select
        name="scholarshipCategory"
        defaultValue={selected.scholarshipCategory}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      >
        <option value="Full fund">Full Fund</option>
        <option value="Partial">Partial</option>
        <option value="Self-fund">Self Fund</option>
      </select>
    </div>

    {/* Fees */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        App Fee *
      </label>
      <input
        name="applicationFees"
        type="number"
        step="0.01"
        defaultValue={selected.applicationFees}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Service *
      </label>
      <input
        name="serviceCharge"
        type="number"
        step="0.01"
        defaultValue={selected.serviceCharge}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    {/* Deadline */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Deadline *
      </label>
      <input
        name="deadline"
        type="date"
        defaultValue={selected.applicationDeadline?.split('T')[0]}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    {/* Admin Email */}
    <div>
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Admin Email *
      </label>
      <input
        name="userEmail"
        type="email"
        defaultValue={selected.postedUserEmail}
        required
        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-200 focus:border-purple-500 transition-all outline-none"
      />
    </div>

    {/* Image Upload */}
    <div className="sm:col-span-2">
      <label className="block text-xs font-black text-gray-700 uppercase tracking-wider mb-2">
        Update Image (Optional)
      </label>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
        {imagePreview && (
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-4 border-purple-200"
          />
        )}
        <label className="flex-1 w-full cursor-pointer">
          <div className="flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-dashed border-purple-300 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all">
            <FaUpload className="text-purple-600 text-sm sm:text-base" />
            <span className="text-purple-700 font-bold text-xs sm:text-sm">Choose Image</span>
          </div>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
    <button type="button" onClick={closeModal} className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gray-100 text-gray-700 rounded-xl font-bold text-sm sm:text-base hover:bg-gray-200 transition-all">
      Cancel
    </button>
    <button
      type="submit"
      disabled={updateMutation.isPending}
      className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-xl font-bold text-sm sm:text-base hover:shadow-2xl transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
    >
      {updateMutation.isPending ? (
        <>
          <TbFidgetSpinner className="animate-spin text-base sm:text-xl" />
          <span>Updating...</span>
        </>
      ) : (
        'Save Changes'
      )}
    </button>
  </div>
</form> 
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;