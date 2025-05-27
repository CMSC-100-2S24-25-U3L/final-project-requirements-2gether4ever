import React from "react";
import Navbar from "../../components/NavBar";
import Layout from "../../components/Page_Paddings";
import { Link } from "react-router-dom";

const UserHome = () => {
    return (
        <div>
          <Navbar />
          <Layout>
            <div>
              <button
                className="
                  btn
                  btn-
                  
                "
              >
                Shop Now
              </button>
            </div>
            <div
              className="
                w-full
                h-[200px]
              "
            >

            </div>
          </Layout>
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
