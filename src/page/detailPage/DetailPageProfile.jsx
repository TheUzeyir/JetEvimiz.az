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
              {Object.entries(product).map(([key, value]) => {
                if (["user", "parameters", "productGalleries"].includes(key)) {
                  return null;
                }
                if (typeof value === "object" || value === null) {
                  return null;
                }
                return (
                  filterProductDetails(key, value) && (
                    <div
                      className={style.detailPage_main_bottom_left_box}
                      key={key}
                    >
                      <span>{key}:</span> <span>{value}</span>
                    </div>
                  )
                );
              })}
            </div>
            <div className={style.detailPage_main_bottom_right}>
              {product.parameters &&
                product.parameters.map((param, index) => (
                  <div
                    key={index}
                    className={style.detailPage_main_bottom_left_box}
                  >
                    <span>{param.parameterTitle}:</span>{" "}
                    <span>{param.parameterValue}</span>
                  </div>
                ))}
              <h5>User Information</h5>
              {product.user &&
                Object.entries(product.user).map(([key, value]) => {
                  if (key === "userCode") return null;
                  return (
                    <div
                      key={key}
                      className={style.detailPage_main_bottom_left_box}
                    >
                      <span>{key}:</span> <span>{value || "N/A"}</span>
                    </div>
                  );
                })}
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
