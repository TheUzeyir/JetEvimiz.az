import React, { useState, useEffect } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import style from "./categoryBox.module.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const CategoryBox = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories');
        const result = await response.json();
        console.log(result);
        if (result.isSuccessful) {
          setCategories(result.data);
        } else {
          console.error("Kategori yüklenemedi:", result.message);
        }
      } catch (error) {
        console.error('Kategorileri çekerken hata:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}`
      );
      const result = await response.json();

      const category = categories.find((cat) =>
        cat.categoryId === categoryId || 
        (cat.childCategories || []).some((child) => child.categoryId === categoryId)
      );

      const selectedSubCategory = category?.childCategories?.find((child) => child.categoryId === categoryId);

      navigate('/CategoryProduct', {
        state: {
          products: result.data,
          category: category,
          selectedSubCategory: selectedSubCategory,
        },
      });
    } catch (error) {
      console.error('Seçilen kategoriye ait veriler alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (index) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <div className={style.categoryBox_container}>
      <div className={style.categoryBox_header}>
        <IoCloseCircle onClick={() => navigate(-1)} /> {t('categoryBoxHeadText')}
      </div>
      <div className={style.categoryBox_card}>
        {categories.map((category, index) => (
          <div key={index} className={style.categoryBox_card_boxs}>
            <div className={style.categoryBox_card_box} onClick={() => toggleCategory(index)}>
              <p className={style.categoryBox_card_box_title}>
                 {category.categoryTitle}
              </p>
              <MdOutlineKeyboardArrowDown 
                className={style.categoryBox_card_box_icon} 
              />
            </div>
            {activeCategory === index && category.childCategories?.map((child, childIndex) => (
              <div key={childIndex} className={style.categoryBox_card_box_card}>
                <p onClick={() => handleCategoryClick(child.categoryId)}>
                  {child.categoryTitle}
                </p>
              </div>
            ))}
          </div> 
        ))}
      </div>
    </div>
  );
};

export default CategoryBox;
