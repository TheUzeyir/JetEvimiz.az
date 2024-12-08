import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "./headerSlider.css"
import { Navigation } from 'swiper/modules';
import { FaCar } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { MdOutlineElectricalServices } from "react-icons/md";
import { FaBook } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { FaBusinessTime } from "react-icons/fa";
import { IoPhonePortrait } from "react-icons/io5";

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
              <h4 className='headerSliderBoxText'>Nəqliyyat</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <FaBook/>
              <h4 className='headerSliderBoxText'>Hobbi və asudə</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <FcDepartment/>
              <h4 className='headerSliderBoxText'>Daşınmaz əmlak</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <GiClothes/>
              <h4 className='headerSliderBoxText'>Şəxsi əşyalar</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <MdOutlineElectricalServices/>
              <h4 className='headerSliderBoxText'>Elektronika</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <FaBusinessTime/>
              <h4 className='headerSliderBoxText'>Xidmətlər və biznes</h4>
          </SwiperSlide>
          <SwiperSlide className='headerSliderBox'>
              <IoPhonePortrait/>
              <h4 className='headerSliderBoxText'>Telefonlar</h4>
          </SwiperSlide>
        </Swiper>
    </div>
  );
}
