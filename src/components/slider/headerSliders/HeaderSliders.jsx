import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import style from "./headerSlider.module.css";
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

export default function HeaderSliders() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); 
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
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}&LanguageCode=az`
      );
      const result = await response.json();

      const category = categories.find((cat) =>
        cat.categoryId === categoryId || 
        (cat.childCategories || []).some((child) => child.categoryId === categoryId)
      );

      const selectedCategory = category?.childCategories?.find((child) => child.categoryId === categoryId) || category;

      navigate('/CategoryProduct', {
        state: {
          products: result.data,
          category: category,
          selectedSubCategory: selectedCategory,
        },
      });
    } catch (error) {
      console.error('Failed to fetch category data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Swiper
        slidesPerView={Math.min(categories.length, 5)}
        spaceBetween={80}
        loop={categories.length > 5}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          0: { slidesPerView: 2, spaceBetween: 60 },
          574: { slidesPerView: 3, spaceBetween: 60 },
          768: { slidesPerView: 4, spaceBetween: 60 },
          1080: { slidesPerView: 6, spaceBetween: 55 },
        }}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide
            className={style.headerSliderBox}
            key={category.categoryId}
            onClick={() => handleCategoryClick(category.categoryId)} 
          >
            <h4 className={style.headerSliderBoxText}>{category.categoryTitle}</h4>
            <img
              src={category.categoryImage}
              alt={category.categoryTitle}
              className={style.categoryImg}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
