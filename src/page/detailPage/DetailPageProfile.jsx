import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineKeyboardArrowLeft, MdDiamond } from "react-icons/md";
import { FaPhoneAlt, FaFlag } from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import style from "./detailPage.module.css";
import Header from "../../layout/Header/Header";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import { useTranslation } from "react-i18next"; 
import "react-image-gallery/styles/scss/image-gallery.scss";

const DetailPageProfile = () => {
  const location = useLocation();
  const product = location.state || {};
  const navigate = useNavigate();
  const [openComplaintBox, setOpenComplaintBox] = useState(false);
  const { i18n } = useTranslation(); 
  

  const toggleComplaintBox = () => {
    setOpenComplaintBox((prev) => !prev);
  };

  const filterProductDetails = (key, value) => {
    const hiddenKeys = ["id", "slug", "userCode", "productId", "coverImage"];
    return !hiddenKeys.includes(key) && value !== null;
  };

  return (
    <div>
      <div className={style.detailPage}>
      <Header />
      <div className="container">
        <p className={style.detailPage_goBack} onClick={() => navigate(-1)}>
          <MdOutlineKeyboardArrowLeft /> Go Back
        </p>
        <div className={style.detailPage_main}>
          <div className={style.detailPage_main_head}>
            <div className={style.detailPage_main_head_left}>
              {product.productGalleries?.length > 0 ? (
              <ImageGallery 
              items={galleryItems}
              showPlayButton={false}
              slideInterval={1000}
              slideOnThumbnailOver={true}
              showIndex={true}
            />
            
              ) : (
                <img
                  src={product.coverImage}
                  alt="Product"
                  className={style.detailPage_main_head_left_mainImgBox_img}
                />
              )}
            </div>
            <div className={style.detailPage_main_head_right}>
              <h4 className={style.detailPage_main_head_right_humanName}>
                {product.productTitle || "Unknown Seller"}
              </h4>
              <p className={style.detailPage_main_head_right_phone}>
                <FaPhoneAlt className={style.detailPage_main_head_right_phone_icon} />
                {product.user?.userPhone || "0504002200"}
              </p>
              <button className={style.detailPage_main_head_right_btn}>
                <MdDiamond /> Elanı VIP et
              </button>
              <p className={style.detailPage_main_head_right_otherSale}>
                Satıcının bütün elanlarını gör
              </p>
            </div>
          </div>
          <div className={style.detailPage_main_bottom}>
          <div className={style.detailPage_main_bottom_left}>
              <h4>Ətraflı məlumat</h4>
                <p>Mehsul Adi-{product.productTitle}</p>
                <p>Mehsul Aciqlamasi-{product.productDescription}</p>
                <p>Mehsul Kateqoriyasi-{product.categoryTitle}</p>
                <p>Mehsul Qiymet-{product.price}</p>
                <p>Mehsul Hecmi-{product.productWeight}</p>
                <p>Mehsul Baxis sayisi-{product.viewCount}</p>
                <p>Elan Tarixi-{product.createDate}</p>
                {product.parameters &&
                product.parameters.map((param, index) => (
                  <div
                    key={index}
                    className={style.detailPage_main_bottom_left_procebox}
                  >
                    <span>{param.parameterTitle}:</span>{" "}
                    <span>{param.parameterValue}</span>
                  </div>
                ))}
            </div>
            <div className={style.detailPage_main_bottom_right}>
              <h5>User Information</h5>
            {product.user && (
                <div className={style.detailPage_main_bottom_left_box}>
                  <p>Sahibin Adi-{product.user.userFirstName}</p>
                  <p>Sahibin Soyadi-{product.user.userLastName}</p>
                  <p>Sahibin Telefonu-{product.user.userPhone}</p>
                  <p>Sahibin Emaili-{product.user.userAddress || "N.A"}</p>
                </div>
              )}
              <p>Elanın nömrəsi: {product.productId || "2221"}</p>
              <p>Günlük icarəyə verilir.</p>
              <div className={style.detailPage_main_bottom_right_card}>
                <p
                  className={style.detailPage_main_bottom_right_card_subtitle}
                  onClick={toggleComplaintBox}
                >
                  <FaFlag className={style.detailPage_main_bottom_right_card_subtitle_icon} />{" "}
                  Şikayət et
                </p>
                {openComplaintBox && (
                  <div
                    className={style.detailPage_main_bottom_right_card_complaintBox_container}
                  >
                    <div
                      className={style.detailPage_main_bottom_right_card_complaintBox}
                    >
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
          </div>
        </div>
      </div>
      <Footer />
      <FooterResponsive />
    </div>
    </div>
  );
};

export default DetailPageProfile;
