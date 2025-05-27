import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/NavBar";
import ProfileTab from "../../components/user/ProfileTab";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Get user ID from token or localStorage (adjust as needed)
  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      userId = payload.id;
    } catch (e) {
      userId = null;
    }
  }

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return setLoading(false);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/user/${userId}`
        );
        setUser(res.data);
        setForm({
          firstName: res.data.firstName || "",
          lastName: res.data.lastName || "",
          address: res.data.address || "",
          phone: res.data.phone || "",
          birthday: res.data.birthday
            ? new Date(res.data.birthday).toISOString().split("T")[0]
            : "",
        });
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setEditing(true);
    setError("");
  };

  const handleCancel = () => {
    setEditing(false);
    setError("");
    // Reset form to original user data
    setForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      address: user.address || "",
      phone: user.phone || "",
      birthday: user.birthday
        ? new Date(user.birthday).toISOString().split("T")[0]
        : "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/user/${userId}`,
        form
      );
      setUser(res.data);
      setEditing(false);
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="profile-main-flex">
        <div className="profile-page">
          <div className="profile-card">
            <h2 className="profile-title">👤 My Profile</h2>
            {loading ? (
              <div className="profile-loading">Loading...</div>
            ) : !user ? (
              <div className="profile-error">Unable to load user details.</div>
            ) : editing ? (
              <form className="profile-details" onSubmit={handleSave}>
                <div>
                  <span className="profile-label">First Name:</span>
                  <input
                    className="profile-input"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <span className="profile-label">Last Name:</span>
                  <input
                    className="profile-input"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <span className="profile-label">Address:</span>
                  <input
                    className="profile-input"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <span className="profile-label">Phone:</span>
                  <input
                    className="profile-input"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <span className="profile-label">Birthday:</span>
                  <input
                    className="profile-input"
                    name="birthday"
                    type="date"
                    value={form.birthday}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 18 }}>
                  <button
                    type="submit"
                    className="profile-btn save"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    className="profile-btn cancel"
                    onClick={handleCancel}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                </div>
                {error && <div className="profile-error">{error}</div>}
              </form>
            ) : (
              <div className="profile-details">
                <div>
                  <span className="profile-label">First Name:</span>
                  <span className="profile-value">{user.firstName || "-"}</span>
                </div>
                <div>
                  <span className="profile-label">Last Name:</span>
                  <span className="profile-value">{user.lastName || "-"}</span>
                </div>
                <div>
                  <span className="profile-label">Email:</span>
                  <span className="profile-value">{user.email || "-"}</span>
                </div>
                <div>
                  <span className="profile-label">User Type:</span>
                  <span className="profile-value">{user.userType || "-"}</span>
                </div>
                <div>
                  <span className="profile-label">Address:</span>
                  <span className="profile-value">{user.address || "-"}</span>
                </div>
                <div>
                  <span className="profile-label">Phone:</span>
                  <span className="profile-value">{user.phone || "-"}</span>
                </div>
                <div>
                  <span className="profile-label">Birthday:</span>
                  <span className="profile-value">
                    {user.birthday
                      ? new Date(user.birthday).toLocaleDateString()
                      : "-"}
                  </span>
                </div>
                <div style={{ marginTop: 18 }}>
                  <button
                    className="profile-btn edit"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <ProfileTab userId={userId} />
      </div>
    </div>
  );
};

export default Profile;