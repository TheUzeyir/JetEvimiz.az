import React, { useState, useEffect, useMemo } from "react";
import style from "./categoryProduct.module.scss";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import { useTranslation } from "react-i18next";
import FilterBox from "../../components/filterBox/FilterBox";
import { Pagination } from 'antd';
import { AiFillFilter } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";

const CategoryProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isFilterVisible, setIsFilterVisible] = useState(window.innerWidth >= 768);
  const [likedProducts, setLikedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterParams, setFilterParams] = useState({}); // This holds the filtered products
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const [showFilteredResults, setShowFilteredResults] = useState(false); // State to toggle filtered results visibility

  const { products = { items: [] }, category } = location.state || {};
  const items = products.items || [];

  useEffect(() => {
    const likedProductsFromStorage = localStorage.getItem("likedProducts");
    if (likedProductsFromStorage) {
      setLikedProducts(JSON.parse(likedProductsFromStorage));
    }
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

  const filterProducts = useMemo(() => {
    let filteredItems = items;

    if (minPrice) filteredItems = filteredItems.filter((item) => item.price >= minPrice);
    if (maxPrice) filteredItems = filteredItems.filter((item) => item.price <= maxPrice);
    if (filterTitle)
      filteredItems = filteredItems.filter((item) =>
        item.productTitle.toLowerCase().includes(filterTitle.toLowerCase())
      );

    Object.keys(filterParams).forEach((param) => {
      if (filterParams[param]) {
        filteredItems = filteredItems.filter((item) =>
          item[param]?.toString().includes(filterParams[param])
        );
      }
    });

    return filteredItems;
  }, [items, minPrice, maxPrice, filterTitle, filterParams]);

  const paginatedItems = useMemo(() => {
    return filterProducts.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  }, [filterProducts, currentPage, pageSize]);

  const totalPages = Math.ceil(filterProducts.length / pageSize);
  const selectedCategoryId = category?.categoryId;

  const toggleFilterBox = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsFilterVisible(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const setFilteredProducts = (filteredItems) => {
    setFilterParams(filteredItems);
    setShowFilteredResults(true); 
  };

  const handleFilterButtonClick = () => {
    setShowFilteredResults(true); 
  };

  return (
    <div className={style.CategoryProduct_container}>
      <Header />
      <div className="container">
        <p className={style.CategoryProduct_goBack} onClick={() => navigate(-1)}>
          <IoChevronBackOutline /> Go Back
        </p>
        <div className={style.CategoryProduct_filterBox} onClick={toggleFilterBox}>
          <button className={style.CategoryProduct_filterBox_btn} onClick={handleFilterButtonClick}>
            Filter et<AiFillFilter />
          </button>
        </div>
        {isFilterVisible && (
          <FilterBox
            isVisible={isFilterVisible}
            setIsVisible={setIsFilterVisible}
            categoryId={category?.categoryId}
            setFilteredProducts={setFilteredProducts} // Pass the function here
          />
        )}
        <div className={style.CategoryProductPage}>
          <div className={style.CategoryProduct_simple}>
            {!showFilteredResults && paginatedItems.length > 0 ? (
              <div className={style.productsGrid}>
                {paginatedItems.map((item) => (
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
                ))}
              </div>
            ) : (
            <div className={style.productsGrid_container}>
              {showFilteredResults && (
                <div className={style.productsGrid}>
                  {filterParams.length > 0 ? (
                    filterParams.map((product) => (
                       <div className={style.productCard} key={product.productId}>
                        <Link to={`/product-details/${product.slug}`}>
                          <div className={style.productCard_imgBox}>
                            <img
                              src={product.coverImage}
                              alt={product.productTitle}
                              className={style.productCard_imgBox_img}
                            />
                            {likedProducts.some(
                              (likedProduct) => likedProduct.productId === product.productId
                            ) ? (
                              <BsFillHeartFill
                                className={style.productCard_imgBox_heartIcon_check}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleLiked(product);
                                }}
                              />
                            ) : (
                              <FaHeart
                                className={style.productCard_imgBox_heartIcon}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleLiked(product);
                                }}
                              />
                            )}
                          </div>
                        </Link>
                        <div className={style.productCard_info}>
                          <h3>{product.price} AZN</h3>
                          <p className={style.productCard_info_price}>{product.productTitle}</p>
                          <p className={style.productCard_info_category}>{product.categoryName}</p>
                          <p className={style.productCard_info_city}>
                            {t("addProductPageCityText")}:{product.city}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>Heç bir məhsul tapılmadı</p>
                  )}
                </div>
              )}
            </div>
            )}
            <div className={style.paginationContainer}>
              <Pagination
                current={currentPage}
                total={filterProducts.length}
                pageSize={pageSize}
                onChange={(page) => setCurrentPage(page)}
                className={style.pagination}
              />
              <p>Page {currentPage} / {totalPages}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default CategoryProduct;
