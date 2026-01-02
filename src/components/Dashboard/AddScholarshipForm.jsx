import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(1, 'Scholarship name is required'),
  university: z.string().min(1, 'University name is required'),
  image: z.any().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  worldRank: z.coerce.number().min(1, 'World rank must be a valid number'),
  subjectCategory: z.string().min(1, 'Subject category is required'),
  scholarshipCategory: z.string().min(1, 'Scholarship category is required'),
  degree: z.string().min(1, 'Degree is required'),
  tuitionFees: z.coerce.number().optional(),
  applicationFees: z.coerce.number().min(0, 'Application fees must be >= 0'),
  serviceCharge: z.coerce.number().min(0, 'Service charge must be >= 0'),
  deadline: z.string().min(1, 'Deadline is required'),
  postDate: z.string().min(1, 'Post date is required'),
  userEmail: z.string().email('Invalid email format'),
});

const AddScholarshipForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'image' && value[0]) formData.append(key, value[0]);
        else formData.append(key, value || '');
      });
      const response = await fetch('/scholarships', { method: 'POST', body: formData });
      if (response.ok) {
        toast.success('Scholarship added successfully! 🎉');
        reset();
      } else {
        toast.error('Failed to add scholarship.');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Add New Scholarship
        </h1>
        <p className="text-gray-400">Fill all details to create a new scholarship opportunity</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">Scholarship Name *</label>
            <input {...register('name')} className="w-full p-4 bg-purple-50/50 border border-gray-600 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" placeholder="e.g., Fulbright Scholarship" />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">University Name *</label>
            <input {...register('university')} className="w-full p-4 bg-purple-50/50 border border-gray-600 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" placeholder="e.g., Harvard University" />
            {errors.university && <p className="text-red-400 text-sm mt-1">{errors.university.message}</p>}
          </div>
        </div>
        {/* ... (rest of the form fields are the same, but with modern Tailwind consistency) */}
        <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center space-x-2 group">
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding Scholarship...</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add Scholarship</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddScholarshipForm;