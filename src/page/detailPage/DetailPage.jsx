import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
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
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import { IoIosCall } from "react-icons/io";
import { IoIosPerson } from "react-icons/io";

const DetailPage = () => {
  const [openComplaintBox, setOpenComplaintBox] = useState(false);
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const [product, setProduct] = useState({});
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const [matchingProducts, setMatchingProducts] = useState([]);
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);

  const languageMapping = {
    az: "az",
    ru: "ru",
    en: "en",
    tr: "tr",
  };
  const getLanguageCode = () => languageMapping[i18n.language] || "tr";

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

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

  const togglePhoneVisibility = () => {
    setIsPhoneVisible((prev) => !prev);
  };

  const formatPhoneNumber = (phone) => {
    const phoneStr = String(phone);
    const part1 = phoneStr.slice(0, 4); 
    const part2 = phoneStr.slice(4, -2); 
    const hiddenPart = "**";
    return `${part1}${part2}-${hiddenPart}`;
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
  
            setMatchingProducts(filteredProducts);
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

    const handleClick = () => {
      if (product.user && product.user.userPhone) {
        window.location.href = `tel:${product.user.userPhone}`; 
      } else {
        alert("Telefon nömrəsi mövcud deyil.");
      }
    };

    console.log(product);
    
    
  return (
    <div className={style.detailPage}>
      <Navbar/>
      <div className="container_item">
        <p className={style.detailPage_goBack} onClick={() => navigate(-1)}>
          <MdOutlineKeyboardArrowLeft /> Geri Qayıt
        </p>
        <div className={style.detailPage_main}>
          <h2 className={style.detailPage_main_title}>
              {product.productTitle},
              {product.parameters && product.parameters.length > 0 && (<span className={style.detailPage_main_bottom_left_price}>{product.parameters[0].parameterValue} - AZN</span>)},
              {product.parameters?.[1] && (<span className={style.detailPage_main_bottom_left_price}>{product.parameters[1].parameterValue}</span>)}
            </h2>
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
                {product.parameters && product.parameters.length > 0 && (
                  <span className={style.detailPage_main_bottom_head_title}>
                    {product.parameters[0].parameterValue &&
                      product.parameters[0].parameterValue
                        .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} AZN
                  </span>                
                )}
              {product.user && (
                <div className={style.detailPage_main_bottom_left_box}>
                  <p className={style.detailPage_main_bottom_left_box_title_humanCard}>
                    <div className={style.detailPage_main_bottom_left_box_title_humanCard_head}>
                      <span className={style.detailPage_main_bottom_left_box_title_humanCard_head_humanText}>{product.user.userFirstName}</span>
                      {product.parameters[1] && (<span className={style.detailPage_main_bottom_left_box_title_humanCard_head_cityText}>{product.parameters[1].parameterValue}</span>)}
                    </div>
                    <IoIosPerson className={style.detailPage_main_bottom_left_box_title_humanCard_icon}/>
                  </p>
                  <div
                    className={style.detailPage_main_bottom_left_box_title_humanCard_nummBox}
                    onClick={togglePhoneVisibility}
                    style={{ cursor: "pointer" }} 
                  >
                    <p>Nömrəni göstər</p>
                    <p className={style.detailPage_main_bottom_left_box_title}>
                      <IoIosCall />
                      {isPhoneVisible
                        ? `${product.user.userPhone}` 
                        : `${formatPhoneNumber(product.user.userPhone)}`} 
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
            <div className={style.detailPage_main_bottom_head}>
              {product.parameters && product.parameters.length > 0 && (
                  <div className={style.detailPage_main_bottom_headBox}>                
                  <span className={style.detailPage_main_bottom_head_title}>{product.productTitle || "Bilgi yoxdur"}</span>,
                  {product.parameters[0] && (<span className={style.detailPage_main_bottom_head_title}>{product.parameters[0].parameterValue}-AZN</span>)}
                  {product.parameters[1] && (<span className={style.detailPage_main_bottom_head_title}>{product.parameters[1].parameterValue}</span>)}
                  </div>
                )}
            </div>
            <div className={style.detailPage_main_bottom_left}>
                {product.parameters && product.parameters.length > 0 && (
                  <div className={style.detailPage_main_bottom_left_tite_box}>                
                  <p className={style.detailPage_main_bottom_left_tite}>{product.parameters[1] && (<span className={style.detailPage_main_bottom_head_title}>{product.parameters[1].parameterTitle}</span>)}</p>
                  {product.parameters[1] && (<span className={style.detailPage_main_bottom_head_title}>{product.parameters[1].parameterValue}</span>)}
                  </div>
                )}
              <div className={style.detailPage_main_bottom_left_tite_box}>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Kateqoriyası
                </p>
                <span className={style.detailPage_main_bottom_left_tite_category}>{product.categoryTitle || "Bilgi yoxdur"}</span>
              </div>
              <div className={style.detailPage_main_bottom_left_tite_box}>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Adı
                </p>
                <span className={style.detailPage_main_bottom_left_tite_productName}>{product.productTitle || "Bilgi yoxdur"}</span>
              </div>
              <div className={style.detailPage_main_bottom_left_tite_box}>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Qiyməti
                </p>
                {product.price ? `${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} AZN` : "Fiyat mevcut değil"}
                </div>
              <div className={style.detailPage_main_bottom_left_tite_box}>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Həcmi
                </p>
                {product.productWeight || "Bilgi yoxdur"}
              </div>
              <div className={style.detailPage_main_bottom_left_tite_box}>
                <p className={style.detailPage_main_bottom_left_tite}>
                  Məhsul Baxış Sayısı
                </p>
                {product.viewCount || "Bilgi yoxdur"}
              </div>
              <div className={style.detailPage_main_bottom_left_tite_box}>
                <span className={style.detailPage_main_bottom_left_tite}>
                  Elan Tarixi
                </span>
                <div className={style.detailPage_main_bottom_left_tite_createTime}>{product.createDate ? product.createDate.split("T")[0] : "Bilgi yoxdur"}</div>
              </div>
            </div>
            <div className={style.detailPage_main_bottom_right}>
              <p>{product.productDescription || "Bilgi yoxdur"}</p>
            </div>
            <button className={style.callBtn} onClick={handleClick}><IoIosCall className={style.callBtn_icon}/>Zəng Et</button>
          </div>
          <div className={style.detailPage_main_head_right_resBox}>
              {product.user && (
                <div className={style.detailPage_main_bottom_left_box}>
                <p className={style.detailPage_main_bottom_left_box_title_humanCard}>
                  <div className={style.detailPage_main_bottom_left_box_title_humanCard_head}>
                    <span className={style.detailPage_main_bottom_left_box_title_humanCard_head_humanText}>{product.user.userFirstName}</span>
                    {product.parameters[1] && (<span className={style.detailPage_main_bottom_left_box_title_humanCard_head_cityText}>{product.parameters[1].parameterValue}</span>)}
                  </div>
                  <IoIosPerson className={style.detailPage_main_bottom_left_box_title_humanCard_icon}/>
                </p>
                <div
                  className={style.detailPage_main_bottom_left_box_title_humanCard_nummBox}
                  onClick={togglePhoneVisibility}
                  style={{ cursor: "pointer" }} 
                >
                  <p>Nömrəni göstər</p>
                  <p className={style.detailPage_main_bottom_left_box_title}>
                    <IoIosCall />
                    {isPhoneVisible
                      ? `+${product.user.userPhone}` 
                      : `+${formatPhoneNumber(product.user.userPhone)}`} 
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
      </div>
      <DetailPageSameProduct sameProduct={matchingProducts || []} />
      <Footer />
    </div>
  );
};

export default DetailPage;
