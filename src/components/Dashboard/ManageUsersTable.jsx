import { useState } from 'react';
import { FaTrash, FaUserShield, FaUserGraduate, FaUserCog, FaChevronDown } from 'react-icons/fa';
import { TbFidgetSpinner, TbUsersGroup } from 'react-icons/tb';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion, AnimatePresence } from 'framer-motion';

const ManageUsersTable = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('all');

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/users');
      return data;
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: async ({ id, role }) => await axiosSecure.patch(`/users/${id}/role`, { role }),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Updated! ✨');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => await axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      toast.success('Deleted');
    },
  });

  const filteredUsers = filter === 'all' ? users : users.filter(u => u.role === filter);

  const config = {
    admin: { icon: <FaUserShield />, color: 'text-rose-600', bg: 'bg-rose-50', border: 'border-rose-100' },
    moderator: { icon: <FaUserCog />, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    student: { icon: <FaUserGraduate />, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' }
  };

   if (isLoading) {
     return (
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
         <div className="text-center">
           <TbFidgetSpinner className="w-16 h-16 animate-spin text-purple-600 mx-auto" />
           <p className="mt-4 text-gray-600 font-semibold">Loading Users...</p>
         </div>
       </div>
     );
   }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-10">
      {/* স্লিম হেডার */}
      <div className="sticky top-0 z-30 bg-white/70 backdrop-blur-md border-b border-slate-100 px-4 py-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Users <span className="text-indigo-600">({users.length})</span></h1>
            <div className="flex gap-1 overflow-x-auto no-scrollbar py-1">
              {['all', 'student', 'moderator', 'admin'].map((r) => (
                <button
                  key={r}
                  onClick={() => setFilter(r)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all whitespace-nowrap ${
                    filter === r ? 'bg-slate-900 text-white shadow-md' : 'bg-white text-slate-500 border border-slate-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-3 md:p-6">
        <div className="grid grid-cols-1 gap-3">
          <AnimatePresence>
            {filteredUsers.map((user) => {
              const roleInfo = config[user.role] || config.student;
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={user._id}
                  className="bg-white rounded-2xl border border-slate-100 p-3 shadow-sm flex items-center gap-3 relative overflow-hidden group"
                >
                  {/* সাইড রোল ইন্ডিকেটর */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 ${roleInfo.color.replace('text', 'bg')}`} />

                  {/* ইউজার ইমেজ (ছোট) */}
                  <div className="relative flex-shrink-0">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/0Qck0mC/user.png'}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-100"
                      alt=""
                    />
                    <div className={`absolute -bottom-1 -right-1 p-1 rounded-md ${roleInfo.bg} ${roleInfo.color} text-[10px] shadow-sm`}>
                      {roleInfo.icon}
                    </div>
                  </div>

                  {/* ইউজার ইনফো */}
                  <div className="flex-grow min-w-0">
                    <h3 className="text-sm font-bold text-slate-800 truncate leading-none mb-1">
                      {user.name || 'Anonymous'}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate font-medium">
                      {user.email}
                    </p>
                  </div>

                  {/* ছোট রোল সিলেক্টর এবং ডিলিট বাটন */}
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        value={user.role}
                        onChange={(e) => changeRoleMutation.mutate({ id: user._id, role: e.target.value })}
                        className={`appearance-none pl-2 pr-6 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tighter cursor-pointer outline-none border-none ${roleInfo.bg} ${roleInfo.color}`}
                      >
                        <option value="student">Student</option>
                        <option value="moderator">Mod</option>
                        <option value="admin">Admin</option>
                      </select>
                      <FaChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 text-[8px] pointer-events-none ${roleInfo.color}`} />
                    </div>

                    <button 
                      onClick={() => deleteMutation.mutate(user._id)}
                      className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* এম্পটি স্টেট */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-10 opacity-50">
            <TbUsersGroup size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="text-xs font-bold">No Users Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageUsersTable;