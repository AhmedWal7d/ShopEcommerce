'use client';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { BallTriangle } from 'react-loader-spinner';
import { registerUser } from "../lib/register/register";
import Link from "next/link";
import { AppDispatch, RootState } from "../lib/store";

type RegisterFormInputs = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { isLoading } = useSelector((state: RootState) => state.rigster);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log("Submitting register data: ", data);
    dispatch(registerUser(data));
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl rounded-lg">
        <div className="p-6 text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">
            Register
          </h1>
          <p className="text-gray-500">Create your account to continue</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">

            {/* Full Name */}
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "name name is required" })}
                className="w-full px-10 py-3 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4 4 0 007 21h10a4 4 0 001.879-3.196M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-10 py-3 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            {/* phone */}
            <div className="relative">
              <input
                type="tel"
                placeholder="phone"
                {...register("phone", { required: "phone is required" })}
                className="w-full px-10 py-3 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.586a1 1 0 01.707.293l1.414 1.414a1 1 0 01.293.707V7a1 1 0 01-1 1H7v2a10.97 10.97 0 0010 10h2v-3a1 1 0 011-1h1.586a1 1 0 01.707.293l1.414 1.414a1 1 0 01.293.707V19a2 2 0 01-2 2H17c-6.075 0-11-4.925-11-11V5z" />
              </svg> 

              {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full px-10 py-3 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            {/* rePassword */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "rePassword"}
                placeholder="rePassword"
                {...register("rePassword", { required: "rePassword is required" })}
                className="w-full px-10 py-3 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M3 3l3.59 3.59" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-start">
              <Link href="/forgetpassword" className="text-sm text-teal-600 hover:text-teal-800 hover:underline">
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <div>
              {isLoading ? (
                <div className="flex justify-center">
                  <BallTriangle
                    height={40}
                    width={40}
                    color="#14b8a6"
                    ariaLabel="loading"
                    visible={true}
                  />
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r cursor-pointer from-teal-600 to-teal-600 text-white py-2 rounded-lg transition duration-200 hover:scale-[1.02]"
                >
                  Register
                </button>
              )}
            </div>

            {/* Footer */}
            <div className="text-gray-600 text-sm pb-5 text-center">
              Already have an account?
              <Link href="/login" className="text-teal-600 hover:text-teal-800 hover:underline ml-1">
                Login here
              </Link>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
