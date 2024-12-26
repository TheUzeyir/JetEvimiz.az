import React from "react";
import { Link } from "react-router-dom";

const CategorySection = ({ categoryData, isCategoryLoading }) => {
  if (isCategoryLoading) {
    return <p>Kateqoriya yüklənir...</p>;
  }

  if (!categoryData) {
    return null;
  }

  return (
    <div>
      <h3>{categoryData.categoryTitle}</h3>
      {categoryData.childCategories?.length > 0 && (
        <div className={style.categorySection}>
          {categoryData.childCategories.map((child) => (
            <div className={style.categoryItem} key={child.categoryId}>
              <Link to={`/category-details/${child.slug}`}>
                <div className={style.productCard}>
                  <div className={style.productCard_imgBox}>
                    <img
                      src={child.categoryImage}
                      alt={child.categoryTitle}
                      className={style.productCard_imgBox_img}
                    />
                  </div>
                  <p className={style.productCard_subTitle}>{child.categoryTitle}</p>
                  <p className={style.productCard_text}>Şəhər: {child.city}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
