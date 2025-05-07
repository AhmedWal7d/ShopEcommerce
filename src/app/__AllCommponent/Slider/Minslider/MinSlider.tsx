"use client";

import Slider from "react-slick";
import Image from "next/image";
import img2 from '../../AllimgApp/slider1.png'
import img3 from '../../AllimgApp/slider3.png'
import img4 from '../../AllimgApp/slider4.png'
import img5 from '../../AllimgApp/slider5.png'
import img6 from '../../AllimgApp/slider6.png'
import img7 from '../../AllimgApp/slider7.png'
import img8 from '../../AllimgApp/slider8.png'
import img9 from '../../AllimgApp/slider9.png'

import { translations as arTranslations } from  "../../../../../src/translations/ar"
import { translations as enTranslations  } from   "../../../../../src/translations/en"
import { useEffect, useState } from "react";


export default function MinSlider() {
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
    
function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "red" , color:"red" }}
        onClick={onClick}
      />
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "green" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 9,
    slidesToScroll: 1,
    arrows: true, responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ],
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  
  };

  return (
    <div className="container mx-auto mt-10">
    <Slider {...settings}>
      <div className="bg-red-200 rounded-2xl">
        <Image src={img2} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold text-sm  text-center   font-bold text-teal-600">  
        {translations[language].weddingOffers}
        </p>
      </div>
      <div>
        <Image src={img3} alt="Slide 1" className="w-full h-auto rounded-3xl border-none" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">Health & Beauty</p>
      </div>
      <div>
        <Image src={img4} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].kitchenAppliances}
        </p>
      </div>
      <div>
        <Image src={img5} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].smallAppliances}
        </p>
      </div>
      <div>
        <Image src={img6} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].largeAppliances}
        </p>
      </div>
      <div>
        <Image src={img4} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].beauty}
        </p>
      </div>
      <div>
        <Image src={img7} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].homeTools}
        </p>
      </div>
      <div>
        <Image src={img8} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].largeAppliances}
        </p>
      </div>
      <div>
        <Image src={img5} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].electronics}
        </p>
      </div>
      <div>
        <Image src={img9} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].largeAppliances}
        </p>
      </div>
      <div>
        <Image src={img6} alt="Slide 1" className="w-full h-auto rounded-3xl" />
        <p className="fw-bold  text-center text-sm  font-bold text-teal-600">  
        {translations[language].kitchenAppliances}
        </p>
      </div>
    </Slider>
  </div>
  );
}
