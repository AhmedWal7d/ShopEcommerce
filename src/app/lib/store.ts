// store.ts
'use client'
import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './Test/counter'
import { productReducer } from './products/Products'
import { loginReducer } from './login/login'
import { registerReducer } from './register/register'
import { forgotPasswordsReducer } from './forgotPasswords/forgotPasswords'
import { resetPasswordReducer } from './ResetPassword/ResetPassword'
import { verifyResetCodesReducer } from './verifyResetCode/verifyResetCode'
import { addToCartReducer } from './cart/cart'
import { cartReducer } from './cart/getAllCart'
import { DeletecartReducer } from './cart/DeleteCart'
import { getAllOrdersReducer } from './getAllOrders/getAllOrders'
import { favoriteproductReducer } from './favoriteproduct/favorite'
import { loadingReducer } from './Loading/loading.ts'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    product:productReducer,
    login:loginReducer,
    rigster:registerReducer,
    forgotPasswords:forgotPasswordsReducer,
    resetPassword:resetPasswordReducer,
    verifyResetCodes:verifyResetCodesReducer,
    cart:addToCartReducer,
    getcart:cartReducer,
    getallorder:getAllOrdersReducer,
    favoriteproducts: favoriteproductReducer,
    loading: loadingReducer,
    // deletecart:DeletecartReducer
  },
})

// Type helpers
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
