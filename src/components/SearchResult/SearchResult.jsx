import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import style from "./searchResult.module.css";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop";
import axios from "axios";

const SearchResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likedProducts.items);
  
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);
  const [filteredCategoryData, setFilteredCategoryData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10; // Adjust page size as needed

  useEffect(() => {
    if (location.state) {
      const { categoryData: passedCategoryData, filteredProducts, searchInput } = location.state;

      if (passedCategoryData) {
        setCategoryData(passedCategoryData);
      }

      if (filteredProducts) {
        setProducts(filteredProducts.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize));
      } else {
        setProducts([]);
      }

      if (searchInput && passedCategoryData) {
        const filteredCategories = passedCategoryData.childCategories.filter((category) =>
          category.categoryTitle.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredCategoryData(filteredCategories);
      }
    }
  }, [location.state, pageIndex]);

  const toggleLiked = (productItem) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
      alert("Bəyənmək üçün giriş etməlisiniz.");
      return;
    }
    dispatch(addLikedProduct(productItem));
  };

  const handlePreviousPage = () => {
    setPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    if (products.length === pageSize) {
      setPageIndex((prev) => prev + 1);
    }
  };

  return (
    <div className={style.searchResultContainer}>
      <HeaderTop />
      <Navbar />
      <div className="container">
        <div className={style.categorySectionPage}>
          <h2>Axtarış Nəticələri</h2>
          <div className={style.categorySection_container}>
            {categoryData && (
              <>
                <h3>{categoryData.categoryTitle}</h3>
                {filteredCategoryData.length > 0 && (
                  <div className={style.categorySection}>
                    {filteredCategoryData.map((child) => (
                      <div key={child.categoryId} className={style.categoryItem}>
                        <Link to={`/category-details/${child.slug}`}>
                          <div className={style.productCard}>
                            <div className={style.productCard_imgBox}>
                              <img
                                src={child.categoryImage}
                                alt={child.categoryTitle}
                                className={style.productCard_imgBox_img}
                              />
                            </div>
                            <div className={style.productCard_title}>
                              <span className={style.productCard_title_price}>
                                {child.count} AZN
                              </span>
                              <div className={style.productCard_title_dayBox}>
                                <IoCalendarNumber /> 1 Gün
                              </div>
                            </div>
                            <p className={style.productCard_subTitle}>{child.categoryTitle}</p>
                            <p className={style.productCard_text}>Şəhər: {child.city}</p>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
          <div className={style.productCard_container}>
            {products.length ? (
              products.map((item) => (
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
                      <div className={style.productCard_imgBox_title}>
                        <BsShop /> Mağaza
                      </div>
                    </div>
                    <div className={style.productCard_title}>
                      <span className={style.productCard_title_price}>
                        {item.price} AZN
                      </span>
                      <div className={style.productCard_title_dayBox}>
                        <IoCalendarNumber /> 1 Gün
                      </div>
                    </div>
                    <p className={style.productCard_subTitle}>{item.productTitle}</p>
                    <p className={style.productCard_text}>Şəhər: {item.city}</p>
                  </Link>
                </div>
              ))
            ) : (
              <p>Nəticə tapılmadı.</p>
            )}
          </div>
          <div className={style.pagination}>
            <button onClick={handlePreviousPage} disabled={pageIndex === 0} className={style.paginationBtn}>
              Əvvəlki
            </button>
            <span>Səhifə {pageIndex + 1}</span>
            <button onClick={handleNextPage} className={style.paginationBtn}>
              Növbəti
            </button>
          </div>
        </div>
      </div>
      <FooterResponsive />
      <Footer />
    </div>
  );
};

export default SearchResult;
