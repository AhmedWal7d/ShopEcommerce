import Image from 'next/image';
import img from '../__AllCommponent/AllimgApp/excellence.webp';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto mt-10 relative">
        <Image
          src={img}
          alt="About us"
          className="w-full h-64 object-cover rounded-xl shadow-md"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white bg-teal-600/50 px-6 py-3 rounded-lg shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center mt-12">
        <p className="text-gray-700 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">
          We are a team of innovators, designers, and developers passionate about building digital products that make a difference. Our commitment lies in delivering high-quality, scalable, and impactful solutions tailored to your needs.
        </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-teal-600 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-teal-600 mb-3">Our Mission</h2>
            <p className="text-gray-600">
              To provide cutting-edge digital solutions that empower businesses and elevate user experiences across the globe.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-teal-600 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-teal-600 mb-3">Our Vision</h2>
            <p className="text-gray-600">
              To become a global leader in digital innovation, driven by creativity, integrity, and impact.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-teal-600 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-teal-600 mb-3">Our Values</h2>
            <p className="text-gray-600">
              We believe in collaboration, transparency, excellence, and always putting the user first.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
