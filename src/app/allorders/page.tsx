'use client'

import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getonegetAllOrders } from '../lib/getAllOrders/getAllOrders'
import Image from 'next/image'
import { AppDispatch } from '../lib/store'

type Order = {
    id: string;
    user: {
        name: string;
        email: string;
    };
    shippingAddress: {
        city: string;
        details: string;
        phone: string;
    };
    paymentMethodType: string;
    totalOrderPrice: number;
    isPaid: boolean;
    isDelivered: boolean;
    cartItems: {
        product: {
            imageCover: string;
            title: string;
            brand: {
                name: string;
            };
        };
        price: number;
        count: number;
    }[];
};

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        async function fetchOrders() {
            const result = await dispatch(getonegetAllOrders());
            const payload = result.payload as { data: Order[] };
            setOrders(payload.data); // فقط مرة واحدة
        }

        fetchOrders();
    }, [dispatch]);


    return (
        <div className="p-6 mt-20">
            <div className="mt-10 space-y-8">
                <h2 className="text-2xl font-bold mb-4 text-teal-600">All Your Orders</h2>

                {orders.map((order) => (
                    <div key={order.id} className="border border-teal-600 p-4 rounded shadow-md bg-white">
                        <div className="mb-4">
                            <h3 className="text-xl font-semibold mb-2">Order #{order.id}</h3>
                            <p><strong className='mx-2 text-teal-600'>User:</strong> {order.user.name} - {order.user.email}</p>
                            <p><strong className='mx-2 text-teal-600'>Address:</strong> {order.shippingAddress.city}, {order.shippingAddress.details}</p>
                            <p><strong className='mx-2 text-teal-600'>Phone:</strong> {order.shippingAddress.phone}</p>
                            <p><strong className='mx-2 text-teal-600'>Payment Method:</strong> {order.paymentMethodType}</p>
                            <p><strong className='mx-2 text-teal-600'>Total:</strong> ${order.totalOrderPrice}</p>
                            <p>
                                <strong className='mx-2 text-teal-600'>Paid:</strong>
                                <span className={order.isPaid ? "text-green-600" : "text-red-600"}>
                                    {order.isPaid ? "Yes" : "No"}
                                </span>
                            </p>
                            <p>
                                <strong className='mx-2 text-teal-600'>Delivered:</strong>
                                <span className={order.isDelivered ? "text-green-600" : "text-red-600"}>
                                    {order.isDelivered ? "Yes" : "No"}
                                </span>
                            </p>
                        </div>

                        <div>
                            <h4 className="font-medium mb-2">Products:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {order.cartItems.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-2 border border-teal-600 rounded">
                                        <Image
                                            src={item.product.imageCover}
                                            alt={item.product.title}
                                            width={64}
                                            height={64}
                                            className="rounded object-cover"
                                        />
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
