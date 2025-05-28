import Navbar from '../../components/NavBar';
import Layout from '../../components/Page_Paddings';
import { useState, useEffect } from 'react';
import './AdminUserList.css';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/user?userType=Customer`
        );
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

  if (loading) return <div className="loading-message">Loading users...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <Layout>
        <div className="user-management user-management-admin full-page-admin">
          <h2>User Management</h2>
          <div className="controls">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="user-search-input"
            />
            <span className="total-users">Matching Users: {filteredUsers.length}</span>
          </div>
          {filteredUsers.length === 0 ? (
            <p className="no-users">No users found.</p>
          ) : (
            <div className="table-responsive">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Type</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Birthday</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user._id}>
                      <td>{(user.firstName || 'NoFirst')} {(user.lastName || 'NoLast')}</td>
                      <td>{user.email || 'NoEmail'}</td>
                      <td>{user.userType || 'Unknown'}</td>
                      <td>{user.address || <span style={{color:'#aaa'}}>N/A</span>}</td>
                      <td>{user.phone || <span style={{color:'#aaa'}}>N/A</span>}</td>
                      <td>
                        {user.birthday
                          ? new Date(user.birthday).toLocaleDateString()
                          : <span style={{color:'#aaa'}}>N/A</span>
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default AdminUserList;
