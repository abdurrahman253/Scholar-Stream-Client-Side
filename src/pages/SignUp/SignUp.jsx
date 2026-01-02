import { Link, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import { FaGraduationCap, FaUser, FaEnvelope, FaLock } from 'react-icons/fa'
import useAuth from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'
import { imageUpload } from '../../utils'
import { saveOrUpdateUser } from '../../utils/api'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state || '/'
 

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
  const { name, image, email, password } = data;
  const imageFile = image[0];

  try {
    const imageURL = await imageUpload(imageFile);

    
    const result = await createUser(email, password);
    const newUser = result.user;

    await updateUserProfile(name, imageURL);

    await saveOrUpdateUser({
      name: name,
      email: newUser.email,
      photoURL: imageURL,
    });

    navigate(from, { replace: true });
    toast.success('Welcome to ScholarStream! 🎓');
  } catch (err) {
    console.error(err);
    toast.error(err?.message || 'Signup failed');
  }
};

  // Handle Google Signin
 const handleGoogleSignIn = async () => {
  try {
    const result = await signInWithGoogle()
    const loggedInUser = result.user

    // ✅ Get fresh Google photo
    const googleProviderData = loggedInUser.providerData.find(
      (provider) => provider.providerId === 'google.com'
    )

    const photoURL = googleProviderData?.photoURL || ''

    await saveOrUpdateUser({
      name: loggedInUser?.displayName || 'Anonymous',
      email: loggedInUser?.email,
      photoURL: photoURL,
    })

    navigate(from, { replace: true })
    toast.success('Welcome back! 🎓')
  } catch (err) {
    console.error(err)
    toast.error(err?.message || 'Google sign in failed')
  }
}


  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        {/* Logo & Header */}
        <div className='text-center mb-8'>
          <Link to='/' className='inline-block group mb-4'>
            <div className='flex items-center justify-center gap-2'>
              <div className='relative'>
                <div className='absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl blur-sm group-hover:blur-md transition-all duration-300 opacity-75'></div>
                <div className='relative bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-xl shadow-lg'>
                  <FaGraduationCap className='w-8 h-8 text-gray-900' />
                </div>
              </div>
              <div className='flex flex-col items-start'>
                <span className='text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                  ScholarStream
                </span>
                <span className='text-xs text-gray-500 -mt-1'>Find Your Future</span>
              </div>
            </div>
          </Link>
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Create Account</h2>
          <p className='text-gray-600'>Join thousands of students finding their dream scholarships</p>
        </div>

        {/* Form Card */}
        <div className='bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8'>
          <div onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-5'>
              {/* Name Field */}
              <div>
                <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-2'>
                  Full Name
                </label>
                <div className='relative'>
                  <FaUser className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='text'
                    id='name'
                    placeholder='Enter your full name'
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200'
                    {...register('name', {
                      required: 'Name is required',
                      maxLength: {
                        value: 50,
                        message: 'Name cannot exceed 50 characters',
                      },
                    })}
                  />
                </div>
                {errors.name && (
                  <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                    <span>⚠</span> {errors.name.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor='image' className='block text-sm font-medium text-gray-700 mb-2'>
                  Profile Picture
                </label>
                <div className='relative'>
                  <input
                    name='image'
                    type='file'
                    id='image'
                    accept='image/*'
                    className='block w-full text-sm text-gray-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-gray-900 hover:file:from-indigo-700 hover:file:to-purple-700 file:cursor-pointer file:transition-all file:duration-200 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200 py-2.5'
                    {...register('image')}
                  />
                </div>
                {errors.image && (
                  <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                    <span>⚠</span> {errors.image.message}
                  </p>
                )}
                <p className='mt-1 text-xs text-gray-500'>PNG, JPG or JPEG (max 2MB)</p>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-2'>
                  Email Address
                </label>
                <div className='relative'>
                  <FaEnvelope className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='email'
                    id='email'
                    placeholder='you@example.com'
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200'
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                    <span>⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700 mb-2'>
                  Password
                </label>
                <div className='relative'>
                  <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
                  <input
                    type='password'
                    autoComplete='new-password'
                    id='password'
                    placeholder='••••••••'
                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200'
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                        message: 'Must contain uppercase letter and special character',
                      },
                    })}
                  />
                </div>
                {errors.password && (
                  <p className='text-red-500 text-xs mt-1 flex items-center gap-1'>
                    <span>⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                type='button'
                className='w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-gray-900 font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
              >
                {loading ? (
                  <>
                    <TbFidgetSpinner className='animate-spin w-5 h-5' />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className='relative my-6'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-4 bg-white/70 text-gray-500'>Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            type='button'
            className='w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium text-gray-700'
          >
            <FcGoogle size={24} />
            <span>Continue with Google</span>
          </button>

          {/* Login Link */}
          <p className='text-center text-sm text-gray-600 mt-6'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors'
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Terms */}
        <p className='text-center text-xs text-gray-500 mt-6'>
          By creating an account, you agree to our{' '}
          <Link to='/terms' className='text-indigo-600 hover:underline'>
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link to='/privacy' className='text-indigo-600 hover:underline'>
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp