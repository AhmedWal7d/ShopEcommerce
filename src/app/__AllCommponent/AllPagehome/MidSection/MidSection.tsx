import React from 'react'
import img from '../../AllimgApp/Screenshot 2025-04-17 192830.png'
import img2 from '../../AllimgApp/dateimg.png'
import img3 from '../../AllimgApp/imgshop.png'
import Image from 'next/image'

export default function MidSection() {
  return (
    <div className="container mx-auto bg-blue-50 mt-10 rounded-2xl py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* البوكس الأول */}
        <div className="flex sm:block items-start gap-4">
          <Image src={img} alt="Quick Delivery"  />
          <div>
            <h2 className="text-xl font-bold text-blue-950 mb-1">Quick Delivery</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              Home delivery within 24hr of placing your order
            </p>
          </div>
        </div>

        {/* البوكس الثاني */}
        <div className="flex sm:block items-start gap-4">
          <Image src={img2} alt="Installment"  />
          <div>
            <h2 className="text-xl font-bold text-blue-950 mb-1">Installment Plans</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              Pay for your orders in installments for up to 36 months
            </p>
          </div>
        </div>

        {/* البوكس الثالث */}
        <div className="flex sm:block items-start gap-4">
          <Image src={img3} alt="Pickup"/>
          <div>
            <h2 className="text-xl font-bold text-blue-950 mb-1">Store Pickup</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              Place your order online & pick it up from your nearest store
            </p>
          </div>
        </div>
      </div>
    

      <div className="mt-5">
        <img alt='5'  className='w-full bunnerimg' src='https://api-rayashop.freetls.fastly.net/media/offers/1742381455639.jpg?format=webp'/>
      </div>
    </div>
  )
}
