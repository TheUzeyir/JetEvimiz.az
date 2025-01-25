import React, { useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import style from "./categoryBox.module.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { useQuery, useMutation } from "@tanstack/react-query";

const CategoryBox = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: categories = [], isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch(
        "https://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories"
      );
      const result = await response.json();
      if (!result.isSuccessful) {
        throw new Error(result.message || "Kategoriler yüklenemedi.");
      }
      return result.data;
    },
  });

  const fetchProductsByCategory = async (categoryId) => {
    const response = await fetch(
      `https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}`
    );
    const result = await response.json();
    if (!result.isSuccessful) {
      throw new Error(result.message || "Məhsullar alınamadı.");
    }
    return result.data;
  };

  const { mutate: fetchProducts, isLoading: isProductsLoading } = useMutation({
    mutationFn: fetchProductsByCategory,
    onSuccess: (data, categoryId) => {
      const category = categories.find(
        (cat) =>
          cat.categoryId === categoryId ||
          (cat.childCategories || []).some((child) => child.categoryId === categoryId)
      );

      const selectedSubCategory = category?.childCategories?.find(
        (child) => child.categoryId === categoryId
      );

      navigate("/CategoryProduct", {
        state: {
          products: data,
          category: category,
          selectedSubCategory: selectedSubCategory,
        },
      });
    },
    onError: (error) => {
      console.error("Seçilen kategoriye aid məhsullar alınamadı:", error.message);
    },
  });

  const toggleCategory = (index) => {
    setActiveCategory((prevActiveCategory) =>
      prevActiveCategory === index ? null : index
    );
  };

  const handleCategoryClick = (categoryId) => {
    fetchProducts(categoryId);
  };

  return (
    <div className={style.categoryBox_container}>
      <div className={style.categoryBox_header}>
        <IoCloseCircle onClick={() => navigate(-1)} /> {t("categoryBoxHeadText")}
      </div>
      <div className={style.categoryBox_card}>
        {categories.map((category, index) => (
          <div key={index} className={style.categoryBox_card_boxs}>
            <div
              className={style.categoryBox_card_box}
              onClick={() => toggleCategory(index)}
            >
              <p className={style.categoryBox_card_box_title}>
                {category.categoryTitle}
              </p>
              <MdOutlineKeyboardArrowDown
                className={style.categoryBox_card_box_icon}
              />
            </div>
            {activeCategory === index &&
              category.childCategories?.map((child, childIndex) => (
                <div
                  key={childIndex}
                  className={style.categoryBox_card_box_card}
                >
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
