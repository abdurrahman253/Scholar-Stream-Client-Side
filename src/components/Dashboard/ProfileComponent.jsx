import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import { toast } from 'react-hot-toast';

const ProfileComponent = () => {
  const { user } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (roleLoading) return (
    <div className="flex h-64 items-center justify-center">
      <div className="w-10 h-10 border-4 border-purple-600/20 border-t-purple-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-2 md:px-0">
      {/* Container with tighter rounding for mobile */}
      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100">
        
        {/* Compact Header: Height reduced for mobile */}
        <div className="relative h-24 md:h-48 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          {/* Status Badge */}
          <div className="absolute top-4 right-4 md:top-8 md:right-8">
            <span className="px-3 py-1 bg-purple-500/20 backdrop-blur-md border border-purple-400/30 text-purple-400 text-[10px] font-black tracking-widest uppercase rounded-full">
              {role}
            </span>
          </div>
        </div>

        {/* Content Section: Pulling up the avatar tighter */}
        <div className="px-5 md:px-12 pb-8">
          <div className="flex flex-col md:flex-row items-center md:items-end -mt-12 md:-mt-20 mb-6 gap-4 md:gap-6">
            
            {/* Avatar: Scaled down from 48 to 32 on mobile */}
            <div className="relative">
              <div className="w-24 h-24 md:w-44 md:h-44 rounded-3xl md:rounded-[2.5rem] border-4 md:border-[8px] border-white bg-slate-100 shadow-xl overflow-hidden">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl md:text-6xl font-black text-slate-300">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info: Compact Typography */}
            <div className="text-center md:text-left md:pb-3 flex-1">
              <h1 className="text-xl md:text-4xl font-black text-slate-900 tracking-tight">
                {user?.displayName || "User Name"}
              </h1>
              <p className="text-sm md:text-lg text-slate-500 font-medium tracking-tight">
                {user?.email}
              </p>
            </div>

            {/* Edit Button: Hidden on mobile to save vertical space, shown in grid below */}
            <button className="hidden md:block px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-purple-600 transition-all">
              Edit Settings
            </button>
          </div>

          {/* Simple Compact Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            
            {/* Field 1 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Full Name</p>
                <p className="text-sm font-bold text-slate-700">{user?.displayName || "Not Set"}</p>
              </div>
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <UserIcon className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            {/* Field 2 */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Account Role</p>
                <p className="text-sm font-bold text-slate-700 capitalize">{role}</p>
              </div>
              <div className="p-2 bg-white rounded-lg shadow-sm font-bold text-[10px] text-purple-600">
                PRO
              </div>
            </div>

            {/* Role Master Card: Compact Version */}
            <div className="md:col-span-2 p-5 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl md:rounded-[2rem] text-white shadow-lg shadow-purple-100">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-black tracking-tight">Privilege Level</h3>
                <span className="text-[9px] px-2 py-0.5 bg-white/20 rounded-md font-bold uppercase tracking-tighter">Verified</span>
              </div>
              <p className="text-xs md:text-sm text-purple-100 leading-relaxed font-medium opacity-90">
                {role === 'admin' && "Full System Access: Managed permissions, university data, and user logs."}
                {role === 'moderator' && "Operational Access: Application verification and scholarship reviews enabled."}
                {role === 'student' && "Standard Access: Track your applications and university feedback."}
              </p>
            </div>
          </div>

          {/* Mobile CTA */}
          <button className="md:hidden mt-6 w-full py-4 bg-slate-900 text-white text-sm font-black rounded-2xl shadow-xl active:scale-95 transition-transform">
            Edit Profile Info
          </button>
        </div>
      </div>
      
      {/* Bottom ID Footer */}
      <div className="mt-4 text-center">
        <p className="text-[10px] text-slate-400 font-mono tracking-tighter uppercase">
          Device Authenticated • UID: {user?.uid?.slice(0, 12)}...
        </p>
      </div>
    </div>
  );
};

// Simple Icon for the Field Card
const UserIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

export default ProfileComponent;