"use client";

import Slider from "react-slick";
import Image from "next/image";
import img1 from "../../../../public/slider1.webp";
import img2 from "../../../../public/slider2.webp";



export default function SliderHome() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  
  };

  return (
    <div className="container mx-auto mt-20">
      <Slider {...settings}>
        <div>
          <Image src={img1} alt="Slide 1" className="w-full h-auto rounded-3xl sliderhome" />
        </div>
        <div>
          <Image src={img2} alt="Slide 2" className="w-full h-auto rounded-3xl sliderhome" />
        </div>
      </Slider>
    </div>
  );
}
