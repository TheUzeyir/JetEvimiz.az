import React from "react";
import { IoIosCall } from "react-icons/io";
import style from "./detailPage.module.css";

const ProductDetailBottom = ({ product, handleClick }) => {
  return (
    <div className={style.detailPage_main_bottom}>
      <div className={style.detailPage_main_bottom_head}>
        {product.parameters && product.parameters.length > 0 && (
          <div className={style.detailPage_main_bottom_headBox}>
            <span className={style.detailPage_main_bottom_head_title}>
              {product.productTitle || "Bilgi yoxdur"}
            </span>
            {product.parameters[0] && (
              <span className={style.detailPage_main_bottom_head_title}>
                {product.parameters[0].parameterValue}-AZN
              </span>
            )}
            {product.parameters[1] && (
              <span className={style.detailPage_main_bottom_head_title}>
                {product.parameters[1].parameterValue}
              </span>
            )}
          </div>
        )}
      </div>
      <div className={style.detailPage_main_bottom_left}>
        {product.parameters && product.parameters.length > 0 && (
          <div className={style.detailPage_main_bottom_left_tite_box}>
            <p className={style.detailPage_main_bottom_left_tite}>
              {product.parameters[1] && (
                <span className={style.detailPage_main_bottom_head_title}>
                  {product.parameters[1].parameterTitle}
                </span>
              )}
            </p>
            {product.parameters[1] && (
              <span className={style.detailPage_main_bottom_head_title}>
                {product.parameters[1].parameterValue}
              </span>
            )}
          </div>
        )}
        <div className={style.detailPage_main_bottom_left_tite_box}>
          <p className={style.detailPage_main_bottom_left_tite}>Məhsul Kateqoriyası</p>
          <span className={style.detailPage_main_bottom_left_tite_category}>
            {product.categoryTitle || "Bilgi yoxdur"}
          </span>
        </div>
        <div className={style.detailPage_main_bottom_left_tite_box}>
          <p className={style.detailPage_main_bottom_left_tite}>Məhsul Adı</p>
          <span className={style.detailPage_main_bottom_left_tite_productName}>
            {product.productTitle || "Bilgi yoxdur"}
          </span>
        </div>
        <div className={style.detailPage_main_bottom_left_tite_box}>
          <p className={style.detailPage_main_bottom_left_tite}>Məhsul Qiyməti</p>
          {product.price
            ? `${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} AZN`
            : "Fiyat mevcut değil"}
        </div>
        <div className={style.detailPage_main_bottom_left_tite_box}>
          <p className={style.detailPage_main_bottom_left_tite}>Məhsul Həcmi</p>
          {product.productWeight || "Bilgi yoxdur"}
        </div>
        <div className={style.detailPage_main_bottom_left_tite_box}>
          <p className={style.detailPage_main_bottom_left_tite}>Məhsul Baxış Sayısı</p>
          {product.viewCount || "Bilgi yoxdur"}
        </div>
        <div className={style.detailPage_main_bottom_left_tite_box}>
          <span className={style.detailPage_main_bottom_left_tite}>Elan Tarixi</span>
          <div className={style.detailPage_main_bottom_left_tite_createTime}>
            {product.createDate ? product.createDate.split("T")[0] : "Bilgi yoxdur"}
          </div>
        </div>
      </div>
      <div className={style.detailPage_main_bottom_right}>
        <p>{product.productDescription || "Bilgi yoxdur"}</p>
      </div>
      <button className={style.callBtn} onClick={handleClick}>
        <IoIosCall className={style.callBtn_icon} />Zəng Et
      </button>
    </div>
  );
};

export default ProductDetailBottom;
