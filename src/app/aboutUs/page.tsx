'use client'
import Image from 'next/image';
import img from '../__AllCommponent/AllimgApp/excellence.webp';
import { useEffect, useState } from 'react';

import { translations as arTranslations } from  "../../translations/ar"
import { translations as enTranslations  } from   "../../translations/en"

export default function AboutPage() {

      const [language, setLanguage] = useState("en"); // اللغة الافتراضية هي الإنجليزية
    
    useEffect(() => {
      // محاولة تحميل اللغة من localStorage
      const storedLanguage = localStorage.getItem("language");
      if (storedLanguage) {
        setLanguage(storedLanguage);
      }
    }, []);
    const translations = {
      en: enTranslations,
      ar: arTranslations,
    };
      
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
          {translations[language].aboutus}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto text-center mt-12">
        <p className="text-gray-700 text-lg leading-relaxed mb-12 max-w-3xl mx-auto">


        {translations[language].teamText}      
      
       </p>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-teal-600 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-teal-600 mb-3">Our Mission</h2>
            <p className="text-gray-600">

            {translations[language].text2} 
            
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-teal-600 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-teal-600 mb-3">Our Vision</h2>
            <p className="text-gray-600">


            {translations[language].text3} 


            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-t-4 border-teal-600 hover:shadow-xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-teal-600 mb-3">Our Values</h2>
            <p className="text-gray-600">
              
            {translations[language].text4} 

            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
