import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteFavoriteProduct } from '../lib/favoriteproduct/favorite';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdDelete } from 'react-icons/md';
import { AppDispatch } from '../lib/store'; // Import your AppDispatch type
import { ThunkAction } from 'redux-thunk';
import { UnknownAction } from 'redux';

// Define your expected payload structure
interface FavoriteProductPayload {
  data?: unknown; // Replace with your actual data type
}

interface Props {
  productId: string;
  onProductData?: (data: FavoriteProductPayload['data']) => void;
}

export default function DeleteFavorite({ productId, onProductData }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      // Properly type the thunk action
      const action = deleteFavoriteProduct(productId) as ThunkAction<
        Promise<{ payload: FavoriteProductPayload }>,
        unknown,
        undefined,
        UnknownAction
      >;
      
      const response = await dispatch(action);
      
      if (response.payload?.data) {
        onProductData?.(response.payload.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error in Deleting:", error.message);
      } else {
        console.error("Unknown error in Deleting");
      }
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
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
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