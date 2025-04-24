'use client'

import React from 'react'
import img from '../../AllimgApp/image.png'
import Image from 'next/image'
import Link from 'next/link'
export default function Banner() {
  return (
    <section className="w-full py-10  mt-5 container-fluid bg-blue-50 mx-auto">
      <div className="flex mx-10 flex-col sm:flex-row items-center  rounded-xl p-6 sm:p-10 gap-6">
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <Image src={img} alt="icon" className="w-20 h-20" />
        </div>
        <div className="text-center sm:text-left mx-10">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">Raya Plus Points</h2>
          <p className="text-teal-600 font-bold w-100 text-sm leading-relaxed mb-3 px-4">
            Discover Raya Plus, start shopping to use Raya Plus Points. Earn and redeem points for vouchers to use during your next purchase at Raya.
          </p>
          <Link href="/" className="text-teal-600 font-medium hover:underline flex items-center justify-center sm:justify-start gap-1">
            Explore Example Plus Points
            <span className="text-xl">→</span>
          </Link>
        </div>

      </div>
    </section>
  )
}
