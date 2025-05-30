'use client';

import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { BallTriangle } from 'react-loader-spinner';
import { verifyResetCodesUser } from "../lib/verifyResetCode/verifyResetCode";
import { AppDispatch, RootState } from "../lib/store";

// تعريف نوع البيانات للـ Form
type forgotPasswordsFormInputs = {
  
    resetCode: string;
};

const ForgotPasswords = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<forgotPasswordsFormInputs>();

  const dispatch: AppDispatch = useDispatch();

  const onSubmit: SubmitHandler<forgotPasswordsFormInputs> = (data) => {
    dispatch(verifyResetCodesUser(data));
  };

  const handleforgotPasswordsClick = () => {
    handleSubmit(onSubmit)();
  };

  const { isLoading } = useSelector((state: RootState) => state.verifyResetCodes);


// console.log(isLoading);

  return (
    <div className="min-h  flex   justify-center bg-gradient-to-br from-teal-50 to-indigo-100 p-4">
      <div className="w-full mb-5  max-w-md mt-10 bg-white/80 backdrop-blur-lg shadow-xl rounded-lg">
        <div className="p-6 space-y- text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">
          verify Reset Code
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
              type="text"
       
              placeholder="Code"
              {...register("resetCode", { required: "verifyResetCode is required" })}
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
          {errors.resetCode && <p className="text-red-500 text-sm">{errors.resetCode.message}</p>}
        </div>
      
   
      
      
      
        {isLoading ? "0" : <button
          type="submit"
          onClick={handleforgotPasswordsClick}
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

export default ForgotPasswords;
