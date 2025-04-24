'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllfavoriteproduct } from '../lib/favoriteproduct/favorite'
import Link from 'next/link'
import { BsSuitHeart } from 'react-icons/bs'
import { CiStar } from 'react-icons/ci'
import { MdDelete } from "react-icons/md";
import { BallTriangle } from 'react-loader-spinner'
import PostHeart from './postheard'
import DeleteFavorite from './deletefevorit'

export default function Page() {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState<any[]>([]);
    const { isloading }: any = useSelector<any>((state: any) => state.favoriteproducts);

    // useEffect(() => {
      async function fetchOrders() {
        const { payload }: any = await dispatch<any>(getAllfavoriteproduct());
        setOrders(payload?.data);  
        console.log("Ahmmmmmmm" , payload);
        
      }
    //   fetchOrders();
    // }, [dispatch]);

    useEffect(() => {
      fetchOrders()
    }, [])
    
  
    const handleDelete = async (deletedProductId: string) => {
      
      setOrders((prevOrders) => prevOrders.filter((product) => product.id !== deletedProductId));
      fetchOrders()

    };
  
    return (
      <div className="mt-15 bg-gray-100">
        <div className='container mx-auto'>
          {isloading ? (
            <div className="text-center mt-10 flex justify-center p-10 text-blue-500 font-bold">
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
            <div className='grid grid-cols-4 pt-5 pb-5'>
              {orders?.map((product: any) => (
                <div key={product?.id}>
                  <div className="rounded-2xl mx-2 mt-4 bg-white pb-3 shadow-sm pt-5 h-[460px] gap-y-1 text-sm font-sans flex flex-col justify-between">
                    <div className="flex items-start justify-between p-4">
                      <div className="space-y-1">
                        <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-md">50% Off Interest</span><br />
                        <span className="bg-red-600 text-white text-xs w-25 px-2 py-1 mt-2 block rounded-md">{Math.max(product?.price - 150, 0)} EGP offer </span>
                      </div>
                      <button
                        type='button'
                        className="text-red-500 cursor-pointer hover:text-red-500 bg-blue-100 rounded-full p-2 mx-0"
                      >
                        <DeleteFavorite productId={product.id} onProductData={handleDelete} />
                      </button>
                    </div>
                    <Link href={`productDetails/${product.id}`} className="text-center mt-5 px-2 mb-8">
                      <div className="flex justify-center">
                        <img src={product?.imageCover} alt="product" className="w-full h-28 object-contain" />
                      </div>
  
                      <div className="flex px-4 items-center text-yellow-500 text-sm">
                        <CiStar size={18} />
                        <p className='mx-1'>{product?.ratingsAverage}</p>
                      </div>
  
                      <h3 className="text-gray-800 font-medium px-4 line-clamp-2 h-[48px]">
                        {product?.title}
                      </h3>
  
                      <div className="flex items-center gap-2 px-4 pt-0 mt-0">
                        <span className="text-teal-600 font-bold text-lg">{product?.price} EGP</span>
                        <span className="text-gray-400 line-through text-sm">{product?.price - 100} EGP</span>
                      </div>
  
                      <p className="text-xs px-4 pb-1 text-gray-600 line-clamp-2 h-[32px]">
                        {product?.description}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
  
