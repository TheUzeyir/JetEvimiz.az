import React, { useState, useEffect } from 'react';
import style from './categoryModal.module.css';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const CategoryModal = ({ closeModal }) => {
  const [categories, setCategories] = useState([]); // Kateqoriyalar
  const [selectedCategory, setSelectedCategory] = useState(null); // Seçilmiş kateqoriya
  const [loading, setLoading] = useState(false); // Yüklənmə vəziyyəti
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // i18n-dən istifadə edirik

  // Dil kodunu əldə edən funksiya
  const getLanguageCode = () => {
    const language = i18n.language; // Aktiv dili əldə edirik
    if (language === 'az') return 'az'; // Azərbaycan dili
    if (language === 'ru') return 'ru'; // Rus dili
    if (language === 'en') return 'en'; // İngilis dili
    if (language === 'tr') return 'tr'; // Türk dili
    return 'az'; // Varsayılan olaraq Azərbaycan dili
  };

  // Kateqoriyaları çəkmək üçün useEffect
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Yükləməyi aktiv et
      try {
        const languageCode = getLanguageCode(); // Dil kodunu alırıq
        const response = await fetch(
          `https://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=${languageCode}`
        );
        const result = await response.json();
        if (result.isSuccessful) {
          const filteredCategories = result.data.filter(
            (category) => category.parentId === null
          );
          setCategories(filteredCategories);
          setSelectedCategory(null); // Dil dəyişdikdə əvvəlki seçimi sıfırla
        }
      } catch (error) {
        console.error('Kateqoriyaları çəkməkdə səhv:', error);
      } finally {
        setLoading(false); // Yükləməyi dayandır
      }
    };

    // Dil dəyişdikdə yenidən kateqoriyaları çəkmək
    fetchCategories();

  }, [i18n.language]); // Dil dəyişdikdə yenidən dataları çəkir

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
    try {
      const languageCode = getLanguageCode(); // Dil kodunu alırıq
      console.log(languageCode);
      
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}&LanguageCode=${languageCode}`
      );
      const result = await response.json();
  
      const category = categories.find((cat) => 
        cat.categoryId === categoryId || 
        (cat.childCategories || []).some((child) => child.categoryId === categoryId)
      );
  
      const selectedCategory = category?.childCategories?.find((child) => child.categoryId === categoryId) || category;
  
      setSelectedCategory({
        parentCategory: category,
        selectedSubCategory: selectedCategory 
      });
  
      navigate('/CategoryProduct', {
        state: {
          products: result.data,
          category: category,
          selectedSubCategory: selectedCategory, 
        },
      });
    } catch (error) {
      console.error('Seçilen kategoriye ait veriler alınamadı:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.modalCategoryModal}>
      <div className={style.modalContent}>
        <button onClick={closeModal} className={style.modalContent_btn}>X</button>
        <div className={style.modalBody}>
          <div className={style.categories}>
            {categories.map((category) => (
              <div
                key={category.categoryId}
                onMouseEnter={() => setSelectedCategory(category)}
                onClick={() => handleCategoryClick(category.categoryId)}
                className={style.categoryItem}
              >
                <span className={style.categoryIcon}></span>
                <img className={style.caticon} src={category.categoryImage} alt="" />
                {category.categoryTitle}
              </div>
            ))}
          </div>
          <div className={style.products}>
            {selectedCategory ? (
              <ul className={style.products_ul}>
                {selectedCategory.childCategories && selectedCategory.childCategories.length > 0 ? (
                  selectedCategory.childCategories.map((child) => (
                    <li
                      className={style.products_li}
                      key={child.categoryId}
                      onClick={() => handleCategoryClick(child.categoryId)}
                    >
                      {child.categoryTitle} <IoIosArrowForward />
                    </li>
                  ))
                ) : (
                  <p>{t('modalResult')}</p>
                )}
              </ul>
            ) : (
              <p>{t('modalText')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
