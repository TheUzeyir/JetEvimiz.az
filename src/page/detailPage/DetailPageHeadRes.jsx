import React, { useState } from 'react';
import { IoIosPerson, IoIosCall } from 'react-icons/io';
import { MdDiamond } from 'react-icons/md';
import { BsFillHeartFill } from 'react-icons/bs';
import { FaHeart, FaFlag } from 'react-icons/fa';
import style from './detailPage.module.css'; 

const DetailPageHeadRes = ({ product, likedProducts, toggleLiked, togglePhoneVisibility, isPhoneVisible, formatPhoneNumber, toggleComplaintBox, openComplaintBox }) => {
  return (
    <div className={style.detailPage_main_head_right_resBox}>
      {product.user && (
        <div className={style.detailPage_main_bottom_left_box}>
          <p className={style.detailPage_main_bottom_left_box_title_humanCard}>
            <div className={style.detailPage_main_bottom_left_box_title_humanCard_head}>
              <span className={style.detailPage_main_bottom_left_box_title_humanCard_head_humanText}>{product.user.userFirstName}</span>
              {product.parameters[1] && (
                <span className={style.detailPage_main_bottom_left_box_title_humanCard_head_cityText}>{product.parameters[1].parameterValue}</span>
              )}
            </div>
            <IoIosPerson className={style.detailPage_main_bottom_left_box_title_humanCard_icon} />
          </p>
          <div
            className={style.detailPage_main_bottom_left_box_title_humanCard_nummBox}
            onClick={togglePhoneVisibility}
            style={{ cursor: "pointer" }}
          >
            <p>Nömrəni göstər</p>
            <p className={style.detailPage_main_bottom_left_box_title}>
              <IoIosCall />
              {isPhoneVisible ? `+${product.user.userPhone}` : `+${formatPhoneNumber(product.user.userPhone)}`}
            </p>
          </div>
        </div>
      )}
      <p>Elanın nömrəsi: {product.productId || "2221"}</p>
      <button className={style.detailPage_main_head_right_btn}>
        <MdDiamond /> Elanı VIP et
      </button>
      <p className={style.detailPage_main_head_right_otherSale}>
        Satıcının bütün elanlarını gör
      </p>
      <div className={style.detailPage_main_bottom_right_card}>
        {likedProducts.some((likedProduct) => likedProduct.productId === product.productId) ? (
          <p
            className={style.detailPage_main_bottom_right_card_title}
            onClick={(e) => {
              e.preventDefault();
              toggleLiked(product);
            }}
          >
            <BsFillHeartFill
              className={style.detailPage_main_bottom_right_card_title_icon}
            />{" "}
            Bəyənilənlərdən sil
          </p>
        ) : (
          <p
            className={style.detailPage_main_bottom_right_card_title}
            onClick={(e) => {
              e.preventDefault();
              toggleLiked(product);
            }}
          >
            <FaHeart
              className={style.detailPage_main_bottom_right_card_title_icon}
            />{" "}
            Bəyənilənlərə əlavə et
          </p>
        )}
        <p
          className={style.detailPage_main_bottom_right_card_subtitle}
          onClick={toggleComplaintBox}
        >
          <FaFlag
            className={style.detailPage_main_bottom_right_card_subtitle_icon}
          />{" "}
          Şikayət et
        </p>
        {openComplaintBox && (
          <div
            className={style.detailPage_main_bottom_right_card_complaintBox_container}
          >
            <div className={style.detailPage_main_bottom_right_card_complaintBox}>
              <textarea placeholder="Şikayət mətni" />
              <button
                className={style.detailPage_main_bottom_right_card_complaintBox_btn}
              >
                Göndər
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPageHeadRes;
