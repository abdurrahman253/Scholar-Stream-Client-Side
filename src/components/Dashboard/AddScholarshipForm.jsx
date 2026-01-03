import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth'; // 👈 Add this
import { TbFidgetSpinner } from 'react-icons/tb';

// Validation Schema
const schema = z.object({
  name: z.string().min(1, 'Scholarship name is required'),
  university: z.string().min(1, 'University name is required'),
  image: z.any().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  worldRank: z.coerce.number().min(1, 'Rank must be a valid number'),
  subjectCategory: z.string().min(1, 'Required'),
  scholarshipCategory: z.string().optional(),
  degree: z.string().min(1, 'Required'),
  tuitionFees: z.coerce.number().optional(),
  applicationFees: z.coerce.number().min(0, 'Min 0'),
  serviceCharge: z.coerce.number().min(0, 'Min 0'),
  deadline: z.string().min(1, 'Deadline is required'),
});

const AddScholarshipForm = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); // 👈 Get user

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
  });

  // TanStack Mutation
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post('/scholarships', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 👈 Important!
        }
      });
      return data;
    },
    onSuccess: () => {
      toast.success('Scholarship added successfully! 🎉');
      queryClient.invalidateQueries(['scholarships']);
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong!');
      console.error('Mutation error:', error);
    }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // Image file
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    // All other fields
    formData.append('name', data.name);
    formData.append('university', data.university);
    formData.append('country', data.country);
    formData.append('city', data.city);
    formData.append('worldRank', data.worldRank);
    formData.append('subjectCategory', data.subjectCategory);
    formData.append('scholarshipCategory', data.scholarshipCategory || 'General');
    formData.append('degree', data.degree);
    formData.append('tuitionFees', data.tuitionFees || 0);
    formData.append('applicationFees', data.applicationFees);
    formData.append('serviceCharge', data.serviceCharge);
    formData.append('deadline', data.deadline);
    formData.append('postDate', new Date().toISOString().split('T')[0]);
    formData.append('userEmail', user?.email || ''); // 👈 Add user email

    // Debug: Check formData
    console.log('📦 FormData entries:');
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      await mutateAsync(formData);
    } catch (err) {
      console.log('Submission failed:', err);
    }
  };

  const labelStyle = "block text-[11px] uppercase tracking-widest font-black text-slate-500 mb-2 ml-1";
  const inputStyle = "w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 sm:text-sm";
  const errorStyle = "text-red-500 text-xs mt-1 ml-1 font-bold";

  return (
    <div className="max-w-4xl mx-auto py-5">
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-white p-6 md:p-12">
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Post New Scholarship</h1>
          <p className="text-slate-500 mt-2 font-medium">Add details for the global student community.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelStyle}>Scholarship Name *</label>
              <input 
                {...register('name')} 
                className={inputStyle} 
                placeholder="e.g. Commonwealth Scholarship" 
              />
              {errors.name && <p className={errorStyle}>{errors.name.message}</p>}
            </div>

            <div>
              <label className={labelStyle}>University Name *</label>
              <input 
                {...register('university')} 
                className={inputStyle} 
                placeholder="Harvard University" 
              />
              {errors.university && <p className={errorStyle}>{errors.university.message}</p>}
            </div>

            <div>
              <label className={labelStyle}>Subject Category *</label>
              <select {...register('subjectCategory')} className={inputStyle}>
                <option value="">Select Category</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
                <option value="Business">Business</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
              </select>
              {errors.subjectCategory && <p className={errorStyle}>{errors.subjectCategory.message}</p>}
            </div>
          </div>

          {/* Location & Rank */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>Country *</label>
              <input {...register('country')} className={inputStyle} placeholder="USA" />
              {errors.country && <p className={errorStyle}>{errors.country.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>City *</label>
              <input {...register('city')} className={inputStyle} placeholder="Boston" />
              {errors.city && <p className={errorStyle}>{errors.city.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>World Rank *</label>
              <input type="number" {...register('worldRank')} className={inputStyle} placeholder="1" />
              {errors.worldRank && <p className={errorStyle}>{errors.worldRank.message}</p>}
            </div>
          </div>

          {/* Degree & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelStyle}>Degree *</label>
              <select {...register('degree')} className={inputStyle}>
                <option value="">Select Degree</option>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
              {errors.degree && <p className={errorStyle}>{errors.degree.message}</p>}
            </div>

            <div>
              <label className={labelStyle}>Scholarship Category</label>
              <select {...register('scholarshipCategory')} className={inputStyle}>
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self Fund</option>
              </select>
            </div>
          </div>

          {/* Fees & Dates */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
            <div>
              <label className={labelStyle}>Tuition Fee</label>
              <input 
                type="number" 
                {...register('tuitionFees')} 
                className={inputStyle} 
                placeholder="0" 
              />
            </div>
            <div>
              <label className={labelStyle}>App Fee *</label>
              <input 
                type="number" 
                {...register('applicationFees')} 
                className={inputStyle} 
                placeholder="50" 
              />
              {errors.applicationFees && <p className={errorStyle}>{errors.applicationFees.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>Service Charge *</label>
              <input 
                type="number" 
                {...register('serviceCharge')} 
                className={inputStyle} 
                placeholder="10" 
              />
              {errors.serviceCharge && <p className={errorStyle}>{errors.serviceCharge.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>Deadline *</label>
              <input 
                type="date" 
                {...register('deadline')} 
                className={inputStyle} 
              />
              {errors.deadline && <p className={errorStyle}>{errors.deadline.message}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <div className="relative group border-2 border-dashed border-slate-200 rounded-[2rem] p-8 text-center hover:border-purple-400 transition-colors">
            <input 
              type="file" 
              accept="image/*"
              {...register('image')} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </div>
              <p className="text-sm font-bold text-slate-700">Upload University Logo</p>
              <p className="text-xs text-slate-500">PNG, JPG, WEBP (Max 5MB)</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl shadow-2xl hover:bg-purple-600 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {isPending ? (
              <>
                <TbFidgetSpinner className="animate-spin text-xl" />
                Adding Scholarship...
              </>
            ) : (
              "Publish Scholarship"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarshipForm;