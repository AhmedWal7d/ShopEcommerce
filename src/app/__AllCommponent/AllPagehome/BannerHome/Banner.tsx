'use client';

import React, { useEffect, useState } from 'react';
import img from '../../AllimgApp/image.png';
import Image from 'next/image';
import Link from 'next/link';

import { translations as arTranslations } from "../../../../../src/translations/ar";
import { translations as enTranslations } from "../../../../../src/translations/en";

export default function Banner() {
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
    <section className="w-full py-10 mt-5 container-fluid bg-blue-50 mx-auto">
      <div className="flex mx-10 flex-col sm:flex-row items-center rounded-xl p-6 sm:p-10 gap-6">
        <div className="w-full sm:w-auto flex justify-center sm:justify-start">
          <Image src={img} alt="icon" className="w-20 h-20" />
        </div>
        <div className="text-start sm:text- mx-10">
          <h2 className="text-2xl font-bold text-teal-600 mb-2">{currentTranslations.rayaPlusPoints}</h2>
          <p className="text-teal-600 font-bold w-100 text-sm text-start leading-relaxed mb-3 px-">
            {currentTranslations.discoverRayaPlus}
          </p>
          <Link href="/" className="text-teal-600 font-medium hover:underline flex items-center justify-center sm:justify-start gap-1">
            {currentTranslations.exploreExamplePlusPoints}
            <span className="text-xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
