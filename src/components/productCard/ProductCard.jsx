import React, { useState } from "react";
import style from "./productCard.module.css";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";

const fetchProducts = async ({  page, pageSize }) => {
  const response = await fetch(
    `https://restartbaku-001-site3.htempurl.com/api/Product/get-all-products?LanguageCode=&pageIndex=${page}&pageSize=${pageSize}`
  );

  if (!response.ok) {
    throw new Error("Ürünlər alınarkən xəta baş verdi.");
  }
  return response.json();
};

const calculateDays = (createDate) => {
  const createdDate = new Date(createDate);
  const currentDate = new Date();
  return Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24));
};

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const { i18n } = useTranslation();

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
  

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products", getLanguageCode(), currentPage],
    queryFn: () =>
      fetchProducts({
        languageCode: getLanguageCode(),
        page: currentPage - 1, // Backend is zero-based
        pageSize,
      }),
    keepPreviousData: true,
  });

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

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta: {error.message}</p>;

  const products = data?.data?.items || [];
  const totalItems = data?.data?.totalCount || 0;
  const totalPages = Math.ceil(totalItems / pageSize);

  console.log("products", products);
  

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
                    <IoCalendarNumber /> {calculateDays(item.createDate)} Gün
                  </div>
                </div>
                <p className={style.productCard_subTitle}>{item.productTitle}</p>
                <p className={style.productCard_text}>Şəhər: {item.city}</p>
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
