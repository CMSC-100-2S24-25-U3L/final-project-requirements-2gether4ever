import React, { useEffect, useState } from "react";
import axios from "axios";
import OrderCard from "./OrderCard";

const ProfileTab = ({ userEmail }) => {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedOrders = async () => {
      if (!userEmail) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/user-transaction/completed?userId=${userEmail}`
        );
        setCompletedOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setCompletedOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCompletedOrders();
  }, [userEmail]);

  return (
    <div className="profile-orders-tab">
      <h3 className="profile-orders-title">Completed Orders</h3>
      <div style={{ minHeight: 120 }}>
        {loading ? (
          <div style={{ color: "#888" }}>Loading...</div>
        ) : completedOrders.length === 0 ? (
          <div
            style={{
              color: "#bbb",
              border: "2px dashed #e5e7eb",
              borderRadius: 12,
              padding: "32px 0",
              textAlign: "center",
              background: "#fafaf3",
            }}
          >
            No completed orders yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {completedOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileTab;
