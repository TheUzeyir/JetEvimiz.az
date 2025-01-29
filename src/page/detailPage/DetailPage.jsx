import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
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
import ProductDetailBottom from "./ProductDetailBottom";
import DetailPageHeadRes from "./DetailPageHeadRes";
import ProductUserInfo from "./ProductUserInfo";

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
    
    const showAllProducts = () => {
      navigate(`/ownerAllProduct`);
    }
    
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
            <ProductUserInfo 
              product={product}
              likedProducts={likedProducts}
              toggleLiked={toggleLiked}
              showAllProducts={showAllProducts}
              toggleComplaintBox={toggleComplaintBox}
              openComplaintBox={openComplaintBox}
              togglePhoneVisibility={togglePhoneVisibility}
              isPhoneVisible={isPhoneVisible} 
              formatPhoneNumber={formatPhoneNumber} 
            />
          </div>
          <ProductDetailBottom  product={product} />
          <DetailPageHeadRes  product={product}
            likedProducts={likedProducts}
            toggleLiked={toggleLiked}
            togglePhoneVisibility={togglePhoneVisibility}
            isPhoneVisible={isPhoneVisible}
            formatPhoneNumber={formatPhoneNumber}
            toggleComplaintBox={toggleComplaintBox}
            openComplaintBox={openComplaintBox}/>
          </div>
      </div>
      <DetailPageSameProduct sameProduct={matchingProducts || []} />
      <Footer />
    </div>
  );
};

export default DetailPage;
