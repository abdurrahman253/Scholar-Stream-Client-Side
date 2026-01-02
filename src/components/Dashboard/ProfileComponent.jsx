import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { toast } from 'react-hot-toast';

const ProfileComponent = () => {
  const { user } = useAuth();
  const { role, loading: roleLoading, error } = useRole();

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="bg-white rounded-2xl shadow-xl p-10 text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    toast.error(error);
    return <div className="text-red-500 text-center py-10">Error loading profile: {error}</div>;
  }

  const handleEdit = () => {
    toast('Edit functionality coming soon!'); // Placeholder
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl shadow-2xl">
      <div className="bg-white rounded-3xl shadow-2xl border border-purple-100 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-10 text-center relative">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-purple-200 flex items-center justify-center text-4xl font-bold text-purple-700">
                {user?.displayName?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            )}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {user?.displayName || 'Scholarship Seeker'}
          </h1>
          <p className="text-purple-100 text-lg font-medium">{user?.email}</p>
          <div className="absolute top-6 right-6">
            <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full text-sm font-bold tracking-wider uppercase">
              {role}
            </span>
          </div>
        </div>
        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Full Name</p>
              <p className="text-xl text-gray-900 font-bold bg-gray-50 p-4 rounded-2xl border border-gray-100">
                {user?.displayName || 'Not Set'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Verified Email</p>
              <p className="text-xl text-gray-900 font-bold bg-gray-50 p-4 rounded-2xl border border-gray-100">{user?.email}</p>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-[2rem] md:col-span-2 border border-purple-100 mt-4">
              <p className="text-xs uppercase tracking-widest text-purple-400 font-bold mb-2">Access Level</p>
              <div className="flex items-center gap-4">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {role.toUpperCase()}
                </p>
              </div>
              <div className="mt-4 p-4 bg-white/60 rounded-xl text-gray-600 font-medium">
                {role === 'admin' && '👑 Superuser: Full control over scholarships, users, and configuration.'}
                {role === 'moderator' && '🛡️ Staff: Review applications, manage scholarships, handle feedback.'}
                {role === 'student' && '🎓 Applicant: Explore, apply for scholarships, manage submissions.'}
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center">
            <button
              onClick={handleEdit}
              className="w-full md:w-auto px-10 py-4 bg-gray-900 hover:bg-black text-white text-lg font-bold rounded-2xl shadow-xl transition-all duration-300 hover:scale-105"
            >
              Edit Profile Settings
            </button>
            <p className="text-xs text-gray-400 mt-6 font-medium">
              Unique ID: <span className="font-mono">{user?.uid}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;