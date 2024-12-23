import React, { useRef,useEffect,useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import style from './autoPlaySlider.module.css';
import { useNavigate } from 'react-router-dom';

function AutoPlayMethods() {
  let sliderRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); 
    const navigate = useNavigate();


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500
  };

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
    <div className="slider-container">
      <Slider ref={slider => (sliderRef = slider)} {...settings}>
        {
          categories.map((category) => (
            <div  key={category.categoryId} className={style.sliderBox} onClick={() => handleCategoryClick(category.categoryId)}>
              <img src={category.categoryImage} alt={category.categoryName}className={style.slider_img} />
              <h3 className={style.slider_title}>{category.categoryTitle}</h3>
            </div>
          ))
        }
      </Slider>
    </div>
  );
}
export default AutoPlayMethods;
