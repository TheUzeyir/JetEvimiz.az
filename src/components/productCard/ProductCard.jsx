import React, { useState, useEffect } from "react";
import style from "./productCard.module.css";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import { useTranslation } from "react-i18next"; // i18n import edilir

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const { i18n } = useTranslation(); // i18n-dən istifadə edirik

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  const pageSize = 15;

  // Dil kodunu əldə edən funksiya
  const getLanguageCode = () => {
    const language = i18n.language; // Aktiv dili əldə edirik
    if (language === 'az') return 'az'; // Azərbaycan dili
    if (language === 'ru') return 'ru'; // Rus dili
    if (language === 'en') return 'en'; // İngilis dili
    if (language === 'tr') return 'tr'; // Türk dili
    return 'az'; // Varsayılan olaraq Azərbaycan dili
  };

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const languageCode = getLanguageCode(); // Dil kodunu alırıq
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Product/get-all-products?LanguageCode=${languageCode}&pageIndex=${page}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        throw new Error("Ürünlər alınarkən xəta baş verdi.");
      }
      const result = await response.json();
      if (result && result.data) {
        setProducts(result.data.items || []);
      } else {
        throw new Error("Məlumat tapılmadı.");
      }
    } catch (error) {
      console.error("Xəta:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pageIndex);
  }, [pageIndex, i18n.language]); // Dil dəyişdikdə məhsullar yenilənir

  const toggleLiked = (productItem) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
      navigate("/login");
      return;
    }

    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === productItem.productId
    );

    const updatedLikedProducts = isLiked
      ? likedProducts.filter(
          (likedProduct) => likedProduct.productId !== productItem.productId
        )
      : [...likedProducts, productItem];

    dispatch(addLikedProduct(productItem));
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta: {error}</p>;

  return (
    <div className="container">
      <div className={style.productCardPage_containers}>
        <div className={style.productCard_container}>
          {products.map((item) => (
            <div className={style.productCard} key={item.productId}>
              <Link to={`/product-details/${item.slug}`}>
                <div className={style.productCard_imgBox}>
                  <img
                    src={item.coverImage}
                    alt={item.productTitle}
                    className={style.productCard_imgBox_img}
                  />
                  {likedProducts.some(
                    (likedProduct) => likedProduct.productId === item.productId
                  ) ? (
                    <BsFillHeartFill
                      className={style.productCard_imgBox_heartIcon_check}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLiked(item);
                      }}
                    />
                  ) : (
                    <FaHeart
                      className={style.productCard_imgBox_heartIcon}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleLiked(item);
                      }}
                    />
                  )}
                  <div className={style.productCard_imgBox_title}>
                    <BsShop /> Mağaza
                  </div>
                </div>
                <div className={style.productCard_title}>
                  <span className={style.productCard_title_price}>
                    {item.price} AZN
                  </span>
                  <div className={style.productCard_title_dayBox}>
                    <IoCalendarNumber /> 1 Gün
                  </div>
                </div>
                <p className={style.productCard_subTitle}>{item.productTitle}</p>
                <p className={style.productCard_text}>Şəhər: {item.city}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className={style.pagination}>
          <button
            onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
            disabled={pageIndex === 0}
            className={style.paginationBtn}
          >
            Əvvəlki
          </button>
          <span>
            Səhifə {pageIndex + 1}
          </span>
          <button
            onClick={() => setPageIndex((prev) => prev + 1)}
            className={style.paginationBtn}
          >
            Növbəti
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
