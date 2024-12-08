import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/Header/Header";
import { FaPhoneAlt, FaHeart, FaFlag } from "react-icons/fa";
import { MdDiamond, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import style from "./detailPage.module.css";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";

const DetailPage = () => {
  const [openComplaintBox, setOpenComplaintBox] = useState(false);
  const [product, setProduct] = useState({});
  const [mainImage, setMainImage] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://restartbaku-001-site3.htempurl.com/api/Product/get-product?LanguageCode=az&Slug=${slug}`
        );
        if (!response.ok) {
          throw new Error("Ürün bilgisi alınamadı.");
        }
        const result = await response.json();
        setProduct(result.data || {});
        setMainImage(result.data.coverImage || null);
      } catch (error) {
        console.error(error.message);
      }
    };
    getProduct();
  }, [slug]);

  const handleImageClick = (newImage) => {
    setMainImage(newImage);
  };

  const toggleComplaintBox = () => {
    setOpenComplaintBox((prev) => !prev);
  };

  const isDynamicValue = (key, value) => {
    const staticValues = ["300", "1344", "mercedes"]; // Təkrarlanan dəyərlər
    return !staticValues.includes(String(value)) && value !== null;
  };

  const filterProductDetails = (key, value) => {
    const hiddenKeys = ["id", "slug", "userCode", "productId"]; // Gizlədiləcək açarların siyahısı
    return !hiddenKeys.includes(key) && isDynamicValue(key, value);
  };

  return (
    <div className={style.detailPage}>
      <Header />
      <div className="container">
        <p className={style.detailPage_goBack} onClick={() => navigate(-1)}>
          <MdOutlineKeyboardArrowLeft /> Go Back
        </p>
        <div className={style.detailPage_main}>
          <div className={style.detailPage_main_head}>
            <div className={style.detailPage_main_head_left}>
              <div className={style.detailPage_main_head_left_mainImgBox}>
                <img
                  src={mainImage || product.coverImage}
                  alt="Product"
                  className={style.detailPage_main_head_left_mainImgBox_img}
                />
              </div>
              <div className={style.detailPage_main_head_left_slideImgBox}>
                {product.productGalleries &&
                  product.productGalleries.map((gallery, index) => (
                    <img
                      key={index}
                      src={gallery.productGalleryFile}
                      alt={`Slide ${index + 1}`}
                      className={style.detailPage_main_head_left_slideImgBox_img}
                      onClick={() => handleImageClick(gallery.productGalleryFile)}
                    />
                  ))}
              </div>
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
                if (
                  ["user", "parameters", "productGalleries"].includes(key)
                ) {
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
                Object.entries(product.user).map(([key, value]) => (
                  <div
                    key={key}
                    className={style.detailPage_main_bottom_left_box}
                  >
                    <span>{key}:</span> <span>{value || "N/A"}</span>
                  </div>
                ))}
              <p>Elanın nömrəsi: {product.productId || "2221"}</p>
              <p>Günlük icarəyə verilir.</p>
              <div className={style.detailPage_main_bottom_right_card}>
                <p className={style.detailPage_main_bottom_right_card_title}>
                  <FaHeart className={style.detailPage_main_bottom_right_card_title_icon} />{" "}
                  Bəyənilənlərə əlavə et
                </p>
                <p
                  className={style.detailPage_main_bottom_right_card_subtitle}
                  onClick={toggleComplaintBox}
                >
                  <FaFlag className={style.detailPage_main_bottom_right_card_subtitle_icon} />{" "}
                  Şikayət et
                </p>
                {openComplaintBox && (
                  <div
                    className={
                      style.detailPage_main_bottom_right_card_complaintBox_container
                    }
                  >
                    <div
                      className={
                        style.detailPage_main_bottom_right_card_complaintBox
                      }
                    >
                      <textarea placeholder="Şikayət mətni" />
                      <button
                        className={
                          style.detailPage_main_bottom_right_card_complaintBox_btn
                        }
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
  );
};

export default DetailPage;
