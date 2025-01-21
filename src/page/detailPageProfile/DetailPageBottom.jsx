import React from "react";
import { IoIosCall } from "react-icons/io";
import style from "../detailPage/detailPage.module.css";

const DetailPageBottom = ({ product, handleClick }) => {
  return (
    <div className={style.detailPage_main_bottom}>
      <div className={style.detailPage_main_bottom_head}>
        {product.parameters && product.parameters.length > 0 && (
          <div className={style.detailPage_main_bottom_headBox}>
            <span className={style.detailPage_main_bottom_head_title}>
              {product.productTitle || "Bilgi yoxdur"}
            </span>,
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
                <span className={style.detailPage_main_bottom_head_titleBox}>
                  {product.parameters[1].parameterTitle}
                </span>
              )}
            </p>
            {product.parameters[1] && (
              <span className={style.detailPage_main_bottom_head_titles}>
                {product.parameters[1].parameterValue}
              </span>
            )}
          </div>
        )}
        <DetailItem label="Məhsul Kateqoriyası" value={product.categoryTitle || "Bilgi yoxdur"} />
        <DetailItem label="Məhsul Adı" value={product.productTitle || "Bilgi yoxdur"} />
        <DetailItem
          label="Məhsul Qiyməti"
          value={
            product.price
              ? `${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} AZN`
              : "Fiyat mevcut değil" 
          }
        />
        <DetailItem label="Məhsul Həcmi" value={product.productWeight || "Bilgi yoxdur"} />
        <DetailItem label="Məhsul Baxış Sayısı" value={product.viewCount || "Bilgi yoxdur"} />
        <DetailItem
          label="Elan Tarixi"
          value={product.createDate ? product.createDate.split("T")[0] : "Bilgi yoxdur"}
        />
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

const DetailItem = ({ label, value }) => (
  <div className={style.detailPage_main_bottom_left_tite_box}>
    <p className={style.detailPage_main_bottom_left_tite}>{label}</p>
    <span className={style.detailPage_main_bottom_left_tite_category}>{value}</span>
  </div>
);

export default DetailPageBottom;
