import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./headerSlider.css"
import { Navigation } from 'swiper/modules';
import { FaCar } from "react-icons/fa";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { GiClothes } from "react-icons/gi";
import { MdOutlineElectricalServices } from "react-icons/md";
import { FaBook } from "react-icons/fa6";

export default function HeaderSliders() {
  return (
    <div className="container">
        <Swiper
  slidesPerView={7}
  spaceBetween={80}
  loop={true}
  pagination={{
    clickable: true,
  }}
  navigation={true}
  modules={[Navigation]}
  breakpoints={{
      0: {
        slidesPerView: 2, 
        spaceBetween: 60,
      },
      574: {
        slidesPerView: 3, 
        spaceBetween: 60,
      },
      768: {
        slidesPerView: 4, 
        spaceBetween: 60,
      },
      1080: {
        slidesPerView: 6, 
        spaceBetween: 55,
      }
    }}
        
          className="mySwiper"
        >
          <SwiperSlide className='headerSliderBox'>
              <FaCar/>
              <h4 className='headerSliderBoxText'>Car</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <FaBook/>
              <h4 className='headerSliderBoxText'>Book</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <PiBuildingApartmentFill/>
              <h4 className='headerSliderBoxText'>Apartment</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <GiClothes/>
              <h4 className='headerSliderBoxText'>Clothes</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <MdOutlineElectricalServices/>
              <h4 className='headerSliderBoxText'>Electronitc</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <FaCar/>
              <h4 className='headerSliderBoxText'>Car</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <FaBook/>
              <h4 className='headerSliderBoxText'>Book</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <PiBuildingApartmentFill/>
              <h4 className='headerSliderBoxText'>Apartment</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <GiClothes/>
              <h4 className='headerSliderBoxText'>Clothes</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <MdOutlineElectricalServices/>
              <h4 className='headerSliderBoxText'>Electronitc</h4>
          </SwiperSlide>
        </Swiper>
    </div>
  );
}
