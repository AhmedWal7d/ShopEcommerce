"use client"
import Banner from "./__AllCommponent/AllPagehome/BannerHome/Banner";
import CartsSlider from "./__AllCommponent/AllPagehome/CartsSlider/CartsSlider";
import LastBanner from "./__AllCommponent/AllPagehome/LastBanner/LastBanner";
import MidSection from "./__AllCommponent/AllPagehome/MidSection/MidSection";
import ScrollToTopButton from "./__AllCommponent/AllPagehome/scrollToTop/scrollToTop";
import MinSlider from "./__AllCommponent/Slider/Minslider/MinSlider";
import SliderHome from "./__AllCommponent/Slider/Slider";

export default function Home() {
  return <>

    <SliderHome />
    <MinSlider/>
    <Banner/>
    <CartsSlider/>
    <MidSection/>
    <CartsSlider/>
    <LastBanner/>
    <ScrollToTopButton/>
    {/* <h1>Welcome</h1> */}
    
  </>
}
