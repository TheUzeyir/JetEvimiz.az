import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAddSharp, IoFilter } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import CategoryModal from "../Category-Modal/CategoryModal";
import HeaderFilterCard from "../headerFilterCard/HeaderFilterCard";
import { useDebounce } from "use-debounce";

import style from "./navbar.module.css";

const Navbar = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFilterCardOpen, setFilterCardOpen] = useState(false);
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 500); // Debounce input for 500ms
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const navigate = useNavigate();
  const cities = ["Bakı", "Gəncə", "Sumqayıt", "Şəki", "Lənkəran"];

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const toggleFilterCard = () => setFilterCardOpen((prev) => !prev);

  const handleNewProductPageClick = () => {
    if (user) {
      navigate("/yeniElan");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUser({ username: savedUserName });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (debouncedInput.trim() === "") {
      setFilterData([]);
      return;
    }
  
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse] = await Promise.all([
          axios.get("https://restartbaku-001-site3.htempurl.com/api/Product/search?additionalProp1=string&additionalProp2=string&additionalProp3=string"),
          axios.get("http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az")
        ]);
  
        const filteredProducts = productResponse.data.data.items.filter(item =>
          item.productTitle.toLowerCase().includes(debouncedInput.toLowerCase())
        );
  
        const filteredCategories = categoryResponse.data.data.filter(category =>
          category.categoryTitle.toLowerCase().includes(debouncedInput.toLowerCase())
        );
  
        const combinedData = [
          ...filteredProducts.map(item => ({ title: item.productTitle, type: "product", slug: item.slug })),
          ...filteredCategories.map(category => ({ title: category.categoryTitle, type: "category", slug: category.slug }))
        ];
  
        setFilterData(combinedData);
  
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Veriler alınırken bir hata oluştu.");
      }
    };
  
    fetchData();
  }, [debouncedInput]);
  

  const handleCategoryClick = async (categoryId) => {
    setLoading(true);
  
    try {
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}`
      );
      const result = await response.json();
  
      const category = categories.find(
        (cat) =>
          cat.categoryId === categoryId ||
          (cat.childCategories || []).some((child) => child.categoryId === categoryId)
      );
  
      const selectedSubCategory = category?.childCategories?.find(
        (child) => child.categoryId === categoryId
      );
  
      navigate("/CategoryProduct", {
        state: {
          products: result.data,
          category,
          selectedSubCategory,
        }
      });
    } catch (error) {
      console.error("Seçilen kategoriye ait veriler alınamadı:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleProductClick = (item) => {
    if (item.type === "category") {
      navigate("/CategoryProduct", { state: { category: item } });
    } else {
      navigate(`/product-details/${item.slug}`);
    }
  };
  

  return (
    <>
      <nav className={style.navbar}>
        <div className="container">
          <div className={style.navbar_container}>
            <p className={style.navbarBrand} onClick={() => navigate("/")}>
              JetEvimiz
            </p>
            <div className={style.offcanvasBody}>
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
            </div>
            <div className={style.advertsBox}>
              <button
                className={style.advertsBox_btn_new}
                onClick={handleNewProductPageClick}
              >
                <IoAddSharp /> {t("newAnnouncement")}
              </button>
              <button
                className={style.advertsBox_btn_filter}
                onClick={toggleFilterCard}
              >
                <IoFilter /> {t("filter")}
              </button>
            </div>
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
              <p
                key={index}
                onClick={() => handleProductClick(item)}
                style={{ cursor: "pointer" }}
              >
                {item.title}
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
