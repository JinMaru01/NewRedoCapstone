import React from "react";
import { useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex">
        <div className="w-1/2 min-h-[500px] bg-gradient-to-tr from-customTeal-light/50 to-customTeal-dark/80 text-white p-8  rounded-l-lg rounded-r-3xl flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
          <p className="mb-8">
            To keep connected with us please sign up with your personal
            infomation.
          </p>
          <p className="mb-4">Sign In if you already have account!</p>
          <button 
          type="bottom"
          onClick={()=>{
            navigate('/login');
          }}
          className="bg-customTeal-dark text-white py-3 px-14 border bg-transparent text-sm rounded-full hover:bg-customTeal-dark ">
            SIGN IN
          </button>
        </div>
        <div className="w-2/3 p-8 flex flex-col justify-center items-center">
          <h2 className="text-3xl font-bold text-customTeal">Create Account</h2>
          <div className="w-1/6">
            <div className="border-t border-2 rounded-full border-customTeal my-4"></div>
          </div>
          <div className="relative w-4/5 mb-4">
            <label className="block text-gray-400 text-sm">Name</label>
            <input
              type="text"
              // placeholder="name"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-customTeal transition duration-200"
            />
          </div>
          <div className="relative w-4/5 mb-4">
            <label className="block text-gray-400 text-sm">Email</label>
            <input
              type="text"
              // placeholder="Email"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-customTeal transition duration-200"
            />
          </div>
          <div className="relative w-4/5 mb-4">
            <label className="block text-gray-400 text-sm">Password</label>
            <input
              type="text"
              // placeholder="Password"
              className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-customTeal transition duration-200"
            />
          </div>
          <button className="bg-customTeal text-white mt-2 py-3 text-sm px-14 rounded-full hover:bg-customTeal-dark">
            SIGN UP
          </button>
          <div className="flex items-center w-4/5 m-4">
            <div className="flex-grow border-t border-b w-4/5"></div>
            <h1 className="lg:text-xl md:text-base text-base  mx-4">or </h1>
            <div className="flex-grow border-t border-b w-4/5"></div>
          </div>

          <div className="flex justify-center space-x-4 mb-8">
            <button className="bg-white p-2 rounded-full border">
              <Icon icon="basil:facebook-solid" width="24" height="24" />
            </button>
            <button className="bg-white p-2 rounded-full border">
              <Icon icon="prime:google" width="24" height="24" />
            </button>
            <button className="bg-white p-2 rounded-full border">
              <Icon icon="iconoir:instagram" width="24" height="24" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
