import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./detailPageSameProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { addLikedProduct } from "../../redux/likedSlice";

const DetailPageSameProduct = ({ sameProduct }) => {
  const calculateDays = (createDate) => {
    const createdDate = new Date(createDate);
    const currentDate = new Date();
    return Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24));
  };

  const likedProducts = useSelector((state) => state.likedProducts.items);
  const navigate = useNavigate();

  if (!sameProduct || sameProduct.length === 0) {
    return <p>No matching products found.</p>;
  }

  const toggleLiked = (product) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
      navigate("/login");
      return;
    }

    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === product.productId
    );

    const updatedLikedProducts = isLiked
      ? likedProducts.filter(
          (likedProduct) => likedProduct.productId !== product.productId
        )
      : [...likedProducts, product];

    dispatch(addLikedProduct(product));
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
  };

  const handleProductClick = (product) => {
    navigate(`/same-product-details`, { state: product }); 
  };  

  return (
    <div className="container">
      <div className={style.productCard_sameProduct_container}>
        <h2>Benzer Mehsullar</h2>
        <div className={style.productCard_sameProduct}>
          {sameProduct.map((product) => (
            <div
              className={style.productCard}
              key={product.productId}
              onClick={() => handleProductClick(product)} 
            >
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
                      e.stopPropagation(); 
                      toggleLiked(product);
                    }}
                  />
                ) : (
                  <FaHeart
                    className={style.productCard_imgBox_heartIcon}
                    onClick={(e) => {
                      e.stopPropagation(); 
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
                  <IoCalendarNumber /> {calculateDays(product.createDate)} Gün
                </div>
              </div>
              <p className={style.productCard_subTitle}>{product.productTitle}</p>
              <p className={style.productCard_text}>Şəhər: {product.city}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPageSameProduct;
