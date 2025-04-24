import React from 'react'
import img from '../../AllimgApp/imghheaderwebp.webp'
import Image from 'next/image'
export default function LastBanner() {
    return (
        <div className='container mx-auto mt-5'>
        <Image src={img} alt='Last Banner Img ' className='w-full himgbaner'/>
        </div>
    )
}
