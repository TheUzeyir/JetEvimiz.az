import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import style from "./headerSlider.module.css";
import { Navigation } from 'swiper/modules';

export default function HeaderSliders() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az');
        const result = await response.json();

        if (Array.isArray(result.data)) {
          const parentCategories = result.data.filter(category => category.parentId === null);
          setCategories(parentCategories);
        } else {
          console.error('Expected an array in the "data" property, but got:', typeof result.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container">
  <Swiper
  slidesPerView={Math.min(categories.length, 5)} // Slayt sayısını sınırlayın
  spaceBetween={80}
  loop={categories.length > 5} // Loop için yeterli slayt olması lazım
  pagination={{
    clickable: true,
  }}
  navigation={true}
  modules={[Navigation]}
  breakpoints={{
    0: { slidesPerView: 2, spaceBetween: 60 },
    574: { slidesPerView: 3, spaceBetween: 60 },
    768: { slidesPerView: 4, spaceBetween: 60 },
    1080: { slidesPerView: 6, spaceBetween: 55 }
  }}
  className="mySwiper"
>
  {categories.map((category) => (
    <SwiperSlide className={style.headerSliderBox} key={category.categoryId}>
      <h4 className={style.headerSliderBoxText}>{category.categoryTitle}</h4>
      <img src={category.categoryImage} alt={category.categoryTitle} className={style.categoryImg}/>
    </SwiperSlide>
  ))}
</Swiper>
    </div>
  );
}
