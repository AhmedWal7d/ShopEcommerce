
'use client'
import Link from 'next/link';
import React, { use, useEffect, useState } from 'react';
import {
    FiHeart,
    FiShare2,
    FiClock,
    FiShoppingBag,
    FiCreditCard,
    FiChevronLeft
} from 'react-icons/fi';
import { IoCartSharp } from 'react-icons/io5';
import img from '../../../../src/app/__AllCommponent/AllimgApp/cartimg.png'
import img2 from '../../../../src/app/__AllCommponent/AllimgApp/cartimg2.png'
import img3 from '../../../../src/app/__AllCommponent/AllimgApp/cartimg3.png'
import img4 from '../../../../src/app/__AllCommponent/AllimgApp/cartimg4.png'
import img5 from '../../../../src/app/__AllCommponent/AllimgApp/cartimg5.png'
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { getoneproduct } from '@/app/lib/products/Products';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import { BallTriangle } from 'react-loader-spinner';
import Head from 'next/head';
import { addToCart } from '@/app/lib/cart/cart';
import { getAllcart, Updatecartitem } from '@/app/lib/cart/getAllCart';
import { toast } from 'react-toastify';

interface typedata {
    title: string;
    description: string;
    price: number;
    ratingsAverage: number;
    images: string[];


}


const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const [quantity, setQuantity] = useState(2);
    const [data, setdata] = useState<typedata | null>(null)

    const { id } = use(params);
    const dispatch = useDispatch<any>();

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                const response: any = await dispatch(getoneproduct(id));
                setdata(response?.payload?.data)
            }
        };
        fetchProduct();
    }, [dispatch, id]);

  

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false
    };
    const addtocard = () => {
        try {
            if (id) {
                dispatch(addToCart({ productId: id }));
            }
        } catch (error) {
        }
    }
    let isloading = useSelector((state: any) => state?.product)



      async function updateqte(id: string, count: number) {
        try {
          await dispatch(Updatecartitem({ id, count }));
      
          const { payload }: any = await dispatch(getAllcart());
          console.log(payload);
          
        //   setData(payload?.items?.data || []);
        //   settotalCartPrice(payload?.items?.data?.totalCartPrice || 0);
        } catch (error) {
          toast.error('Update failed');
          console.error('Update failed:', error);
        }
      }

      console.log(data);
      

    return (
        <div className=" mx-auto px-4 py-8 bg-gray-100 ">
            <Head>
                <title>{"Default Title"}</title>
                <meta name="description" content={data?.description || "Default description"} />
            </Head>

            {isloading?.isloading ? <div className='flex justify-center items-center'>
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="oklch(60% .118 184.704)"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    // wrapperClass=""
                    visible={true}
                />
            </div> : <div className='container'>
                <nav className="flex  gap-2 text-sm text-gray-600">
                    <Link href='/' className='text-teal-600 font-bold '>  Home</Link>
                    <FiChevronLeft className="w-4 h-4 text-teal-600 mt-1" />
                    <span className='text-teal-600 mt-1'> Kitchen and Dining</span>
                    <FiChevronLeft className="w-4 h-4 text-teal-600 mt-1" />
                    <span className='text-teal-600 mt-1'> Cookware</span>
                    <FiChevronLeft className="w-4 h-4 text-teal-600 mt-1" />
                    <span className='text-teal-600 mt-1'>
                        Pan Sets</span>
                    <FiChevronLeft className="w-4 h-4 text-teal-600  mt-1" />
                    <span className='text-gray-400 font-bold mt-1'>  {data?.title} </span>
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                    {/* Product Image */}
                    <div className='bg-white'>

                        <div className="flex justify-center items-center p-10">
                            {Array.isArray(data?.images) && data.images.length > 0 ? (
                                <Slider
                                    {...settings}
                                    className="w-full max-w-md"
                                >
                                    {data.images.map((img: string, index: number) => (
                                        <div key={index}>
                                            <img
                                                src={img}
                                                alt={`Product Image ${index + 1}`}
                                                className="w-full h-[55vh] rounded-lg"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                <p>No images available</p>

                            )}
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold text-teal-600">     {data?.description.slice(1 , 150)}</h1>

                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <FiHeart className="w-6 h-6" />
                                </button>
                                <button className="p-2 hover:bg-gray-100 rounded-full">
                                    <FiShare2 className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 justify-between">
                            <div>
                                <span className="text-2xl font-bold text-teal-600"> {data?.price} </span>
                                <span className="text-gray-400 line-through  mx-4 text-lg pt-4">{data?.price} </span>
                                <div className='px-2 text-yellow-400 flex'> <p className='pt-3'>{data?.ratingsAverage}</p> <FaStar className='mt-4 mx-2' /> </div>
                            </div>

                            <div className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                                Offer 9%
                            </div>
                        </div>
{/* 
                        <div className="flex items-center justify-start gap-4 mt-4">
                            <span className="text-gray-600"> Select QTY</span>

                            <div className="flex items-center border rounded-md">
                                <button
                                    onClick={()=>updateqte(data?.category._id , data.count+1)}
                                    className="px-4 py-2 text-xl border-r hover:bg-gray-100"
                                >
                                    +
                                </button>
                                <span className="px-6 py-2">{quantity}</span>
                                <button
                                    onClick={decreaseQuantity}
                                    className="px-4 py-2 text-xl border-l hover:bg-gray-100"
                                >
                                    -
                                </button>
                            </div>
                        </div> */}

                        <div className="flex gap-4 mt-6">

                            <button onClick={addtocard} className="flex cursor-pointer items-center justify-center gap-2 mx-auto bg-teal-600 w-full  text-white hover:bg-teal-700 py-2 px-4 rounded-md">
                                Add To Cart <IoCartSharp size={20} />
                            </button>

                        </div>


                        <div className="mt-8 space-y-4">
                            <div className="grid lg:grid-cols-2 sm:grid-cols-1 ">
                                <div className="flex items-center  justify-end gap-4 text-gray-700">
                                    <Image src={img} alt='logo' />
                                    <div className='mt-5'>
                                        <h6 className="font-semibold text-sm">Delivery Time Inside Cairo & Giza </h6>
                                        <div className="text-sm">1-3 Business Days</div>
                                    </div>

                                </div>
                                <div className="flex items-center  justify-end gap-4 text-gray-700">
                                    <Image src={img} alt='logo' />
                                    <div className='mt-5'>
                                        <h6 className="font-semibold text-sm">Delivery Time Outside Cairo & Giza </h6>
                                        <div className="text-sm">5-7 Business Days</div>
                                    </div>

                                </div>
                            </div>

                            <div className="border  border-gray-300"></div>

                            <div className="grid grid-cols-3">


                                <div className="flex">
                                    <Image src={img2} alt='logo' />
                                    <div className='mx-3'>
                                        <p className='font-bold text-teal-600 text-sm'> Warranty </p>
                                        <p> 1 Year </p>
                                    </div>
                                </div>

                                <div className="flex">
                                    <Image src={img3} alt='logo' />
                                    <div className='mx-3'>
                                        <p className='font-bold text-teal-600 text-sm'> Secure Payment </p>
                                        <p> Cash On Delivery </p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <Image src={img4} alt='logo' />
                                    <div className='mx-3'>
                                        <p className='font-bold text-teal-600 text-sm'> Return </p>
                                        <p> For 14 Days </p>
                                    </div>
                                </div>


                            </div>


                        </div>
                    </div>
                </div>
            </div>}


        </div>
    );
};

export default page;
