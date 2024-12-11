import React from "react";
import { useLocation } from "react-router-dom";
import style from "./searchResult.module.css";

const SearchResultCategory = () => {
  const location = useLocation();
  const { category, products } = location.state || {}; // Gelen veriler

  return (
    <div className={style.searchResultContainer}>
      <h2>Axtarış Nəticələri</h2>

      {/* Kategori Bilgisi */}
      {category && (
        <div>
          <h3>Seçilen Kategori</h3>
          <p><strong>Kategori Başlık:</strong> {category.categoryTitle}</p>
          {category.parentCategory && <p><strong>Üst Kategori:</strong> {category.parentCategory}</p>}
        </div>
      )}

      {/* Ürün Listesi */}
      {products && products.length > 0 ? (
        <div>
          <h3>Ürünlər</h3>
          {products.map((product, index) => (
            <div key={index} className={style.productCard}>
              <img src={product.coverImage} alt={product.productTitle} />
              <p><strong>{product.productTitle}</strong></p>
              <p>Fiyat: {product.price} AZN</p>
              <p>Şəhər: {product.city}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Bu kategori üçün məhsul tapılmadı.</p>
      )}
    </div>
  );
};

export default SearchResultCategory;
