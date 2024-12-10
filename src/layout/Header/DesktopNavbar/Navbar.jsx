import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./navbar.module.css";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import CategoryModal from "../Category-Modal/CategoryModal"
import HeaderFilterCard from "../headerFilterCard/HeaderFilterCard";

const Navbar = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState(null);
  const [isFilterCardOpen, setFilterCardOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [expandedCategoryId, setExpandedCategoryId] = useState(null); // State for managing expanded categories
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

        const allFilteredData = [
          ...filteredProducts.map((product) => ({ ...product, type: "product" })),
          ...filteredCategories.map((category) => ({
            ...category,
            type: "category",
            hasChildren: category.childCategories && category.childCategories.length > 0,
          })),
        ];

        console.log("Filtered Data:", allFilteredData); // Log the filtered data 

        setFilterData(allFilteredData);
      })
      .catch(() => {
        setError("Veriler alınırken bir hata oluştu.");
      });
  }, [input]);

  const handleItemClick = (item) => {
    if (item.type === "category" && item.hasChildren) {
      // Navigate to search result page with parent and child categories
      navigate("/searchResult", { state: { categoryData: item } });
    } else {
      // For product or individual category click, navigate to the search results page
      navigate("/searchResult", { state: { filteredProducts: filterData } });
    }
  };
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <nav className={style.navbar}>
        <div className="container">
          <div className={style.navbar_container}>
            <p className={style.navbarBrand} onClick={() => navigate("/")}>
              JetEvimiz
            </p>
            <div className={style.categoryBox} onClick={openModal}>
                {t("category")}
              </div>
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
            <FaBars
              className={style.bar_icon}
              onClick={() => navigate("/headerBox")}
            />
          </div>
        </div>
      </nav>
      {isFilterCardOpen && <HeaderFilterCard isFilterCardOpen={isFilterCardOpen} />}
      {isModalOpen && <CategoryModal closeModal={closeModal} />}
      <div className="container">
        {error && <p style={{ color: "red" }}>{error}</p>}
        {filterData.length > 0 ? (
          <div>
            {filterData.map((item, index) => (
              <div key={index}>
                {item.type === "category" ? (
                  <div>
                    <p
                      onClick={() => handleItemClick(item)}
                      style={{ cursor: "pointer", fontWeight: "bold" }}
                    >
                      {item.categoryTitle}
                    </p>
                    {expandedCategoryId === item.categoryId &&
                      item.childCategories &&
                      item.childCategories.length > 0 && (
                        <ul>
                          {item.childCategories.map((child, idx) => (
                            <li key={idx} onClick={() => handleItemClick(child)}>
                              {child.categoryTitle}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                ) : (
                  <p
                    onClick={() => handleItemClick(item)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.productTitle}
                  </p>
                )}
              </div>
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
