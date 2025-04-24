import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFavoriteProduct } from '../lib/favoriteproduct/favorite';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from 'react-icons/md';

interface Props {
  productId: string;
  onProductData?: (data: any) => void;
}

export default function DeleteFavorite({ productId, onProductData }: Props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const { payload }: any = await dispatch<any>(deleteFavoriteProduct(productId));
      onProductData?.(payload?.data);
   
      
    } catch (error) {
      console.error("Error in Deleting........:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClick}
      className='text-red-600 rounded flex justify-center items-center cursor-pointer'
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()} // For keyboard support
    >
      {loading ? (
        <div className='flex justify-center p-5'>
          <AiOutlineLoading3Quarters size={24} className="animate-spin text-red-500" />
        </div>
      ) : (
        <MdDelete size={20} />
      )}
    </div>
  );
}
