import React, { useState } from "react";
import style from "./searchResult.module.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import { addLikedProduct } from "../../redux/likedSlice";
import FilterBox from "../filterBox/FilterBox";
import Header from "../../layout/Header/Header";
import { Pagination } from "antd";

const SearchResult = () => {
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const [isFilterVisible, setIsFilterVisible] = useState(window.innerWidth >= 768);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { category, products } = location.state || {};
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; 

  const paginatedProducts = products
    ? products.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : [];

  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); 
      const currentTime = Math.floor(Date.now() / 1000); 
      return payload.exp < currentTime; 
    } catch (error) {
      console.error("Token parsing error:", error);
      return true; 
    }
  };

  const toggleLiked = (productItem) => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken || isTokenExpired(authToken)) {
      navigate("/login"); 
      return;
    }

    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === productItem.productId
    );

    const updatedLikedProducts = isLiked
      ? likedProducts.filter(
          (likedProduct) => likedProduct.productId !== productItem.productId
        )
      : [...likedProducts, productItem];

    dispatch(addLikedProduct(productItem));
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
  };

  const setFilteredProducts = (filteredItems) => {
    setFilterParams(filteredItems);
    setShowFilteredResults(true); 
  };

  return (
    <div className={style.searchResultContainer}>
      <Header/>
      <div className="container">
      {isFilterVisible && (
          <FilterBox
            isVisible={isFilterVisible}
            setIsVisible={setIsFilterVisible}
            categoryId={category?.categoryId}
            setFilteredProducts={setFilteredProducts}
          />
        )}
        <div className={style.categorySectionPage}>
          <h2 className={style.categorySectionPage_title}>Axtarış Nəticələri</h2>
          {paginatedProducts && paginatedProducts.length > 0 ? (
            <div className={style.productCard_container}>
              {paginatedProducts.map((item) => (
                <div className={style.productCard} key={item.productId}>
                  <Link to={`/product-details/${item.slug}`}>
                    <div className={style.productCard_imgBox}>
                      <img
                        src={item.coverImage}
                        alt={item.productTitle}
                        className={style.productCard_imgBox_img}
                      />
                      {likedProducts.some(
                        (likedProduct) =>
                          likedProduct.productId === item.productId
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
                    </div>
                    <p className={style.productCard_subTitle}>
                      {item.productTitle}
                    </p>
                    <div className={style.productCard_bottom}>
                      <p className={style.productCard_text}>{item.city}</p>
                      <p className={style.productCard_bottom_text}>
                        {item.createDate.split("T")[0]}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>Bu kategori üçün məhsul tapılmadı.</p>
          )}
          <div className={style.pagination}>
            <Pagination
              current={currentPage}
              total={products ? products.length : 0}
              pageSize={pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false} 
            />
          </div>
        </div>
      </div>

      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default SearchResult;
