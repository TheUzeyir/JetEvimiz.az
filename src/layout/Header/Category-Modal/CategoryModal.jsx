import React, { useState } from 'react';
import style from './categoryModal.module.css';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

const CategoryModal = ({ closeModal }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const getLanguageCode = () => {
    const language = i18n.language;
    if (language === 'az') return 'az';
    if (language === 'ru') return 'ru';
    if (language === 'en') return 'en';
    if (language === 'tr') return 'tr';
    return 'az';
  };

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories', i18n.language],
    queryFn: async () => {
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=${getLanguageCode()}`
      );
      const result = await response.json();
      if (!result.isSuccessful) throw new Error(result.message || 'Kategoriler yüklenemedi.');
      return result.data.filter((category) => category.parentId === null); 
    },
    staleTime: 60000,
    cacheTime: 300000,
  });

  const fetchProducts = async (categoryId) => {
    const response = await fetch(
      `https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}&LanguageCode=${getLanguageCode()}`
    );
    const result = await response.json();
    if (!result.isSuccessful) throw new Error(result.message || 'Ürünler yüklenemedi.');
    return result.data;
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      const products = await fetchProducts(categoryId);
      const category = categories.find((cat) =>
        cat.categoryId === categoryId || (cat.childCategories || []).some((child) => child.categoryId === categoryId)
      );
      const selectedSubCategory =
        category?.childCategories?.find((child) => child.categoryId === categoryId) || category;

      setSelectedCategory({ parentCategory: category, selectedSubCategory });

      navigate('/CategoryProduct', {
        state: {
          products,
          category,
          selectedSubCategory,
        },
      });
    } catch (error) {
      console.error('Seçilen kategoriye ait veriler alınamadı:', error);
    }
  };

  if (categoriesLoading) return <p>{t('loading')}</p>;

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
                <img className={style.caticon} src={category.categoryImage} alt={category.categoryTitle} />
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
