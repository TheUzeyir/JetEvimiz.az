import React, { useState, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop";
import style from "./searchResult.module.css";
import axios from "axios";
import CategorySection from "./CategorySection";
import ProductSection from "./ProductSection";
import Pagination from "./Pagination";
 
const SearchResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likedProducts.items);

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const searchInput = queryParams.get("search");
  const categoryId = queryParams.get("categoryId");

  const { data: categoryData, isLoading: isCategoryLoading } = useQuery(
    ["categoryData", categoryId],
    async () => {
      if (!categoryId) return null;
      const { data } = await axios.get(
        `https://restartbaku-001-site3.htempurl.com/api/Category/get-category/${categoryId}`
      );
      return data.data;
    },
    { enabled: !!categoryId }
  );

  const { data: products = [], isLoading: isProductsLoading } = useQuery(
    ["products", searchInput, categoryId, pageIndex],
    async () => {
      const { data } = await axios.get(
        `https://restartbaku-001-site3.htempurl.com/api/Product/get-all-products`,
        {
          params: {
            search: searchInput || "",
            categoryId: categoryId || "",
            pageIndex,
            pageSize,
          },
        }
      );
      return data.data || [];
    },
    { keepPreviousData: true }
  );

  const toggleLiked = useCallback(
    (productItem) => {
      const savedUserName = localStorage.getItem("userName");
      if (!savedUserName) {
        alert("Bəyənmək üçün giriş etməlisiniz.");
        return;
      }
      dispatch(addLikedProduct(productItem));
    },
    [dispatch]
  );

  const handlePreviousPage = useCallback(() => {
    setPageIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNextPage = useCallback(() => {
    if (products.length === pageSize) {
      setPageIndex((prev) => prev + 1);
    }
  }, [products.length, pageSize]);

  return (
    <div className={style.searchResultContainer}>
      <HeaderTop />
      <Navbar />
      <div className="container">
        <div className={style.categorySectionPage}>
          <h2>Axtarış Nəticələri</h2>
          <CategorySection
            isLoading={isCategoryLoading}
            categoryData={categoryData}
          />
          <ProductSection
            isLoading={isProductsLoading}
            products={products}
            likedProducts={likedProducts}
            toggleLiked={toggleLiked}
          />
          <Pagination
            pageIndex={pageIndex}
            onPreviousPage={handlePreviousPage}
            onNextPage={handleNextPage}
            isNextDisabled={products.length < pageSize}
          />
        </div>
      </div>
      <FooterResponsive />
      <Footer />
    </div>
  );
};

export default SearchResult;
