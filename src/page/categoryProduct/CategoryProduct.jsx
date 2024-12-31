import React, { useState, useEffect } from "react";
import style from "./categoryProduct.module.scss";
import { useLocation, Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import { useTranslation } from "react-i18next";
import FilterBox from "../../components/filterBox/FilterBox";

const CategoryProduct = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const [likedProducts, setLikedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [filterParams, setFilterParams] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 8;

  const { products = { items: [] }, category } = location.state || {};
  const items = products.items;

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

  const filterProducts = () => {
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
  };

  const filteredItems = filterProducts();

  const paginatedItems = filteredItems.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  return (
    <div className={style.CategoryProduct_container}>
      <Navbar />
      <div className="container">
        <FilterBox categoryId={category?.categoryId} />
        <div className={style.CategoryProductPage}>
          <div className={style.CategoryProduct_simple}>
            {paginatedItems.length > 0 ? (
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
                      <h3>{item.productTitle}</h3>
                      <p className={style.productCard_info_price}>{item.price} AZN</p>
                      <p className={style.productCard_info_category}>{item.categoryName}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>{t("noProductsFound")}</p>
            )}
            <div className={style.paginationContainer}>
              <button
                disabled={pageIndex === 0}
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}>
                {t("prev")}
              </button>
              <span>
                {t("page")} {pageIndex + 1} {t("of")} {totalPages}
              </span>
              <button
                disabled={pageIndex === totalPages - 1}
                onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))}>
                {t("next")}
              </button>
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
