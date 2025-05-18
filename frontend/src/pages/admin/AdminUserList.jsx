
import Navbar from '../../components/NavBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/admin/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const email = user.email || '';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return (
      email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/admin/users/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading-message">Loading users...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="user-management">
        <h2>User Management</h2>

        <div className="controls">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="total-users">Matching Users: {filteredUsers.length}</span>
        </div>

        {filteredUsers.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{(user.firstName || 'NoFirst')} {(user.lastName || 'NoLast')}</td>
                  <td>{user.email || 'NoEmail'}</td>
                  <td>{user.userType || 'Unknown'}</td>
                  <td>
                    <button className="btn-delete" onClick={() => deleteUser(user._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AdminUserList;
