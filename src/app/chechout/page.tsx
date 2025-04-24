'use client';

import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { BallTriangle } from 'react-loader-spinner';
import { paymentcartitem } from "../lib/cart/getAllCart";

type PaymentFormInputs = {
  details: string;
  phone: string;
  city: string;
};

const PaymentPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormInputs>();
  const dispatch: any = useDispatch();
  const { isLoading, isError } = useSelector((state: any) => state.login);

  const onSubmit: SubmitHandler<PaymentFormInputs> = async (data) => {
    const cartId = "6529668a728ca75a7ac67a9c";
    const paymentUrl = `${cartId}${window.location.origin}`; 

    const result = await dispatch(paymentcartitem({
      id: [cartId], 
      url: paymentUrl,
      formvalues: data,
    }));

    if (result?.payload?.status === 'success') {
      window.location.href = result.payload.session.url;
    } else {
      console.error("حدث خطأ أثناء الدفع:", result?.payload);
    }
  };

  return (
    <div className=" flex justify-center bg-gradient-to-br from-teal-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl rounded-lg mt-20 mb-10">
        <div className="p-6 text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-600 bg-clip-text text-transparent">
            Payment Gateway
          </h1>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center">
              <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="oklch(60% .118 184.704)"
                ariaLabel="ball-triangle-loading"
                visible={true}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-right">

              {/* حقل التفاصيل */}
              <div>
                <input
                  type="text"
                  placeholder="Details"
                  {...register("details", { required: "Details is required" })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {errors.details && <p className="text-red-500 text-sm">{errors.details.message}</p>}
              </div>

              {/* حقل رقم الهاتف */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: "Enter a valid phone number"
                    }
                  })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              {/* حقل المدينة */}
              <div>
                <input
                  type="text"
                  placeholder="City"
                  {...register("city", { required: "City is required" })}
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
              </div>

              {/* زر الدفع */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Pay Now
              </button>

              {/* رسالة خطأ عامة (اختياري) */}
              {isError && (
                <p className="text-red-500 text-center text-sm mt-2">حدث خطأ أثناء الدفع. حاول مرة أخرى.</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
