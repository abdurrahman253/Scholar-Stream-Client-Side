import { TbFidgetSpinner, TbEdit, TbShieldCheck, TbMail, TbFingerprint } from 'react-icons/tb';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const ProfileComponent = () => {
  const { user } = useAuth();
  const { role, loading: roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="relative">
          <TbFidgetSpinner className="w-12 h-12 animate-spin text-indigo-600" />
          <div className="absolute inset-0 blur-xl bg-indigo-400/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  
  const getRoleTheme = () => {
    switch (role) {
      case 'admin': return 'from-amber-500 to-orange-600';
      case 'moderator': return 'from-blue-600 to-indigo-700';
      default: return 'from-purple-600 to-pink-600';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto animate-in fade-in duration-700">
      
      
      <div className="bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-100 relative">
        
       
        <div className={`h-32 md:h-56 bg-gradient-to-br ${getRoleTheme()} relative`}>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          
          
          <div className="absolute top-6 right-6">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
              <TbShieldCheck className="text-white w-4 h-4" />
              <span className="text-white text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
                {role} Account
              </span>
            </div>
          </div>
        </div>

       
        <div className="px-6 md:px-16 pb-12">
          <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 md:-mt-24 mb-10 gap-6">
            
            
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-white to-white/50 rounded-[2.8rem] blur-sm opacity-50"></div>
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2.5rem] border-[6px] border-white bg-slate-50 shadow-2xl overflow-hidden relative z-10">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-5xl font-black text-slate-200">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

          
            <div className="text-center md:text-left md:pb-4 flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
                  {user?.displayName || "Member"}
                </h1>
                <span className="hidden md:inline-flex px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  Online
                </span>
              </div>
              <p className="flex items-center justify-center md:justify-start gap-2 text-slate-500 font-medium mt-1 md:text-lg">
                <TbMail className="opacity-60" /> {user?.email}
              </p>
            </div>

          
            <div className="hidden md:flex gap-3 pb-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95">
                <TbEdit className="text-lg" />
                Edit Profile
              </button>
            </div>
          </div>

          <hr className="border-slate-100 mb-10" />

         
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
         
            <div className="p-6 bg-slate-50/50 rounded-[2rem] border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TbFingerprint className="text-2xl text-indigo-600" />
              </div>
              <p className="text-[10px] uppercase tracking-widest font-black text-slate-400 mb-1">Unique User ID</p>
              <p className="text-sm font-mono font-bold text-slate-700 truncate">{user?.uid}</p>
            </div>

            
            <div className={`md:col-span-2 p-8 bg-gradient-to-br ${getRoleTheme()} rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-indigo-200`}>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-black tracking-tight">Access Privilege</h3>
                  </div>
                  <p className="text-white/90 text-sm md:text-base leading-relaxed font-medium max-w-xl">
                    {role === 'admin' && "System Architect: You have absolute control over university data, system configurations, and user management modules."}
                    {role === 'moderator' && "Verification Expert: You are authorized to review applications, manage scholarship listings, and moderate user reviews."}
                    {role === 'student' && "Academic Explorer: Standard profile. You can apply for scholarships, track progress, and share your experiences."}
                  </p>
               </div>
            </div>

          </div>

          
          <button className="md:hidden mt-8 w-full py-5 bg-slate-900 text-white text-sm font-black rounded-[1.5rem] shadow-xl shadow-slate-200 active:scale-95 transition-transform flex items-center justify-center gap-2">
            <TbEdit className="text-lg" />
            Edit Profile Settings
          </button>

        </div>
      </div>
      
     
      <div className="mt-8 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-slate-200"></span>
          End-to-End Encrypted Dashboard
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;