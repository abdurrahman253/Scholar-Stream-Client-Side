import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Shared/LoadingSpinner'
import useAuth from '../../hooks/useAuth'
import { FcGoogle } from 'react-icons/fc'
import { FaGraduationCap, FaEnvelope, FaLock } from 'react-icons/fa'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useForm } from 'react-hook-form'

const Login = () => {
  const { signIn, signInWithGoogle, loading, user, setLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state || '/'

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  if (loading) return <LoadingSpinner />
  if (user) return <Navigate to={from} replace={true} />

  // form submit handler
  const onSubmit = async data => {
    const { email, password } = data

    try {
      // User Login
      await signIn(email, password)

      navigate(from, { replace: true })
      toast.success('Welcome back! 🎓')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      // User Registration using google
      await signInWithGoogle()
      navigate(from, { replace: true })
      toast.success('Welcome back! 🎓')
    } catch (err) {
      console.log(err)
      setLoading(false)
      toast.error(err?.message)
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
                  <FaGraduationCap className='w-8 h-8 text-white' />
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
          <h2 className='text-3xl font-bold text-gray-900 mb-2'>Welcome Back</h2>
          <p className='text-gray-600'>Sign in to continue your scholarship journey</p>
        </div>

        {/* Form Card */}
        <div className='bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 p-8'>
          <div className='space-y-5'>
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
              <div className='flex justify-between items-center mb-2'>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
                  Password
                </label>
                <button
                  type='button'
                  className='text-xs text-indigo-600 hover:text-indigo-700 hover:underline transition-colors'
                >
                  Forgot password?
                </button>
              </div>
              <div className='relative'>
                <FaLock className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4' />
                <input
                  type='password'
                  autoComplete='current-password'
                  id='password'
                  placeholder='••••••••'
                  className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
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
              className='w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {loading ? (
                <>
                  <TbFidgetSpinner className='animate-spin w-5 h-5' />
                  <span>Signing In...</span>
                </>
              ) : (
                'Sign In'
              )}
            </button>
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

          {/* Sign Up Link */}
          <p className='text-center text-sm text-gray-600 mt-6'>
            Don't have an account?{' '}
            <Link
              state={from}
              to='/signup'
              className='font-medium text-indigo-600 hover:text-indigo-700 hover:underline transition-colors'
            >
              Sign up
            </Link>
          </p>
        </div>

        {/* Additional Info */}
        <div className='mt-8 text-center'>
          <div className='flex items-center justify-center gap-4 text-xs text-gray-500'>
            <Link to='/privacy' className='hover:text-indigo-600 transition-colors'>
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to='/terms' className='hover:text-indigo-600 transition-colors'>
              Terms of Service
            </Link>
            <span>•</span>
            <Link to='/contact' className='hover:text-indigo-600 transition-colors'>
              Help Center
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login