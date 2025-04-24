'use client'
import { useDispatch, useSelector } from 'react-redux'
import { getAllproduct } from '../lib/products/Products'
import Link from 'next/link'
import PostHeart from '../heart/postheard'
import { CiStar } from 'react-icons/ci'
import { useEffect } from 'react'

export default function page() {
    const dispatch: any = useDispatch()
    const { allproduct } = useSelector((state: any) => state.product)
  
    useEffect(() => {
      dispatch(getAllproduct())
    }, [dispatch])



    
    return (
        <div>

            <div className='bg-gray-100 grid lg:grid-cols-4 mt-15 md:grid-cols-2 sm:grid-cols-1'>
            {allproduct?.map((product: any) => (
            <div className="px-2" key={product?.id}>
              <div className="rounded-2xl pb-3 px-4 shadow-sm mt-5 bg-white text-sm font-sans flex flex-col justify-between">
                <div className="flex items-start justify-between p-4">
                  <div className="space-y-1">
                    <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-md">50% Off Interest</span><br />
                    <span className="bg-red-600 text-white text-xs w-25 px-2 py-1 mt-2 block rounded-md">
                      {Math.max(product?.price - 150, 0)} EGP offer
                    </span>
                  </div>
                  {/* Replace button with div */}
                  <div className="text-gray-500 hover:text-red-500 bg-blue-100 rounded-full p-1 mx-0 cursor-pointer">
                    <PostHeart productId={product?.id} />
                  </div>
                </div>

                <Link href={`productDetails/${product.id}`} className="text-center mt-5 px-2 mb-8">
                  <div className="flex justify-center">
                    <img src={product?.images[0]} alt="product" className="w-full h-28 object-contain" />
                  </div>

                  <div className='mt-3 text-start'>

                    <div className="flex px-4 items-center text-yellow-500 text-sm">
                      <CiStar size={18} />
                      <p className='mx-1'>{product?.ratingsAverage}</p>
                    </div>

                    <h3 className="text-gray-800 font-medium mt-2 px-4 line-clamp-2 h-[48px]">{product?.title}</h3></div>

                  <div className="flex items-center gap-2 px-4 pt-0 mt-0">
                    <span className="text-teal-600 font-bold text-lg">{product?.price} EGP</span>
                    <span className="text-gray-400 line-through text-sm">{product?.price - 100} EGP</span>
                  </div>

                  <p className="text-xs px-4 pb-1 text-gray-600 line-clamp-2 h-[32px]">{product?.description}</p>
                </Link>
              </div>
            </div>
          ))}
            </div>
        </div>
    )
}
