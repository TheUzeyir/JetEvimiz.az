import React from "react";
import { useLocation, Link } from "react-router-dom";
import style from "./searchResult.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import { addLikedProduct } from "../../redux/likedSlice";

const SearchResult = () => {
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const dispatch = useDispatch();
  const location = useLocation();
  const { category, products } = location.state || {}; 

  const toggleLiked = (productItem) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
      alert("Bəyənmək üçün giriş etməlisiniz.");
      return;
    }

    dispatch(addLikedProduct(productItem));
  };

  return (
    <div className={style.searchResultContainer}>
      <HeaderTop/>
      <Navbar/>
      <div className="container">
        <h2>Axtarış Nəticələri</h2>
        <h3>Ürünler</h3>
        {products && products.length > 0 ? (
          <div className={style.productCard_container}>
            {products.map((product) => (
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
                    <div className={style.productCard_imgBox_title}>
                      <BsShop /> Mağaza
                    </div>
                  </div>
                  <div className={style.productCard_title}>
                    <span className={style.productCard_title_price}>
                      {product.price} AZN
                    </span>
                    <div className={style.productCard_title_dayBox}>
                      <IoCalendarNumber /> 1 Gün
                    </div>
                  </div>
                  <p className={style.productCard_subTitle}>{product.productTitle}</p>
                  <p className={style.productCard_text}>Şəhər: {product.city}</p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p>Bu kategori üçün məhsul tapılmadı.</p>
        )}
      </div>

      <Footer/>
      <FooterResponsive/>
    </div>
  );
};

export default SearchResult;
