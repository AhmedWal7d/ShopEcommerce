'use client'
import { useDispatch, useSelector } from 'react-redux'
import { getAllproduct } from '../lib/products/Products'
import { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../lib/store'
import PostHeart from '../heart/postheard'
import { CiStar } from 'react-icons/ci'
import Image from 'next/image'

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  ratingsAverage: number;
};

export default function Page() {
  const dispatch: AppDispatch = useDispatch()
  const { allproduct } = useSelector((state: RootState) => state.product)

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  useEffect(() => {
    dispatch(getAllproduct())
  }, [dispatch])

  return (
    <div>
      <div className='bg-gray-100 grid lg:grid-cols-4 mt-15 md:grid-cols-2 sm:grid-cols-1'>
        {allproduct?.map((product: Product) => (
          <div className="px-2" key={product?.id} onClick={() => setSelectedProduct(product)}>
            <div className="rounded-2xl pb-3 px-4 shadow-sm mt-5 bg-white text-sm font-sans flex flex-col justify-between cursor-pointer hover:shadow-md transition">
              <div className="flex items-start justify-between p-4">
                <div className="space-y-1">
                  <span className="bg-teal-600 text-white text-xs px-2 py-1 rounded-md">50% Off Interest</span><br />
                  <span className="bg-red-600 text-white text-xs w-25 px-2 py-1 mt-2 block rounded-md">
                    {Math.max(product?.price - 150, 0)} EGP offer
                  </span>
                </div>
                <div className="text-gray-500 hover:text-red-500 bg-blue-100 rounded-full p-1 mx-0 cursor-pointer">
                  <PostHeart productId={product?.id} />
                </div>
              </div>

              <div className="flex justify-center">
                <Image
                  src={product?.images[0]}
                  alt="product"
                  width={200}
                  height={112}
                  className="w-full h-28 object-contain"
                />
              </div>

              <div className='mt-3 text-start'>
                <div className="flex px-4 items-center text-yellow-500 text-sm">
                  <CiStar size={18} />
                  <p className='mx-1'>{product?.ratingsAverage}</p>
                </div>
                <h3 className="text-gray-800 font-medium mt-2 px-4 line-clamp-2 h-[48px]">{product?.title}</h3>
              </div>

              <div className="flex items-center gap-2 px-4 pt-0 mt-0">
                <span className="text-teal-600 font-bold text-lg">{product?.price} EGP</span>
                <span className="text-gray-400 line-through text-sm">{product?.price - 100} EGP</span>
              </div>

              <p className="text-xs px-4 pb-1 text-gray-600 line-clamp-2 h-[32px]">{product?.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for product details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl w-11/12 md:w-1/2 p-6 relative">
            <button className="absolute top-2 right-4 text-red-500 text-xl" onClick={() => setSelectedProduct(null)}>×</button>
            <h2 className="text-xl font-semibold mb-3">{selectedProduct.title}</h2>
            <Image src={selectedProduct.images[0]} alt={selectedProduct.title} width={400} height={200} className="mx-auto object-contain h-40" />
            <p className="mt-3">{selectedProduct.description}</p>
            <div className="flex justify-between mt-4">
              <span className="text-teal-600 text-lg font-bold">{selectedProduct.price} EGP</span>
              <span className="text-gray-400 line-through text-sm">{selectedProduct.price - 100} EGP</span>
            </div>
            <div className="text-yellow-500 mt-2 flex items-center">
              <CiStar size={18} />
              <p className="ml-1">{selectedProduct.ratingsAverage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
