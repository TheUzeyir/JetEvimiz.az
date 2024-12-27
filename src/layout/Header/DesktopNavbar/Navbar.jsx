import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import style from "./navbar.module.css";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import CategoryModal from "../Category-Modal/CategoryModal";

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

  const handleCityChange = (event) => setSelectedCity(event.target.value);

  const handleNewProductPageClick = () => {
    navigate(user ? "/yeniElan" : "/login");
  };

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) setUser({ username: savedUserName });
  }, []);

  const {
    data: cities = [],
    isLoading: citiesLoading,
    isError: citiesError,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await axios.get(
        "https://restartbaku-001-site3.htempurl.com/api/City/get-cities"
      );
      return response.data.data;
    },
    onError: () => setError("Şəhərləri alarkən xəta baş verdi."),
  });

  const {
    data: searchData = [],
    isFetching,
  } = useQuery({
    queryKey: ["searchData", input],
    queryFn: async () => {
      if (!input.trim()) return [];

      const [productResponse, categoryResponse] = await Promise.all([
        axios.get(
          "https://restartbaku-001-site3.htempurl.com/api/Product/get-all-products?LanguageCode=az"
        ),
        axios.get(
          "http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az"
        ),
      ]);

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

      return [
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
    },
    enabled: !!input.trim(), 
    onError: () => setError("Veriler alınırken bir hata oluştu."),
  });

  const handleItemClick = (item) => {
    const categoryId = item.categoryId || item.parentCategoryId;

    if (!categoryId) {
      console.error("CategoryId bulunamadı.");
      setError("Kategori ID bulunamadı.");
      return;
    }

    console.log("Selected Category ID:", categoryId);

    axios
      .get(
        `https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}`
      )
      .then((response) => {
        if (response.data && response.data.data && response.data.data.items) {
          const products = response.data.data.items;
          console.log("Fetched Products:", products);

          navigate("/searchresult-category", {
            state: {
              category: item,
              products,
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
          setError(
            `Sunucu hatası: ${error.response.status} - ${error.response.statusText}`
          );
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
            <p
              className={style.navbarBrand}
              onClick={() => navigate("/")}
            >
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
                {cities.map((city) => (
                  <option key={city.cityId} value={city.title}>
                    {city.title}
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
            </div>
            <button
              className={style.advertsBox_btn_new}
              onClick={handleNewProductPageClick}
            >
              <IoAddSharp />{" "}
              <span className={style.advertsBox_btn_new_text}>
                {t("newAnnouncement")}
              </span>
            </button>
            <FaBars
              className={style.bar_icon}
              onClick={() => navigate("/headerBox")}
            />
          </div>
          <input
            placeholder={t("searchInput")}
            type="text"
            className={style.searchInput_responsive}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </nav>
      {isModalOpen && <CategoryModal closeModal={closeModal} />}
      <div className={`container ${isFilterCardOpen ? "blur-background" : ""}`}>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        {searchData.length > 0 ? (
          <div className={style.nawBarSearchResultCategory}>
            {searchData.map((item, index) => (
              <div key={index}>
                {item.type === "category" ? (
                  <div>
                    {item.parentCategory ? (
                      <p
                        onClick={() => handleItemClick(item)}
                        className={style.nawBarSearchResultText_category}
                      >
                        {item.parentCategory} - {item.categoryTitle}
                      </p>
                    ) : (
                      <p
                        onClick={() => handleItemClick(item)}
                        className={style.nawBarSearchResultText_category}
                      >
                        {item.categoryTitle}
                      </p>
                    )}
                  </div>
                ) : (
                  <p
                    className={style.nawBarSearchResultText}
                    onClick={() => handleItemClick(item)}
                  >
                    {item.productTitle}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>{t("")}</p>
        )}
      </div>
    </>
  );
};

export default Navbar;
