'use client';

import { useEffect, useState } from 'react';

export default function LanguageSwitcher() {
  const [language, setLanguage] = useState('en'); // اللغة الافتراضية
  const [direction, setDirection] = useState('ltr'); // الاتجاه الافتراضي

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      setDirection(storedLanguage === 'ar' ? 'rtl' : 'ltr');
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setDirection(lang === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('language', lang);


    // تحديث المسار باستخدام window.location (إذا لم تستخدم next/router)
    const currentPath = window.location.pathname.split('/');
    currentPath[1] = lang;
    const newPath = currentPath.join('/');
    window.location.href = newPath;
  };

  useEffect(() => {
    document.documentElement.dir = direction;
  }, [direction]);

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md p-1 focus:outline-none"
    >
      <option value="en">English</option>
      <option value="ar">العربية</option>
    </select>
  );
}
