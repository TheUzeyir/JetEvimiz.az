import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../layout/Header/Header";
import FilterBox from "../filterBox/FilterBox";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import style from "./filterProduct.module.css";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { Pagination } from 'antd';
import { useTranslation } from "react-i18next";


const FilterProduct = () => {
  const location = useLocation();
  const products = location.state?.products || [];
  const [likedProducts, setLikedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterBoxVisible, setIsFilterBoxVisible] = useState(true);
  const [categories, setCategories] = useState([]);
    const { t } = useTranslation();
  const pageSize = 8;

  useEffect(() => {
    const likedProductsFromStorage = localStorage.getItem("likedProducts");
    if (likedProductsFromStorage) {
      setLikedProducts(JSON.parse(likedProductsFromStorage));
    }
    fetch('https://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const toggleLiked = (productItem) => {
    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === productItem.productId
    );

    const updatedLikedProducts = isLiked
      ? likedProducts.filter(
          (likedProduct) => likedProduct.productId !== productItem.productId
        )
      : [...likedProducts, productItem];

    setLikedProducts(updatedLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
  };

  const paginatedItems = useMemo(() => {
    return products.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [products, currentPage, pageSize]);

  const totalPages = Math.ceil(products.length / pageSize);

  // Log only category title that matches slug's first part
  useEffect(() => {
    if (paginatedItems.length > 0 && categories.length > 0) {
      paginatedItems.forEach((item) => {
        const firstPartOfSlug = item.slug.split('-')[0];
        // Find category by slug first part
        const matchingCategory = categories.find(category => category.categorySlug && category.categorySlug.toLowerCase() === firstPartOfSlug.toLowerCase());

        if (matchingCategory) {
          console.log(`Category: ${matchingCategory.categoryTitle}`);
        } else {
          console.log("No matching category found");
        }
      });
    }
  }, [paginatedItems, categories]);

  return (
    <div className={style.FilterProduct}>
      <Header />
      <FilterBox
        isVisible={isFilterBoxVisible}
        setIsVisible={setIsFilterBoxVisible}
      />
      <div className="container">
        {products.length === 0 ? (
          <p>Heç bir məhsul tapılmadı.</p>
        ) : (
          <>
            <div className={style.productsGrid}>
              {paginatedItems.length > 0 ? (
                paginatedItems.map((item) => (
                  <div className={style.productCard} key={item.productId}>
                    <Link to={`/product-details/${item.slug}`}>
                      <div className={style.productCard_imgBox}>
                        <img
                          src={item.coverImage}
                          alt={item.productTitle}
                          className={style.productCard_imgBox_img}
                        />
                        {likedProducts.some(
                          (likedProduct) => likedProduct.productId === item.productId
                        ) ? (
                          <BsFillHeartFill
                            className={style.productCard_imgBox_heartIcon_check}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLiked(item);
                            }}
                          />
                        ) : (
                          <FaHeart
                            className={style.productCard_imgBox_heartIcon}
                            onClick={(e) => {
                              e.preventDefault();
                              toggleLiked(item);
                            }}
                          />
                        )} 
                      </div>
                    </Link>
                    <div className={style.productCard_info}>
                      <h3>{item.price} AZN</h3>
                      <p className={style.productCard_info_price}>{item.productTitle}</p>
                      <p className={style.productCard_info_category}>{item.categoryName}</p>
                      <p className={style.productCard_info_city}>{t("addProductPageCityText")}:{item.city}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>Heç bir məhsul tapılmadı.</p>
              )}
            </div>

            {products.length > 0 && (
              <div className={style.paginationContainer}>
                <Pagination
                  current={currentPage}
                  total={products.length}
                  pageSize={pageSize}
                  onChange={(page) => setCurrentPage(page)}
                  className={style.pagination}
                />
                <p>Page {currentPage} / {totalPages}</p>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default FilterProduct;
