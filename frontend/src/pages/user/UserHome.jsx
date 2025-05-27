import React from "react";
import Navbar from "../../components/NavBar";
import Layout from "../../components/Page_Paddings";
import HomeProductList from "../../components/user/HomeProductList";
import { Link } from "react-router-dom";

const UserHome = () => {
    return (
        <div>
          <Navbar />
          <Layout>
            <div
              className="
                bg-[url('/home/main.jpg')]
                bg-cover bg-center
                h-100
                w-full
                relative
              "
            >
              <Link to='/shop'>
                <button
                  className="
                    absolute
                    btn
                    btn-[#424242]
                    right-10
                    bottom-10
                  "
                >
                  Shop Now
                </button>
              </Link>
            </div>
            <HomeProductList />
            <div
              className="
              w-full
              h-[75px]
              flex flex-row
              justify-center
              items-center
              "
            >
              <Link to='/shop'>
                <button
                  className="
                    btn
                    btn-[#424242]
                    mx-auto                    
                  "
                >
                  Shop Now
                </button>
              </Link>
            </div>
            <div 
              className="
                flex flex-row
                items-center
                justify-items-center

              "
            >
              <div>

              </div>
            </div>
          </Layout>
        </div>
    );
};

export default UserHome;
