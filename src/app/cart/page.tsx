'use client'

import { useEffect, useState } from "react";
import { Deletecart, getAllcart, Updatecartitem } from "../lib/cart/getAllCart";
import { useDispatch, useSelector } from "react-redux";
import { BallTriangle } from "react-loader-spinner";
import Link from "next/link";
import imgshop from '../__AllCommponent/AllimgApp/cartshop.jpg'
import Image from "next/image";
import { toast } from "react-toastify";
export default function CartPage() {
  interface typedata {
    id: string;
    count: number;
    price: number;
    products: any;
    totalCartPrice: any;
    product: {
      title: string;
      imageCover: string;

      totalCartPrice: string;
      id: string;
    };
  }

  const [data, setData] = useState<any>([]);
  const dispatch = useDispatch<any>();
  const [totalCartPrice, settotalCartPrice] = useState(0)

  const { isLoading }: any = useSelector((state: any) => state?.getcart);

  useEffect(() => {
    async function getDataCart() {
      const { payload }: any = await dispatch(getAllcart());
      setData(payload?.items?.data || []);
      settotalCartPrice(payload?.items?.data.totalCartPrice)
    }
    getDataCart();
  }, [dispatch]);

  async function deleteItem(id: string) {
    await dispatch(Deletecart(id));
    const { payload }: any = await dispatch(getAllcart());
    settotalCartPrice(payload?.items?.data.totalCartPrice)


    setData(payload?.items?.data || []);
  }

  async function updateqte(id: string, count: number) {
    try {
      await dispatch(Updatecartitem({ id, count }));
  
      const { payload }: any = await dispatch(getAllcart());
      setData(payload?.items?.data || []);
      settotalCartPrice(payload?.items?.data?.totalCartPrice || 0);
    } catch (error) {
      toast.error('Update failed');
      console.error('Update failed:', error);
    }
  }
  
  return (
    <div className="mt-30">
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>
          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
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
                ) : data?.products?.length > 0 ? (
                  data?.products?.map((product: typedata) => (
                    <div key={product?.product.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
                      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                        <img className="h-20 w-20 dark:hidden" src={product?.product?.imageCover} alt={product?.product?.title} />
                        <img className="hidden h-20 w-20 dark:block" src={product?.product?.imageCover} alt={product?.product?.title} />

                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                          <div className="flex items-center">
                            <button type="button" onClick={()=>updateqte(product?.product.id , product.count-1)} className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                              <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                              </svg>
                            </button>
                            <input type="text" className="w-10 text-center text-sm font-medium bg-transparent border-0 text-gray-900 dark:text-white" value={product.count} readOnly />
                            <button onClick={()=>updateqte(product?.product.id , product.count+1)} type="button" className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
                              <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                              </svg>
                            </button>
                          </div>
                          <div className="text-end md:order-4 md:w-32">
                            <p className="text-base font-bold text-gray-900 dark:text-white">${product.price}</p>
                          </div>
                        </div>

                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                          <div className="text-base font-medium text-gray-900 dark:text-white">
                            {product?.product?.title}
                          </div>

                          <div className="flex items-center gap-4">
                            <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                              <svg className="me-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                              </svg>
                              Add to Favorites
                            </button>

                            <button onClick={() => deleteItem(product?.product.id)} type="button" className="inline-flex cursor-pointer items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                              <svg className="me-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                              </svg>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center">
                    <Image src={imgshop} alt='Not Product in cart' />
                    .</div>
                )}
              </div>

            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base  text-teal-600 font-bold dark:text-white"> {totalCartPrice} </dd>
                    </dl>

                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base  text-teal-600 font-bold dark:text-white"> {totalCartPrice} </dd>
                  </dl>
                </div>

                <Link href="/dwe" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Proceed to Checkout</Link>

                <div className="flex items-center justify-center gap-2">
                  <Link href="/chechout" className="inline-flex items-center text-white p-3 rounded-lg  text-center bg-teal-600 gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                    <p className="text-center">Continue Shopping</p>
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
