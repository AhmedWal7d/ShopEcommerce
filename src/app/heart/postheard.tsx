'use client'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getonefavoriteproduct } from '../lib/favoriteproduct/favorite'
import { CiHeart } from 'react-icons/ci'
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface Props {
  productId: string
  onProductData?: (data: any) => void
}

export default function PostHeart({ productId, onProductData }: Props) {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    try {
      setLoading(true)
      const { payload }: any = await dispatch<any>(getonefavoriteproduct(productId))
      onProductData?.(payload?.data)
    } catch (error) {
      console.error("Error in PostHeart:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      type='button'
      className='text-teal-600 rounded flex justify-center items-center cursor-pointer'
    >
      {loading ? (
        <AiOutlineLoading3Quarters size={24} className="animate-spin text-red-500" />
      ) : (
        <CiHeart size={30} />
      )}
    </button>
  )
}
