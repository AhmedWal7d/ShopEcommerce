import React, { useEffect, useState } from 'react';
import img from '../../AllimgApp/Screenshot 2025-04-17 192830.png';
import img2 from '../../AllimgApp/dateimg.png';
import img3 from '../../AllimgApp/imgshop.png';
import Image from 'next/image';
import { translations as arTranslations } from "../../../../../src/translations/ar";
import { translations as enTranslations } from "../../../../../src/translations/en";

export default function MidSection() {
  const [language, setLanguage] = useState("en"); // اللغة الافتراضية هي الإنجليزية

  const translations = {
    en: enTranslations,
    ar: arTranslations,
  };

  useEffect(() => {
    // محاولة تحميل اللغة من localStorage
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  const currentTranslations = translations[language];

  return (
    <div className="container mx-auto bg-blue-50 mt-10 rounded-2xl py-10 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* البوكس الأول */}
        <div className="flex sm:block items-start gap-4">
          <Image src={img} alt={currentTranslations.quickDelivery} />
          <div>
            <h2 className="text-xl font-bold text-blue-950 mb-1">{currentTranslations.quickDelivery}</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              {currentTranslations.quickDelivery === "التوصيل السريع" ? "التوصيل إلى المنزل خلال 24 ساعة من تقديم طلبك" : "Home delivery within 24hr of placing your order"}
            </p>
          </div>
        </div>

        {/* البوكس الثاني */}
        <div className="flex sm:block items-start gap-4">
          <Image src={img2} alt={currentTranslations.installmentPlans} />
          <div>
            <h2 className="text-xl font-bold text-blue-950 mb-1">{currentTranslations.installmentPlans}</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              {currentTranslations.installmentPlans === "خطط التقسيط" ? "ادفع مقابل طلباتك بالتقسيط حتى 36 شهرًا" : "Pay for your orders in installments for up to 36 months"}
            </p>
          </div>
        </div>

        {/* البوكس الثالث */}
        <div className="flex sm:block items-start gap-4">
          <Image src={img3} alt={currentTranslations.storePickup} />
          <div>
            <h2 className="text-xl font-bold text-blue-950 mb-1">{currentTranslations.storePickup}</h2>
            <p className="text-gray-500 font-medium text-sm leading-relaxed">
              {currentTranslations.storePickup === "استلام من المتجر" ? "قدّم طلبك عبر الإنترنت و استلمه من أقرب متجر إليك" : "Place your order online & pick it up from your nearest store"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <img alt='5' className='w-full bunnerimg' src='https://api-rayashop.freetls.fastly.net/media/offers/1742381455639.jpg?format=webp'/>
      </div>
    </div>
  );
}
