"use client";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
import { Navigation, Pagination } from "swiper/modules";
import Image from 'next/image';

export default function Carousel({img1, alt1, img2, alt2, img3, alt3}) {
  return (
    <div>
      <Swiper
        modules={[Navigation]}   
        spaceBetween={50}        
        slidesPerView={1}        
        autoplay={{
          delay: 3000,           
          disableOnInteraction: false,  
        }}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next", // Assign class for next button
          prevEl: ".swiper-button-prev", // Assign class for previous button
        }}
      >
        <SwiperSlide className="flex justify-center">
          <Image src={img1} alt={alt1} width={1000} height={300} className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-cover rounded-lg shadow-lg"/>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <Image src={img2} alt={alt2} width={1000} height={300} className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-cover rounded-lg shadow-lg"/>
        </SwiperSlide>
        <SwiperSlide className="flex justify-center">
          <Image src={img3} alt={alt3} width={1000} height={300} className="w-full h-auto max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl object-cover rounded-lg shadow-lg"/>
        </SwiperSlide>
      </Swiper>

      <div className="swiper-button-prev absolute top-[57%] md:top-[63%] lg:top-[69%] left-4 transform -translate-y-1/2 text-black bg-white/30 p-2 rounded-full opacity-50 hover:opacity-100 transition duration-300"></div>
      <div className="swiper-button-next absolute top-[57%] md:top-[63%] lg:top-[69%] right-4 transform -translate-y-1/2 text-black bg-white/30 p-2 rounded-full opacity-50 hover:opacity-100 transition duration-300"></div>
    </div>
  );
}
