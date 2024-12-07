import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import style from "./likedPage.module.css";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addLikedProduct } from "../../redux/likedSlice";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import Header from "../../layout/Header/Header";

const LikedPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const likedProducts = useSelector(state => state.likedProducts.items); 
  const dispatch = useDispatch();

  const toggleLiked = (productItem) => {
    dispatch(addLikedProduct(productItem));
    let updatedLikedProducts;
    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === productItem.productId
    );
    if (isLiked) {
      updatedLikedProducts = likedProducts.filter(
        (likedProduct) => likedProduct.productId !== productItem.productId
      );
    } else {
      updatedLikedProducts = [...likedProducts, productItem];
    }
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
  };

  return (
    <div>
      <div className={style.likedPage}>
        <Header />
        <div className="container">
          <p
            className={style.productCard_goBack}
            onClick={() => navigate(-1)}
          >
            <MdOutlineKeyboardArrowLeft /> {t("goBack")}
          </p>
          <div className={style.productCard_container}>
            {likedProducts.length > 0 ? (
              likedProducts.map((item) => (
                <div className={style.productCard} key={item.productId}>
                  <div className={style.productCard_imgBox}>
                    <img
                      src={item.coverImage}
                      alt={item.productTitle}
                      className={style.productCard_imgBox_img}
                    />
                    <BsFillHeartFill
                      className={
                        likedProducts.some(
                          (likedProduct) => likedProduct.productId === item.productId
                        )
                          ? style.productCard_imgBox_heartIcon_active
                          : style.productCard_imgBox_heartIcon
                      }
                      onClick={() => toggleLiked(item)} // Handle like/unlike
                    />
                    <div className={style.productCard_imgBox_title}>
                      <BsShop /> {t("likedPageStoreText")}
                    </div>
                  </div>
                   <Link to={`/product-details/${item.productId}`}>
                    <div className={style.productCard_title}>
                      <span className={style.productCard_title_pirce}>
                        {item.price} AZN
                      </span>
                      <div className={style.productCard_title_dayBox}>
                        <IoCalendarNumber /> 1 Gün
                      </div>
                    </div>
                    <p className={style.productCard_subTitle}>{item.productTitle}</p>
                    <p className={style.productCard_text}>Baki</p>
                  </Link>
                </div>
              ))
            ) : (
              <p className={style.noLikedItems}>{t("likedPageNotProduct")}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default LikedPage;
