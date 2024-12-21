import React, { useRef, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function AutoPlayMethods() {
  let sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);  // Start loading
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
        setLoading(false);  // Stop loading
      }
    };

    fetchCategories();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className="slider-container">
      <Slider ref={slider => (sliderRef = slider)} {...settings}>
          {
            categories.map((category) => (
              <div key={category.categoryId}>
                <img
                  className={`category-img category-${category.categoryId}`}
                  src={category.categoryImage}
                  alt={category.categoryTitle}
                />
                <h4 className="categoryTitle">{category.categoryTitle}</h4>
              </div>
            ))
          }
      </Slider>
    </div>
  );
}
export default AutoPlayMethods;