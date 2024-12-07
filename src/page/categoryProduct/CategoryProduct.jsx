import React, { useState, useEffect } from 'react';
import style from "./categoryProduct.module.scss";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BsFillHeartFill, BsShop } from "react-icons/bs";
import { IoCalendarNumber } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { addLikedProduct } from "../../redux/likedSlice";
import { useDispatch } from "react-redux";
import Navbar from '../../layout/Header/DesktopNavbar/Navbar';
import Footer from "../../layout/footer/Footer";

const CategoryProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [likedProducts, setLikedProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { products, category, selectedSubCategory } = location.state || { products: { items: [] }, category: null, selectedSubCategory: null };
  const items = products.items || [];

  useEffect(() => {
    const likedProductsFromStorage = localStorage.getItem("likedProducts");
    if (likedProductsFromStorage) {
      setLikedProducts(JSON.parse(likedProductsFromStorage));
    }
  }, []);

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
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    if (category) console.log('Açılan Kategori Bilgisi:', category);
    if (selectedSubCategory) console.log('Seçilen Alt Kategori Bilgisi:', selectedSubCategory);
    if (products) console.log('Kategoriye Ait Ürünler:', products);
  }, [category, selectedSubCategory, products]);

  return (
    <div className={style.CategoryProduct_container}>
      <Navbar />
      <img src="https://img.freepik.com/free-vector/gradient-sale-background_52683-62895.jpg" alt="" className={style.m} />
      <div className="container">
        {/* Kategori Bilgileri */}
        <div className={style.CategoryProduct_header}>
          <div>
            {category ? (
              <>
                <h3>Ana Kategori:</h3>
                {Object.entries(category)
                  .filter(([key, value]) => key !== 'categoryId' && (typeof value === 'string' || typeof value === 'number'))
                  .map(([key, value]) => (
                    <div key={key} style={{ marginBottom: '10px' }}>
                      <label htmlFor={key} style={{ marginRight: '10px', fontWeight: 'bold' }}>
                        {key}:
                      </label>
                      <input
                        id={key}
                        type={typeof value === 'number' ? 'number' : 'text'}
                        defaultValue={value}
                        style={{ padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
                      />
                    </div>
                  ))}

                {/* Alt Kategori */}
                {selectedSubCategory && (
                  <>
                    <h3>Seçili Alt Kategori:</h3>
                    {Object.entries(selectedSubCategory)
                      .filter(([key, value]) => key !== 'categoryId' && (typeof value === 'string' || typeof value === 'number'))
                      .map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '10px' }}>
                          <label
                            htmlFor={`child-${key}`}
                            style={{ marginRight: '10px', fontWeight: 'bold' }}
                          >
                            {key}:
                          </label>
                          <input
                            id={`child-${key}`}
                            type={typeof value === 'number' ? 'number' : 'text'}
                            defaultValue={value}
                            style={{
                              padding: '5px',
                              borderRadius: '5px',
                              border: '1px solid #ccc',
                            }}
                          />
                        </div>
                      ))}
                  </>
                )}
              </>
            ) : (
              <p>Kategori Seçilmedi</p>
            )}
          </div>

          <p>Elan-({items.length})</p>
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
                    placeholder="Min Fiyat"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                  />
                  <span>-</span>
                  <input
                    type="text"
                    placeholder="Max Fiyat"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                  />
                </div>
              )}
            </div>
            <span>Marka ▼</span>
          </div>
        </div>

        {/* Ürünler */}
        <div className={style.CategoryProduct_simple}>
          <h2>Elanlar</h2>
          {items.length > 0 ? (
            <div className={style.productsGrid}>
              {items.map((item) => (
                <div className={style.productCard} key={item.productId}>
                  <Link to={`/product-details/${item.productId}`}>
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
                        <IoCalendarNumber /> {item.daysOnSale} Gün
                      </div>
                    </div>
                    <p className={style.productCard_subTitle}>{item.productTitle}</p>
                    <p className={style.productCard_text}>Şehir: {item.city}</p>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>Elan Yoxdur</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default CategoryProduct;
