import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import style from "./searchResult.module.css";
import { FaHeart } from "react-icons/fa";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { addLikedProduct } from "../../redux/likedSlice";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import Footer from "../../layout/footer/Footer"
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive"
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop"

const SearchResult = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likedProducts.items);
  const [products, setProducts] = useState([]);
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    // Check if there's category data passed from the previous page
    if (location.state && location.state.categoryData) {
      setCategoryData(location.state.categoryData);
    }

    // If filtered products are passed, set them
    if (location.state && location.state.filteredProducts) {
      setProducts(location.state.filteredProducts);
    } else {
      setProducts([]);
    }
  }, [location.state]);

  const toggleLiked = (productItem) => {
    const savedUserName = localStorage.getItem("userName");
    if (!savedUserName) {
      alert("Bəyənmək üçün giriş etməlisiniz.");
      return;
    }

    const isLiked = likedProducts.some(
      (likedProduct) => likedProduct.productId === productItem.productId
    );

    dispatch(addLikedProduct(productItem));
  };

  const handleCategoryClick = (category) => {
    // Navigate to the child category details page or show the category's products
    console.log("Category clicked:", category);
  };

  return (
    <div className={style.searchResultContainer}>
      <HeaderTop />
      <Navbar />
      <div className="container">
        <h2>Axtarış Nəticələri</h2>

        {/* Display Category Data if available */}
        {categoryData && (
          <div className={style.categorySection}>
            <h3>{categoryData.categoryTitle}</h3>
            {categoryData.childCategories && categoryData.childCategories.length > 0 && (
              <ul>
                {categoryData.childCategories.map((child, idx) => (
                  <li key={idx} onClick={() => handleCategoryClick(child)} style={{ cursor: "pointer" }}>
                    {child.categoryTitle}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Display Filtered Products */}
        <div className={style.productCard_container}>
          {products.length ? (
            products.map((item) => (
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
            ))
          ) : (
            <p>Nəticə tapılmadı.</p>
          )}
        </div>
      </div>
      <FooterResponsive />
      <Footer />
    </div>
  );
};

export default SearchResult;
