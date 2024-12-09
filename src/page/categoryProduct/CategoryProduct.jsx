import React, { useState, useEffect } from "react";
import style from "./categoryProduct.module.scss";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { addLikedProduct } from "../../redux/likedSlice";
import { useDispatch } from "react-redux";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar";
import Footer from "../../layout/footer/Footer";

const CategoryProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [likedProducts, setLikedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");
  const [parameters, setParameters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterParams, setFilterParams] = useState({});

  const {
    products = { items: [] },
    category = null,
    selectedSubCategory = null,
  } = location.state || {};

  const items = products.items;

  useEffect(() => {
    const likedProductsFromStorage = localStorage.getItem("likedProducts");
    if (likedProductsFromStorage) {
      setLikedProducts(JSON.parse(likedProductsFromStorage));
    }
  }, []);

  useEffect(() => {
    if (category && category.categoryId) {
      const fetchParameters = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=az&CategoryId=${category.categoryId}&RequestFrontType=add`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch parameters");
          }
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

    let updatedLikedProducts;
    if (isLiked) {
      updatedLikedProducts = likedProducts.filter(
        (likedProduct) => likedProduct.productId !== productItem.productId
      );
    } else {
      updatedLikedProducts = [...likedProducts, productItem];
    }

    setLikedProducts(updatedLikedProducts);
    localStorage.setItem("likedProducts", JSON.stringify(updatedLikedProducts));
    dispatch(addLikedProduct(productItem));
  };

  const handleMinPriceChange = (e) => setMinPrice(e.target.value);
  const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);
  const handleTitleChange = (e) => setFilterTitle(e.target.value);
  const handleFilterChange = (paramName, value) => {
    setFilterParams((prevParams) => ({
      ...prevParams,
      [paramName]: value,
    }));
  };

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const filterProducts = () => {
    let filteredItems = items;

    if (minPrice) {
      filteredItems = filteredItems.filter((item) => item.price >= minPrice);
    }
    if (maxPrice) {
      filteredItems = filteredItems.filter((item) => item.price <= maxPrice);
    }

    if (filterTitle) {
      filteredItems = filteredItems.filter((item) =>
        item.productTitle.toLowerCase().includes(filterTitle.toLowerCase())
      );
    }

    Object.keys(filterParams).forEach((param) => {
      const paramValue = filterParams[param];
      if (paramValue) {
        filteredItems = filteredItems.filter((item) =>
          item[param] && item[param].toString().includes(paramValue)
        );
      }
    });

    return filteredItems;
  };

  const renderCategoryFilters = () => {
    if (loading) return <p>Loading filters...</p>;
    if (error) return <p>Error: {error}</p>;

    return parameters.map((param, index) => {
      if (param.parametrTypeId === 1) {
        return (
          <div key={index}>
            <label htmlFor={`param-${index}`} style={{ fontWeight: "bold" }}>
              {param.name}:
            </label>
            <input
              id={`param-${index}`}
              type="text"
              placeholder={`Daxil edin ${param.name}`}
              onChange={(e) =>
                handleFilterChange(param.name, e.target.value)
              }
            />
          </div>
        );
      } else if (param.parametrTypeId === 2) {
        return (
          <div key={index}>
            <label htmlFor={`param-${index}`} style={{ fontWeight: "bold" }}>
              {param.name}:
            </label>
            <input
              id={`param-${index}`}
              type="number"
              placeholder={`Daxil edin ${param.name}`}
              onChange={(e) =>
                handleFilterChange(param.name, e.target.value)
              }
            />
          </div>
        );
      } else if (param.parametrTypeId === 3) {
        return (
          <div key={index}>
            <label htmlFor={`param-${index}`} style={{ fontWeight: "bold" }}>
              {param.name}:
            </label>
            <select
              id={`param-${index}`}
              onChange={(e) => handleFilterChange(param.name, e.target.value)}
            >
              <option value="">Seçin</option>
              {param.options &&
                param.options.map((option, i) => (
                  <option key={i} value={option.value}>
                    {option.label}
                  </option>
                ))}
            </select>
          </div>
        );
      }
      return null;
    });
  };

  const filteredItems = filterProducts();

  return (
    <div className={style.CategoryProduct_container}>
      <Navbar />
      <img
        src="https://img.freepik.com/free-vector/gradient-sale-background_52683-62895.jpg"
        alt=""
        className={style.m}
      />
      <div className="container">
        <div className={style.CategoryProduct_header}>
          <div>
            {category ? <></> : <p>Kategori Seçilmedi</p>}
          </div>
          <p>Elan-({filteredItems.length})</p>
          <div className={style.CategoryProduct_filterBox}>
            <div className={style.priceRangeContainer}>
              <div onClick={toggleVisibility}>
                <span>Qiymət</span>
                <span className={style.arrow}>{isVisible ? "▲" : "▼"}</span>
              </div>
              {isVisible && (
                <div className={style.inputsContainer}>
                  <input
                    type="text"
                    placeholder="Minimum Qiymət"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                  <span>-</span>
                  <input
                    type="text"
                    placeholder="Maksimum Qiymət"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              )}
            </div>
            {renderCategoryFilters()}
            <div>
              <label htmlFor="titleFilter" style={{ fontWeight: "bold" }}>
                Başlıq:
              </label>
              <input
                id="titleFilter"
                type="text"
                placeholder="Məhsul Başlığını Filtrə et"
                value={filterTitle}
                onChange={handleTitleChange}
                style={{
                  padding: "5px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>
        </div>

        <div className={style.CategoryProduct_simple}>
          <h2>Elanlar</h2>
          {filteredItems.length > 0 ? (
            <div className={style.productsGrid}>
              {filteredItems.map((item) => (
                <div className={style.productCard} key={item.productId}>
                  <Link to={`/product-details/${item.slug}`}>
                    <div className={style.productCard_imgBox}>
                      <img
                        src={item.coverImage}
                        alt={item.productTitle}
                        className={style.productCard_imgBox_img}
                      />
                      {likedProducts.some(
                        (likedProduct) =>
                          likedProduct.productId === item.productId
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryProduct;
