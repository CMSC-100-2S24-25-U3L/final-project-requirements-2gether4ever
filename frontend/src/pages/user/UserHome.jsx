import React from "react";
<<<<<<< HEAD

const UserHome = () => {
    return (
      <div>
        <Navbar />
        
      </div>
    );
};

export default UserHome;
=======
import { Link } from "react-router-dom";

const UserHome = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Welcome to DA's Shop!</h1>
            <p style={styles.subtext}>Your one-stop shop for all your favorites 💖</p>

            <div style={styles.buttonContainer}>
                <Link to="/shop" style={styles.button}>🛍️ Browse Products</Link>
                <Link to="/shop/cart" style={styles.button}>🛒 View Cart</Link>
                <Link to="/shop/order-history" style={styles.button}>📦 Order History</Link>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "40px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif"
    },
    header: {
        fontSize: "2.5rem",
        color: "#d63384",
        marginBottom: "10px"
    },
    subtext: {
        fontSize: "1.2rem",
        color: "#555",
        marginBottom: "30px"
    },
    buttonContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        alignItems: "center"
    },
    button: {
        textDecoration: "none",
        backgroundColor: "#ff85b3",
        color: "#fff",
        padding: "12px 25px",
        borderRadius: "25px",
        fontSize: "1rem",
        fontWeight: "bold",
        transition: "0.3s",
        width: "220px",
        textAlign: "center"
    }
};

export default UserHome;
>>>>>>> customer/feature
