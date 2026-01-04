import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { TbFidgetSpinner } from 'react-icons/tb';

const schema = z.object({
  name: z.string().min(1, 'Scholarship name is required'),
  university: z.string().min(1, 'University name is required'),
  image: z.any().optional(),
  country: z.string().min(1, 'Country is required'),
  city: z.string().min(1, 'City is required'),
  worldRank: z.coerce.number().min(1, 'Rank must be a valid number'),
  subjectCategory: z.string().min(1, 'Required'),
  scholarshipCategory: z.string().min(1, 'Required'),
  degree: z.string().min(1, 'Required'),
  tuitionFees: z.coerce.number().optional().default(0),
  applicationFees: z.coerce.number().min(0, 'Min 0'),
  serviceCharge: z.coerce.number().min(0, 'Min 0'),
  deadline: z.string().min(1, 'Deadline is required'),
});

const AddScholarshipForm = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      scholarshipCategory: 'Full fund',
      degree: 'Bachelor'
    }
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await axiosSecure.post('/scholarships', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
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
    }
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    
    // ✅ Image handling
    if (data.image && data.image[0]) {
      formData.append('image', data.image[0]);
    }

    // ✅ Total Amount Calculation (Numeric fix)
    const appFee = Number(data.applicationFees);
    const sCharge = Number(data.serviceCharge);
    const total = appFee + sCharge;

    // ✅ Data Mapping (Matching backend keys)
    formData.append('scholarshipName', data.name);
    formData.append('universityName', data.university);
    formData.append('universityCountry', data.country);
    formData.append('universityCity', data.city);
    formData.append('universityWorldRank', data.worldRank);
    formData.append('subjectCategory', data.subjectCategory);
    formData.append('scholarshipCategory', data.scholarshipCategory);
    formData.append('degree', data.degree);
    formData.append('tuitionFees', data.tuitionFees || 0);
    formData.append('applicationFees', appFee);
    formData.append('serviceCharge', sCharge);
    formData.append('applicationDeadline', data.deadline);
    formData.append('totalAmount', total); // ডাটাবেসে সরাসরি নাম্বার যাবে
    formData.append('postedUserEmail', user?.email || '');

    try {
      await mutateAsync(formData);
    } catch (err) {
      console.error(err);
    }
  };

  // Styles (Shortened for brevity)
  const labelStyle = "block text-[11px] uppercase tracking-widest font-black text-slate-500 mb-2 ml-1";
  const inputStyle = "w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all outline-none";
  const errorStyle = "text-red-500 text-xs mt-1 ml-1 font-bold";

  return (
    <div className="max-w-4xl mx-auto py-5 px-4">
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-6 md:p-12">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900">Post New Scholarship</h1>
          <p className="text-slate-500 mt-2">Fill out the details carefully.</p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className={labelStyle}>Scholarship Name *</label>
              <input {...register('name')} className={inputStyle} placeholder="Full Name" />
              {errors.name && <p className={errorStyle}>{errors.name.message}</p>}
            </div>
            
            <div>
              <label className={labelStyle}>University *</label>
              <input {...register('university')} className={inputStyle} placeholder="University Name" />
              {errors.university && <p className={errorStyle}>{errors.university.message}</p>}
            </div>

            <div>
              <label className={labelStyle}>Subject Category *</label>
              <select {...register('subjectCategory')} className={inputStyle}>
                <option value="">Select</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Doctor">Doctor</option>
                <option value="Business">Business</option>
                <option value="Science">Science</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>Country *</label>
              <input {...register('country')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>City *</label>
              <input {...register('city')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Rank *</label>
              <input type="number" {...register('worldRank')} className={inputStyle} />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-[2rem]">
            <div>
              <label className={labelStyle}>App Fee *</label>
              <input type="number" {...register('applicationFees')} className={inputStyle} />
            </div>
            <div>
              <label className={labelStyle}>Service *</label>
              <input type="number" {...register('serviceCharge')} className={inputStyle} />
            </div>
            <div className="col-span-2">
              <label className={labelStyle}>Deadline *</label>
              <input type="date" {...register('deadline')} className={inputStyle} />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl hover:bg-purple-600 transition-all flex items-center justify-center gap-3"
          >
            {isPending ? <TbFidgetSpinner className="animate-spin" /> : "Publish Scholarship"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarshipForm;