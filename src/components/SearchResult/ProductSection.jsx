import React from "react";
import { Link } from "react-router-dom";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { IoCalendarNumber } from "react-icons/io5";

const ProductSection = ({ products, isProductsLoading, likedProducts, toggleLiked }) => {
  if (isProductsLoading) {
    return <p>Yüklənir...</p>;
  }

  if (products.length === 0) {
    return <p>Nəticə tapılmadı.</p>;
  }

  return (
    <div className={style.productCard_container}>
      {products.map((item) => (
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
              <span className={style.productCard_title_price}>{item.price} AZN</span>
              <div className={style.productCard_title_dayBox}>
                <IoCalendarNumber /> 1 Gün
              </div>
            </div>
            <p className={style.productCard_subTitle}>{item.productTitle}</p>
            <p className={style.productCard_text}>Şəhər: {item.city}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
