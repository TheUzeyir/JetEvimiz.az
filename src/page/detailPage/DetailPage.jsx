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
import DetailPageSameProduct from "../../components/DetailPageSameProduct/DetailPageSameProduct";

const DetailPage = () => {
  const [openComplaintBox, setOpenComplaintBox] = useState(false);
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const [product, setProduct] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [matchingProducts, setMatchingProducts] = useState([]);

  const languageMapping = {
    az: "az",
    ru: "ru",
    en: "en",
    tr: "tr",
  };
  const getLanguageCode = () => languageMapping[i18n.language] || "tr";

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
        alert("Ürün bilgisi alınırken bir hata oluştu.");
      }
    };
    getProduct();
  }, [slug, i18n.language]);

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

  const galleryItems =
    product.productGalleries?.map((gallery) => ({
      original: gallery.productGalleryFile,
      thumbnail: gallery.productGalleryFile,
    })) || [];

    useEffect(() => {
      const getMatchingProducts = async () => {
        try {
          const response = await fetch(
            "https://restartbaku-001-site3.htempurl.com/api/Product/get-all-products?LanguageCode=az"
          );
  
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
  
          const allProducts = await response.json();
  
          if (allProducts && allProducts.data && Array.isArray(allProducts.data.items)) {
            const filteredProducts = allProducts.data.items.filter((remoteProduct) => {
              const remoteSlugPrefix = remoteProduct.slug.split("-")[0];
              return remoteSlugPrefix === slug.split("-")[0];
            });
  
            console.log("Matching Products:", filteredProducts);
            setMatchingProducts(filteredProducts); // Set the state
          } else {
            console.error("API response is not in the expected format.");
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
  
      if (slug) {
        getMatchingProducts();
      }
    }, [slug]);    

    
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
                  src={product.coverImage || "placeholder-image.jpg"}
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
                    <span className={style.detailPage_main_bottom_left_price}>
                      {param.parameterValue} - AZN(₼)
                    </span>
                  </div>
                ))}
              {product.user && (
                <div className={style.detailPage_main_bottom_left_box}>
                  <p className={style.detailPage_main_bottom_left_box_title}>
                    Sahibin Adı: {product.user.userFirstName}
                  </p>
                  <p className={style.detailPage_main_bottom_left_box_title}>
                    Sahibin Telefonu: {product.user.userPhone}
                  </p>
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
                {product.categoryTitle || "Bilgi yoxdur"}
              </div>
              <div>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Adı
                </p>
                {product.productTitle || "Bilgi yoxdur"}
              </div>
              <div>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Qiyməti
                </p>
                {product.price ? `${product.price} AZN(₼)` : "Bilgi yoxdur"}
              </div>
              <div>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Həcmi
                </p>
                {product.productWeight || "Bilgi yoxdur"}
              </div>
              <div>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Baxış Sayısı
                </p>
                {product.viewCount || "Bilgi yoxdur"}
              </div>
              <div>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Elan Tarixi
                </p>
                {product.createDate || "Bilgi yoxdur"}
              </div>
            </div>
            <div className={style.detailPage_main_bottom_right}>
              <p>{product.productDescription || "Bilgi yoxdur"}</p>
            </div>
          </div>
        </div>
      </div>
      <DetailPageSameProduct sameProduct={matchingProducts || []} />
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default DetailPage;
