import React, { useState, useEffect } from "react";
import style from "./categoryProduct.module.scss";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { addLikedProduct } from "../../redux/likedSlice";
import { useDispatch } from "react-redux";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";

const CategoryProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [likedProducts, setLikedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [filterTitle, setFilterTitle] = useState("");
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterParams, setFilterParams] = useState({});

  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 8; // Number of items per page

  const { products = { items: [] }, category } = location.state || {};
  const items = products.items;

  useEffect(() => {
    const likedProductsFromStorage = localStorage.getItem("likedProducts");
    if (likedProductsFromStorage) {
      setLikedProducts(JSON.parse(likedProductsFromStorage));
    }
  }, []);

  useEffect(() => {
    if (category?.categoryId) {
      const fetchParameters = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=az&CategoryId=${category.categoryId}&RequestFrontType=add`
          );
          if (!response.ok) throw new Error("Failed to fetch parameters");
          const data = await response.json();
          setParameters(data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchParameters();
    }
  }, [category]);

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

    setLikedProducts(updatedLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
    dispatch(addLikedProduct(productItem));
  };

  const handleFilterChange = (paramName, value) =>
    setFilterParams((prevParams) => ({ ...prevParams, [paramName]: value }));

  const filterProducts = () => {
    let filteredItems = items;

    if (minPrice) filteredItems = filteredItems.filter((item) => item.price >= minPrice);
    if (maxPrice) filteredItems = filteredItems.filter((item) => item.price <= maxPrice);
    if (filterTitle)
      filteredItems = filteredItems.filter((item) =>
        item.productTitle.toLowerCase().includes(filterTitle.toLowerCase())
      );

    Object.keys(filterParams).forEach((param) => {
      if (filterParams[param]) {
        filteredItems = filteredItems.filter((item) =>
          item[param]?.toString().includes(filterParams[param])
        );
      }
    });

    return filteredItems;
  };

  const renderCategoryFilters = () => {
    if (loading) return <p>Loading filters...</p>;
    if (error) return <p>Error: {error}</p>;

    return parameters.map((param, index) => (
      <div key={index} className={style.categoryBoxFilterCard}>
        <label htmlFor={`param-${index}`} style={{ fontWeight: "bold" }}>
          {param.name}:
        </label>
        {param.parametrTypeId === 3 ? (
          <select
            id={`param-${index}`}
            onChange={(e) => handleFilterChange(param.parameterTitle, e.target.value)}
          >
            <option value="">Seçin</option>
            {param.options?.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : param.parametrTypeId === 2 ? (
          <input
            id={`param-${index}`}
            type="number"
            placeholder={`Məhsulun ${param.parameterTitle}-in daxil edin`}
            onChange={(e) => handleFilterChange(param.parameterTitle, e.target.value)}
            className={style.categoryPageInput}
          />
        ) : (
          <label className={style.categoryPageLabel}>
            <p>Başlıq:</p>
            <input
              id={`param-${index}`}
              type="text"
              placeholder={`Məhsulun ${param.parameterTitle}-in daxil edin`}
              onChange={(e) => handleFilterChange(param.parameterTitle, e.target.value)}
              className={style.categoryPageInput}
            />
          </label>
        )}
      </div>
    ));
  };

  const filteredItems = filterProducts();

  const paginatedItems = filteredItems.slice(
    pageIndex * pageSize,
    (pageIndex + 1) * pageSize
  );

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  return (
    <div className={style.CategoryProduct_container}>
      <Navbar />
      <img
        src="https://img.freepik.com/free-vector/gradient-sale-background_52683-62895.jpg"
        alt=""
        className={style.categoryBoxImg}
      />
      <div className="container">
        <div className={style.CategoryProductPage}>
          <div className={style.CategoryProduct_header}>
            <p>Elan-({filteredItems.length})</p>
            <div className={style.CategoryProduct_filterBox}>
              {renderCategoryFilters()}
              <label htmlFor="titleFilter" className={style.categoryPageLabel}>
                <p>Başlıq:</p>
                <input
                  id="titleFilter"
                  type="text"
                  placeholder="Məhsul Başlığını Filtrə et"
                  value={filterTitle}
                  onChange={(e) => setFilterTitle(e.target.value)}
                  className={style.categoryPageInput}
                />
              </label>
            </div>
          </div>

          <div className={style.CategoryProduct_simple}>
            <h2>Elanlar</h2>
            {paginatedItems.length > 0 ? (
              <div className={style.productsGrid}>
                {paginatedItems.map((item) => (
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
                      </div>
                    </Link>
                    <div className={style.productCard_info}>
                      <h3>{item.productTitle}</h3>
                      <p className={style.productCard_info_price}>
                        {item.price} AZN
                      </p>
                      <p className={style.productCard_info_category}>
                        {item.categoryName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products found</p>
            )}
            <div className={style.paginationContainer}>
              <button
                disabled={pageIndex === 0}
                onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              >
                Prev
              </button>
              <span>
                Page {pageIndex + 1} of {totalPages}
              </span>
              <button
                disabled={pageIndex === totalPages - 1}
                onClick={() => setPageIndex((prev) => Math.min(prev + 1, totalPages - 1))}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default CategoryProduct;
