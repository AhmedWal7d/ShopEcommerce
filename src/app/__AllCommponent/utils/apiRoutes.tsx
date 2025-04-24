// utils/apiRoutes.js
'use client'

const BASE_URL =  'https://ecommerce.routemisr.com';

const apiRoutes = {

  products: {
    list: `${BASE_URL}/api/v1/products`,
  },
  login: {
    list: `${BASE_URL}/api/v1/auth/signin`,
  },
  register: {
    list: `${BASE_URL}/api/v1/auth/signup`,
  },
  forgetpassword: {
    list: `${BASE_URL}/api/v1/auth/forgotPasswords`,
  },
  verifyResetCode: {
    list: `${BASE_URL}/api/v1/auth/verifyResetCode`,
  },
  resetPassword: {
    list: `${BASE_URL}/api/v1/auth/resetPassword`,
  },
  addtocart: {
    list: `${BASE_URL}/api/v1/cart`,
  },
  parment: {
    list: `${BASE_URL}/api/v1/orders/checkout-session`,
  },
  getAllOrderss: {
    list: `${BASE_URL}/api/v1/orders`,
  },
  favoriteproduct: {
    list: `${BASE_URL}/api/v1/wishlist`,
  },
};

export default apiRoutes;
