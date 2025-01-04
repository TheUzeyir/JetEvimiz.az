import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/Header/Header";
import { FaPhoneAlt, FaFlag, FaHeart } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { MdDiamond, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import style from "./detailPage.module.css";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import ImageGallery from "react-image-gallery";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import { useTranslation } from "react-i18next"; 
import "react-image-gallery/styles/scss/image-gallery.scss";

const DetailPage = () => {
  const [openComplaintBox, setOpenComplaintBox] = useState(false);
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const [product, setProduct] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation(); 

  const getLanguageCode = () => {
    const language = i18n.language;
    return language === 'az' ? 'az' : language === 'ru' ? 'ru' : language === 'en' ? 'en' : 'tr';
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const languageCode = getLanguageCode();
        const response = await fetch(
          `https://restartbaku-001-site3.htempurl.com/api/Product/get-product?LanguageCode=${languageCode}&Slug=${slug}`
        );
        if (!response.ok) {
          throw new Error("Ürün bilgisi alınamadı.");
        }
        const result = await response.json();
        setProduct(result.data || {});
      } catch (error) {
        console.error(error.message);
      }
    };
    getProduct();
  }, [slug, i18n.language]);

  const toggleLiked = (productItem) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
      navigate("/login");
      return;
    }

    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === productItem.productId
    );

    dispatch(addLikedProduct(productItem));

    let updatedLikedProducts;
    if (isLiked) {
      updatedLikedProducts = likedProducts.filter(
        (likedProduct) => likedProduct.productId !== productItem.productId
      );
    } else {
      updatedLikedProducts = [...likedProducts, productItem];
    }
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
  };

  const toggleComplaintBox = () => {
    setOpenComplaintBox((prev) => !prev);
  };

  const galleryItems =
    product.productGalleries?.map((gallery) => ({
      original: gallery.productGalleryFile,
      thumbnail: gallery.productGalleryFile,
    })) || [];

  const filterProductDetails = (key, value) => {
    const hiddenKeys = ["id", "slug", "userCode", "productId", "coverImage"];
    return !hiddenKeys.includes(key) && value !== null;
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
            {product.parameters &&
                product.parameters.map((param, index) => (
                  <div
                    key={index}
                    className={style.detailPage_main_bottom_left_procebox}
                  >
                    <span className={style.detailPage_main_bottom_left_price}>{param.parameterValue} - AZN</span>
                  </div>
                ))}
            {product.user && (
                <div className={style.detailPage_main_bottom_left_box}>
                  <p className={style.detailPage_main_bottom_left_box_title}>Sahibin Adi-{product.user.userFirstName}</p>
                  <p className={style.detailPage_main_bottom_left_box_title}>Sahibin Telefonu-{product.user.userPhone}</p>
                </div>
              )}
              <p>Elanın nömrəsi: {product.productId || "2221"}</p>
              <button className={style.detailPage_main_head_right_btn}>
                <MdDiamond /> Elanı VIP et
              </button>
              <p className={style.detailPage_main_head_right_otherSale}>
                Satıcının bütün elanlarını gör
              </p>
              <p>Günlük icarəyə verilir.</p>
              <div className={style.detailPage_main_bottom_right_card}>
                {likedProducts.some(
                  (likedProduct) => likedProduct.productId === product.productId
                ) ? (
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
          <div className={style.detailPage_main_bottom}>
            <div className={style.detailPage_main_bottom_left}>
                <p><p className={style.detailPage_main_bottom_left_tite}>Mehsul Adi</p>{product.productTitle}</p>
                <p><p className={style.detailPage_main_bottom_left_tite}>Mehsul Kateqoriyasi</p>{product.categoryTitle}</p>
                <p><p className={style.detailPage_main_bottom_left_tite}>Mehsul Qiymet</p>{product.price}</p>
                <p><p className={style.detailPage_main_bottom_left_tite}>Mehsul Hecmi</p>{product.productWeight}</p>
                <p><p className={style.detailPage_main_bottom_left_tite}>Mehsul Baxis sayisi</p>{product.viewCount}</p>
                <p><p className={style.detailPage_main_bottom_left_tite}>Elan Tarixi</p>{product.createDate}</p>
            </div>
            <div className={style.detailPage_main_bottom_right}>
            <p>{product.productDescription}</p>
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