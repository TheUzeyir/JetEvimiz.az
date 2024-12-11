import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./navbar.module.css";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import CategoryModal from "../Category-Modal/CategoryModal";
import HeaderFilterCard from "../headerFilterCard/HeaderFilterCard";

const Navbar = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [input, setInput] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [user, setUser] = useState(null);
  const [isFilterCardOpen, setFilterCardOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
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

        const filteredCategories = categories.filter((category) => {
          const categoryMatch = category.categoryTitle?.toLowerCase().includes(input.toLowerCase());

          const childCategoryMatch = category.childCategories?.some((child) =>
            child.categoryTitle?.toLowerCase().includes(input.toLowerCase())
          );

          return categoryMatch || childCategoryMatch;
        });

        const allFilteredData = [
          ...filteredProducts.map((product) => ({ ...product, type: "product" })),
          ...filteredCategories.flatMap((category) => {
            const matchedItems = [
              { ...category, type: "category", hasChildren: category.childCategories.length > 0 }
            ];

            const matchedChildren = category.childCategories
              .filter((child) => child.categoryTitle.toLowerCase().includes(input.toLowerCase()))
              .map((child) => ({
                ...child,
                type: "category",
                parentCategory: category.categoryTitle
              }));

            return [...matchedItems, ...matchedChildren];
          }),
        ];

        setFilterData(allFilteredData);
      })
      .catch(() => {
        setError("Veriler alınırken bir hata oluştu.");
      });
  }, [input]);

  const handleItemClick = (item) => {
    const categoryId = item.categoryId || item.parentCategoryId;
  
    if (!categoryId) {
      console.error("CategoryId bulunamadı.");
      setError("Kategori ID bulunamadı.");
      return;
    }
  
    console.log("Selected Category ID:", categoryId);
  
    axios
      .get(`https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}`)
      .then((response) => {
        if (response.data && response.data.data && response.data.data.items) {
          const products = response.data.data.items;
          console.log("Fetched Products:", products);
  
          // Yönlendirme ve veri aktarma
          navigate("/k", {
            state: {
              category: item, // Tıklanan kategori
              products, // Gelen ürünler
            },
          });
        } else {
          console.error("Beklenmeyen API yanıtı:", response);
          setError("API'den beklenmeyen bir yanıt alındı.");
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
        if (error.response) {
          setError(`Sunucu hatası: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          setError("Sunucuya ulaşılamıyor. Lütfen ağ bağlantınızı kontrol edin.");
        } else {
          setError("Bilinmeyen bir hata oluştu.");
        }
      });
  };
  

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <nav className={style.navbar}>
        <div className="container">
          <div className={style.navbar_container}>
            <p className={style.navbarBrand} onClick={() => navigate("/")}>JetEvimiz</p>
            <div className={style.categoryBox} onClick={openModal}>{t("category")}</div>
            <div className={style.inputGroup}>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className={style.navBar_selectBox}
              >
                <option value="">--{t("chooseCity")}--</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>{city}</option>
                ))}
              </select>
              <input
                placeholder={t("searchInput")}
                type="text"
                className={style.searchInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button className={style.searchBtn}><IoSearchSharp className={style.icon} /></button>
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
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        {filterData.length > 0 ? (
          <div>
            {filterData.map((item, index) => (
              <div key={index}>
                {item.type === "category" ? (
                  <div>
                    {item.parentCategory ? (
                      <p
                        onClick={() => handleItemClick(item)}
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                      >
                        {item.parentCategory} - {item.categoryTitle}
                      </p>
                    ) : (
                      <p
                        onClick={() => handleItemClick(item)}
                        style={{ cursor: "pointer", fontWeight: "bold" }}
                      >
                        {item.categoryTitle}
                      </p>
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
