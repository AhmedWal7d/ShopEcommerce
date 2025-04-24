'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getonegetAllOrders } from '../lib/getAllOrders/getAllOrders'

export default function Page() {
    const dispatch = useDispatch()
    const [orders, setOrders] = useState<any[]>([])



    useEffect(() => {
            async function fetchOrders() {
                const { payload }: any = await dispatch(getonegetAllOrders())
                setOrders(payload.data)
            }
            fetchOrders()
    }, [])

    return (
        <div className="p-6 mt-20">


<div className="mt-10 space-y-8">
                    <h2 className="text-2xl font-bold mb-4 text-teal-600">All Your Orders</h2>
                    {orders.map((order, index) => (
                        <div key={index} className="border border-teal-600 p-4 rounded shadow-md bg-white">
                            <div className="mb-4">
                                <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
                                <p><strong className='mx-2 text-teal-600 mt-3'>User:</strong> {order.user?.name} - {order.user?.email}</p>
                                <p><strong className='mx-2 text-teal-600 mt-3'>Address:</strong> {order.shippingAddress?.city}, {order.shippingAddress?.details}</p>
                                <p><strong className='mx-2 text-teal-600 mt-3'>Phone:</strong> {order.shippingAddress?.phone}</p>
                                <p><strong className='mx-2 text-teal-600 mt-3'>Payment Method:</strong> {order.paymentMethodType}</p>
                                <p><strong className='mx-2 text-teal-600 mt-3'>Total:</strong> ${order.totalOrderPrice}</p>
                                <p><strong className='mx-2 text-teal-600 mt-3'>Paid:</strong> <span className={order.isPaid ? "text-green-600" : "text-red-600"}>
                                    {order.isPaid ? "Yes" : "No"}
                                </span></p>
                                <p><strong>Delivered:</strong> <span className={order.isDelivered ? "text-green-600" : "text-red-600"}>
                                    {order.isDelivered ? "Yes" : "No"}
                                </span></p>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Products:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {order.cartItems.map((item: any, i: number) => (
                                        <div key={i} className="flex items-center gap-4 p-2 border border-teal-600 rounded">
                                            <img src={item.product.imageCover} alt={item.product.title} className="w-16 h-16 object-cover rounded" />
                                            <div>
                                                <p className="font-semibold">{item.product.title}</p>
                                                <p>Brand: {item.product.brand.name}</p>
                                                <p>Price: ${item.price} x {item.count}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}
