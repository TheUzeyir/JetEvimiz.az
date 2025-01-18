import React, { useState,useEffect } from "react";
import style from "./productCard.module.css";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useParams } from "react-router-dom";

const fetchProducts = async ({  page, pageSize }) => {
  const response = await fetch(
    `https://restartbaku-001-site3.htempurl.com/api/Product/get-all-products?LanguageCode=&pageIndex=${page}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Ürünlər alınarkən xəta baş verdi.");
  }
  return response.json();
};

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const { i18n } = useTranslation();
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const getLanguageCode = () => {
    switch (i18n.language) {
      case "ru":
      case "en":
      case "tr":
        return i18n.language;
      default:
        return "az";
    }
  };
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", getLanguageCode(), currentPage],
    queryFn: () =>
      fetchProducts({
        languageCode: getLanguageCode(),
        page: currentPage - 1,
        pageSize,
      }),
    keepPreviousData: true,
  });
  
  const toggleLiked = (productItem) => {
    const authToken = localStorage.getItem("authToken");
  
    const isTokenExpired = (token) => {
      try {
        const payload = JSON.parse(atob(token.split(".")[1])); 
        const currentTime = Math.floor(Date.now() / 1000); 
        return payload.exp < currentTime; 
      } catch (error) {
        console.error("Token parsing error:", error);
        return true; 
      }
    };
  
    if (!authToken || isTokenExpired(authToken)) {
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
  
  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta: {error.message}</p>;

  const products = data?.data?.items || [];
  const totalItems = data?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  console.log("products", products);
  
  function formatPrice(price) {
    const reversed = price.toString().split('').reverse();
      const formatted = reversed.reduce((acc, digit, index) => {
      if (index > 0 && index % 3 === 0) {
        acc.push(' ');
      }
      acc.push(digit);
      return acc;
    }, []).reverse().join(''); 
  
    return formatted;
  }

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
                  <span className={style.productCard_title_price}>{formatPrice(item.price)} AZN</span>
                </div>
                <p className={style.productCard_subTitle}>{item.productTitle}</p>
                <div className={style.productCard_bottom}>
                  <p className={style.productCard_text}>{item.city}</p>
                  <p className={style.productCard_bottom_text}>{item.createDate.split("T")[0] }</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className={style.paginationContainer}>
          <Pagination
            current={currentPage}
            total={totalItems}
            pageSize={pageSize}
            onChange={(page) => setCurrentPage(page)}
            className={style.pagination}
          />
          <p>
            Səhifə {currentPage} / {totalPages}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
