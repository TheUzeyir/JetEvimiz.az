import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import style from "./searchResult.module.css";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";

const SearchResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (location.state && location.state.filteredProducts) {
      setProducts(location.state.filteredProducts);
    } else {
      setProducts([]);
    }
  }, [location.state]);

  const toggleLiked = (productItem) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
      alert("Bəyənmək üçün giriş etməlisiniz.");
      return;
    }

    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === productItem.productId
    );

    dispatch(addLikedProduct(productItem));
  };

  return (
    <div className="container">
      <h2>Axtarış Nəticələri</h2>
      <div className={style.searchResult_container}>
        {products.length ? (
          products.map((item) => (
            <div className={style.searchResult_card} key={item.productId}>
              <Link to={`/product-details/${item.slug}`}>
                <div className={style.searchResult_imgBox}>
                  <img
                    src={item.coverImage}
                    alt={item.productTitle}
                    className={style.searchResult_img}
                  />
                  {likedProducts.some(
                    (likedProduct) => likedProduct.productId === item.productId
                  ) ? (
                    <BsFillHeartFill
                      className={style.searchResult_heartIcon_check}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLiked(item);
                      }}
                    />
                  ) : (
                    <FaHeart
                      className={style.searchResult_heartIcon}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLiked(item);
                      }}
                    />
                  )}
                  <div className={style.searchResult_imgBox_title}>
                    <BsShop /> Mağaza
                  </div>
                </div>
                <div className={style.searchResult_title}>
                  <span className={style.searchResult_price}>
                    {item.price} AZN
                  </span>
                  <div className={style.searchResult_dayBox}>
                    <IoCalendarNumber /> 1 Gün
                  </div>
                </div>
                <p className={style.searchResult_subTitle}>
                  {item.productTitle}
                </p>
                <p className={style.searchResult_text}>Şəhər: {item.city}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>Nəticə tapılmadı.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResult;
