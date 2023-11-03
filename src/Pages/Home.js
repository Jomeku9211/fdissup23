import React from "react";
import img from "../images/img.png";
import AdminLayout from "../Layouts/admin.layout";

const Home = () => {
  return (
    <>
      <AdminLayout>
        <div className="w-full mt-8">
          <div className="border-2 border-gray-200">
            <img src={img} alt="home" className="w-full" />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Home;
