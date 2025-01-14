import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import style from "../../page/detailPage/detailPage.module.css"
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import ImageGallery from "react-image-gallery";
import Footer from "../../layout/footer/Footer";
import Header from "../../layout/Header/Header";
import { FaPhoneAlt, FaFlag, FaHeart } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { MdDiamond, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import { useTranslation } from "react-i18next";
import "react-image-gallery/styles/scss/image-gallery.scss";

const SameProductDetails = () => {
    const [openComplaintBox, setOpenComplaintBox] = useState(false);
    const likedProducts = useSelector((state) => state.likedProducts.items);
    const [galleryItems, setGalleryItems] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { i18n } = useTranslation();
    const location = useLocation();
    const product = location.state;
    const [productData, setProductData] = useState(null);

    if (!product) {
        console.log("Ürün bilgisi eksik veya bulunamadı.");
        return <p>Ürün bilgisi bulunamadı.</p>;
    }

    console.log("Product Data:", product);

    const toggleLiked = (productItem) => {
      const savedUserName = localStorage.getItem("userName");
      const authToken = localStorage.getItem("authToken");
  
      if (!authToken || authToken === "expired") {
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

    useEffect(() => {
      const apiUrl = `https://restartbaku-001-site3.htempurl.com/api/Product/get-product?LanguageCode=az&Slug=${product.slug}`;
  
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("API sorğusunda xəta baş verdi!");
          }
          return response.json();
        })
        .then((data) => {
          console.log("APİ-dən gələn məlumat:", data);
          setProductData(data); // Məlumatı state-ə saxlayın
        })
        .catch((error) => {
          console.error("Xəta:", error);
        });
    }, [product.slug]);
  
    useEffect(() => {
      if (productData?.data?.productGalleries) {
        const galleryItemsMapped = productData.data.productGalleries.map((gallery) => ({
          original: gallery.productGalleryFile,
          thumbnail: gallery.productGalleryFile,
        }));
        setGalleryItems(galleryItemsMapped); // Set gallery items state
        console.log("Gallery Items:", galleryItemsMapped);
      }
    }, [productData]);
    
    return (
      <div className={style.detailPage}>
        <Header />
        <div className="container">
          <p className={style.detailPage_goBack} onClick={() => navigate(-1)}>
            <MdOutlineKeyboardArrowLeft /> Geri Qayıt
          </p>
          <div className={style.detailPage_main}>
            <div className={style.detailPage_main_head}>
            <div className={style.detailPage_main_head_left}>
            {galleryItems.length > 0 ? (
              <ImageGallery
                items={galleryItems}
                showPlayButton={false}
                slideInterval={1000}
                slideOnThumbnailOver={true}
                showIndex={true}
              />
            ) : (
              <img
                src={productData?.data?.coverImage || "placeholder-image.jpg"}
                alt="Product"
                className={style.detailPage_main_head_left_mainImgBox_img}
              />
            )}
          </div>
              <div className={style.detailPage_main_head_right}>
                {productData?.data?.parameters &&
                  productData?.data?.parameters.map((param, index) => (
                    <div
                      key={index}
                      className={style.detailPage_main_bottom_left_procebox}
                    >
                      <span className={style.detailPage_main_bottom_left_price}>
                        {param.parameterValue} - AZN(₼)
                      </span>
                    </div>
                  ))}
                {productData?.data?.user && (
                  <div className={style.detailPage_main_bottom_left_box}>
                    <p className={style.detailPage_main_bottom_left_box_title}>
                      Sahibin Adı: {productData?.data?.user.userFirstName}
                    </p>
                    <p className={style.detailPage_main_bottom_left_box_title}>
                      Sahibin Telefonu: {productData?.data?.user.userPhone}
                    </p>
                  </div>
                )}
                <p>Elanın nömrəsi: {productData?.data?.productId || "2221"}</p>
                <button className={style.detailPage_main_head_right_btn}>
                  <MdDiamond /> Elanı VIP et
                </button>
                <p className={style.detailPage_main_head_right_otherSale}>
                  Satıcının bütün elanlarını gör
                </p>
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
                    <FaFlag
                      className={style.detailPage_main_bottom_right_card_subtitle_icon}
                    />{" "}
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
                <div>
                  <p className={style.detailPage_main_bottom_left_tite}>
                    Məhsul Kateqoriyası
                  </p>
                  {productData?.data?.categoryTitle || "Bilgi yoxdur"}
                </div>
                <div>
                  <p className={style.detailPage_main_bottom_left_tite}>
                    Məhsul Adı
                  </p>
                  {productData?.data?.productTitle || "Bilgi yoxdur"}
                </div>
                <div>
                  <p className={style.detailPage_main_bottom_left_tite}>
                    Məhsul Qiyməti
                  </p>
                  {productData?.data?.price ? `${product.price} AZN(₼)` : "Bilgi yoxdur"}
                </div>
                <div>
                  <p className={style.detailPage_main_bottom_left_tite}>
                    Məhsul Həcmi
                  </p>
                  {productData?.data?.productWeight || "Bilgi yoxdur"}
                </div>
                <div>
                  <p className={style.detailPage_main_bottom_left_tite}>
                    Məhsul Baxış Sayısı
                  </p>
                  {productData?.data?.viewCount || "Bilgi yoxdur"}
                </div>
                <div>
                  <p className={style.detailPage_main_bottom_left_tite}>
                    Elan Tarixi
                  </p>
                  {productData?.data?.createDate || "Bilgi yoxdur"}
                </div>
              </div>
              <div className={style.detailPage_main_bottom_right}>
                <p>{productData?.data?.productDescription || "Bilgi yoxdur"}</p>
              </div>
            </div>
          </div>
          <div>
    </div>
        </div>
        <Footer />
        <FooterResponsive />
      </div>
    );
};

export default SameProductDetails;