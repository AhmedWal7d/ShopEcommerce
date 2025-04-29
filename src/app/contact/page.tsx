// pages/contact.tsx

import Image from "next/image";
import imgcontact from '../__AllCommponent/AllimgApp/imgcontact.jpg'

export default function Contact() {


    return (
        <div className="min-h-screen bg-gray-100 py-10 mt-10 px-5 md:px-20">
            {/* Header */}
            <div className="text-start mb-10 mt-5">
                <h1 className="text-4xl font-bold text-teal-600">CONTACT <span className="text-teal-900">US</span></h1>

            </div>

            {/* Contact Form */}
            <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-3">
                <form className=" bg-white shadow-md p-6 rounded-lg space-y-6 mt-5">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4">Send Us A Message</h2>

                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Full Name *</label>
                        <input
                            type="text"
                            name="fullName"

                            placeholder="Your Full Name"
                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Email *</label>
                        <input
                            type="email"
                            name="email"

                            placeholder="you@example.com"
                            required
                            className="w-full border border-gray-300 bg-blue-50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Subject */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Subject *</label>
                        <select
                            name="subject"

                            required
                            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Another Inquiry">Another Inquiry</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Order Issue">Order Issue</option>
                        </select>
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700">Message *</label>
                        <textarea
                            name="message"

                            required
                            rows={4}
                            placeholder="Add your message here..."
                            className="w-full border border-red-500 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-900 cursor-pointer transition"
                    >
                        Send
                    </button>
                </form>
                <div className=" mx-auto">

                    <Image width={600} height={100} alt="" className="lg:h-[600px] sm:h-[0]  mt-5" src={imgcontact} />
                </div>


            </div>

        </div>
    );
}
