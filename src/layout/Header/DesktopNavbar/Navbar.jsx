import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAddSharp, IoFilter } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./navbar.module.css";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cities = ["Bakı", "Gəncə", "Sumqayıt", "Şəki", "Lənkəran"];

  const handleCityChange = (event) => setSelectedCity(event.target.value);

  const handleNewProductPageClick = () => {
    navigate(user ? "/yeniElan" : "/login");
  };

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) setUser({ username: savedUserName });
  }, []);

  useEffect(() => {
    if (input.trim() === "") {
      setFilterData([]);
      return;
    }

    const fetchProducts = axios.get(
      "https://restartbaku-001-site3.htempurl.com/api/Product/get-all-products?LanguageCode=az"
    );
    const fetchCategories = axios.get(
      "http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az"
    );

    Promise.all([fetchProducts, fetchCategories])
      .then(([productResponse, categoryResponse]) => {
        const products = productResponse.data.data.items || [];
        const categories = categoryResponse.data.data || [];

        const filteredProducts = products.filter((item) =>
          item.productTitle?.toLowerCase().includes(input.toLowerCase())
        );

        const filteredCategories = categories.filter((category) =>
          category.categoryTitle?.toLowerCase().includes(input.toLowerCase())
        );

        setFilterData([
          ...filteredProducts.map((product) => ({ ...product, type: "product" })),
          ...filteredCategories.map((category) => ({ ...category, type: "category" })),
        ]);
      })
      .catch(() => {
        setError("Veriler alınırken bir hata oluştu.");
      });
  }, [input]);

  const handleItemClick = (item) => {
    navigate("/searchResult", { state: { filteredProducts: filterData } });
  };

  return (
    <>
      <nav className={style.navbar}>
        <div className="container">
          <div className={style.navbar_container}>
            <p className={style.navbarBrand} onClick={() => navigate("/")}>
              JetEvimiz
            </p>
            <div className={style.inputGroup}>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className={style.navBar_selectBox}
              >
                <option value="">--{t("chooseCity")}--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <input
                placeholder={t("searchInput")}
                type="text"
                className={style.searchInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className={style.searchBtn}>
                <IoSearchSharp className={style.icon} />
              </button>
            </div>
            <button
              className={style.advertsBox_btn_new}
              onClick={handleNewProductPageClick}
            >
              <IoAddSharp /> {t("newAnnouncement")}
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {filterData.length > 0 ? (
          <div>
            {filterData.map((item, index) => (
              <p
                key={index}
                onClick={() => handleItemClick(item)}
                style={{ cursor: "pointer" }}
              >
                {item.type === "product"
                  ? item.productTitle
                  : item.categoryTitle}
              </p>
            ))}
          </div>
        ) : (
          <p>{t("searchInputResult")}.</p>
        )}
      </div>
    </>
  );
};

export default Navbar;
