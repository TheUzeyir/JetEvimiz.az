import React, { useState, useEffect } from "react";
import style from "./profileCard.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import { useTranslation } from "react-i18next";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";

const ProfilePageWaiting = ({ onProductCountUpdate }) => {
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/auth/get-user-products?LanguageCode=az&statusType=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      setProducts(data.data.items);
      onProductCountUpdate(data.data.items.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const toggleLiked = (productItem) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
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

  return (
    <div className={style.profileCardBox}>
      {products.length > 0 ? (
        <div className={style.productList}>
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
                <p className={style.productCard_subTitle}>
                  {product.productTitle}
                </p>
                <p className={style.productCard_text}>Şəhər: {product.city}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className={style.profileCardBox_title}>
        {t("profileCardWaitProduct")}
      </p>
      )}
      <button
        className={style.profileCardBox_btn}
        onClick={() => navigate("/yeniElan")}
      >
        <CiCirclePlus />
        {t("profileCardAddNew")}
      </button>
    </div>
  );
};

export default ProfilePageWaiting;