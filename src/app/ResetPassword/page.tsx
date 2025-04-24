'use client';

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { BallTriangle } from 'react-loader-spinner';
import { resetPasswordUser } from "../lib/ResetPassword/ResetPassword";

type LoginFormInputs = {
  email: string;
  newPassword: string;
};

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();

  const dispatch: any = useDispatch();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Submitting Login Data: ", data);
    dispatch(resetPasswordUser(data));
  };

  const handleLoginClick = () => {
    handleSubmit(onSubmit)();
  };

  const { isLoading, isError } = useSelector((state: any) => state.resetPassword)


  return (
    <div className="min-h  flex   justify-center bg-gradient-to-br from-teal-50 to-indigo-100 p-4">
      <div className="w-full mb-5  max-w-md mt-10 bg-white/80 backdrop-blur-lg shadow-xl rounded-lg">
        <div className="p-6 space-y- text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">
          Reset Password
          </h1>
        </div>

        <div className="p-6">
          {isLoading ? <div className="flex justify-center">

            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="oklch(60% .118 184.704)"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              // wrapperClass=""
              visible={true}
            /></div> :

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-right">
        <div className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-10 py-3 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute mt-2 left-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      
        {/* حقل كلمة المرور */}
        <div className="space-y-4 ">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="newPassword"
              {...register("newPassword", { required: "newPassword is required" })}
              className="w-full px-10 py-3 text-left border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-3 mt-1 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 mt-1 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              )}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
        </div>
      

      
        {isLoading ? "0" : <button
          type="submit"
          onClick={handleLoginClick}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-600 cursor-pointer hover:from-teal-700 hover:to-indigo-700 text-white py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          Send
        </button>}
      
   
      </form>
      

          }

        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
