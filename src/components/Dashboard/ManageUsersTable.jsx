// src/components/Dashboard/ManageUsersTable.jsx
import { useEffect, useState } from 'react';

const ManageUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetch('/users') // backend এ users collection থেকে fetch
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const filtered = filter === 'all' ? users : users.filter(u => u.role === filter);

  const handleRoleChange = async (id, newRole) => {
    await fetch(`/users/${id}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    });
    setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
  };

  const handleDelete = async (id) => {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-purple-600">Manage Users</h1>
      
      <select
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="mb-6 px-4 py-2 bg-purple-50 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="all">All Roles</option>
        <option value="student">Student</option>
        <option value="moderator">Moderator</option>
        <option value="admin">Admin</option>
      </select>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-purple-50">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Role</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user._id} className="border-t border-gray-700 hover:bg-purple-50 transition">
                <td className="p-4">{user.name}</td>
                <td className="p-4">{user.email}</td>
                <td className="p-4">
                  <select
                    value={user.role}
                    onChange={e => handleRoleChange(user._id, e.target.value)}
                    className="px-3 py-1 bg-gray-600 rounded text-gray-900"
                  >
                    <option value="student">Student</option>
                    <option value="moderator">Moderator</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersTable;