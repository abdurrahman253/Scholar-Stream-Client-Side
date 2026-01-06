
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaUpload, FaImage } from 'react-icons/fa';
import { useState } from 'react';
import { imageUpload } from '../../utils/imageUpload'; // ✅ Import image upload utility

const schema = z.object({
  name: z.string().min(1, 'Scholarship name is required'),
  university: z.string().min(1, 'University name is required'),
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
  
  // ✅ State for image handling
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      scholarshipCategory: 'Full fund',
      degree: 'Bachelor'
    }
  });

  // ✅ Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Mutation - Now sends JSON data with image URL
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (scholarshipData) => {
      // ✅ Send JSON data (NOT FormData)
      const { data } = await axiosSecure.post('/scholarships', scholarshipData);
      return data;
    },
    onSuccess: () => {
      toast.success('Scholarship added successfully! 🎉');
      queryClient.invalidateQueries(['scholarships']);
      reset();
      setImageFile(null);
      setImagePreview(null);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Something went wrong!');
    }
  });

  const onSubmit = async (data) => {
    // ✅ Validate image
    if (!imageFile) {
      toast.error('Please select a university image');
      return;
    }

    try {
      // ✅ Step 1: Upload image to ImgBB FIRST
      setUploadingImage(true);
      const toastId = toast.loading('Uploading image...');
      
      const imageUrl = await imageUpload(imageFile);
      
      toast.dismiss(toastId);
      setUploadingImage(false);
      
      if (!imageUrl) {
        toast.error('Failed to upload image. Please try again.');
        return;
      }
      
      toast.success('Image uploaded successfully!');

      // ✅ Step 2: Prepare scholarship data with IMAGE URL
      const appFee = Number(data.applicationFees);
      const sCharge = Number(data.serviceCharge);
      const total = appFee + sCharge;

      const scholarshipData = {
        scholarshipName: data.name,
        universityName: data.university,
        universityCountry: data.country,
        universityCity: data.city,
        universityWorldRank: Number(data.worldRank),
        subjectCategory: data.subjectCategory,
        scholarshipCategory: data.scholarshipCategory,
        degree: data.degree,
        tuitionFees: Number(data.tuitionFees) || 0,
        applicationFees: appFee,
        serviceCharge: sCharge,
        applicationDeadline: data.deadline,
        totalAmount: total,
        universityImage: imageUrl, // ✅ Send URL, not file
        postedUserEmail: user?.email || '',
        postDate: new Date().toISOString(),
      };

      // ✅ Step 3: Submit to backend
      await mutateAsync(scholarshipData);
      
    } catch (error) {
      setUploadingImage(false);
      console.error('Error:', error);
      toast.error(error.message || 'Failed to add scholarship');
    }
  };

  // Style 
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
          {/* University Image Upload - NEW SECTION */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-dashed border-indigo-200">
            <label className={labelStyle}>
              <FaImage className="inline mr-2" />
              University Image *
            </label>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Upload Button */}
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-indigo-300 rounded-xl hover:bg-indigo-50 transition-all group">
                  <FaUpload className="text-indigo-600 group-hover:scale-110 transition-transform" />
                  <span className="font-bold text-indigo-600">
                    {imageFile ? 'Change Image' : 'Choose Image'}
                  </span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            
            {imageFile && (
              <p className="text-xs text-slate-600 mt-2 ml-1">
                Selected: {imageFile.name}
              </p>
            )}
          </div>

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
              {errors.subjectCategory && <p className={errorStyle}>{errors.subjectCategory.message}</p>}
            </div>
            
            <div>
              <label className={labelStyle}>Scholarship Category *</label>
              <select {...register('scholarshipCategory')} className={inputStyle}>
                <option value="Full fund">Full Fund</option>
                <option value="Partial">Partial</option>
                <option value="Self-fund">Self Fund</option>
              </select>
            </div>
            
            <div>
              <label className={labelStyle}>Degree *</label>
              <select {...register('degree')} className={inputStyle}>
                <option value="Diploma">Diploma</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Masters">Masters</option>
                <option value="PhD">PhD</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className={labelStyle}>Country *</label>
              <input {...register('country')} className={inputStyle} placeholder="e.g. United States" />
              {errors.country && <p className={errorStyle}>{errors.country.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>City *</label>
              <input {...register('city')} className={inputStyle} placeholder="e.g. Boston" />
              {errors.city && <p className={errorStyle}>{errors.city.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>World Rank *</label>
              <input type="number" {...register('worldRank')} className={inputStyle} placeholder="e.g. 5" />
              {errors.worldRank && <p className={errorStyle}>{errors.worldRank.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-50 p-6 rounded-[2rem]">
            <div>
              <label className={labelStyle}>App Fee *</label>
              <input type="number" step="0.01" {...register('applicationFees')} className={inputStyle} placeholder="0" />
              {errors.applicationFees && <p className={errorStyle}>{errors.applicationFees.message}</p>}
            </div>
            <div>
              <label className={labelStyle}>Service *</label>
              <input type="number" step="0.01" {...register('serviceCharge')} className={inputStyle} placeholder="0" />
              {errors.serviceCharge && <p className={errorStyle}>{errors.serviceCharge.message}</p>}
            </div>
            <div className="col-span-2">
              <label className={labelStyle}>Deadline *</label>
              <input type="date" {...register('deadline')} className={inputStyle} />
              {errors.deadline && <p className={errorStyle}>{errors.deadline.message}</p>}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || uploadingImage}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black py-5 rounded-2xl hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {(isPending || uploadingImage) ? (
              <>
                <TbFidgetSpinner className="animate-spin text-xl" />
                <span>{uploadingImage ? 'Uploading Image...' : 'Publishing...'}</span>
              </>
            ) : (
              <>
                <FaUpload />
                <span>Publish Scholarship</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddScholarshipForm;