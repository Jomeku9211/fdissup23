import React, { useState } from "react";
import img from "../images/img.png";
import { useHistory, Link } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onSubmit = () => {
    if (userName === "superadmin" && password === "XxYyZz") {
      history.push("/home");
    } else {
      window.alert("Please check your username and password and Try again");
    }
  };

  return (
    <>
      <div className="">
        <div className="bg-gray-400 bg-cover lg:flex Lg:items-center">
          <div className="flex bg-white lg:w-1/2 mx-auto px-10 h-96 lg:my-48 items-center">
            <div>
              <form className="grid place-content-center lg:w-64 h-full ">
                <div className="mb-6">
                  <label
                    for="username"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    UserName
                  </label>
                  <input
                    type="username"
                    id="username"
                    placeholder="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>
                <div className="mb-6">
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-cente"
                  onClick={onSubmit}
                >
                  Login
                </button>
              </form>
            </div>
            <div>
              <img src={img} alt="logo" className="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
