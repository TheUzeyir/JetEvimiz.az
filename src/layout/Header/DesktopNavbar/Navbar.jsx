import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import style from "./navbar.module.css";
import { FaBars } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import CategoryModal from "../Category-Modal/CategoryModal";
import logoIMg from "../../../img/logo.png";
import { BiSolidCategory } from "react-icons/bi";

const Navbar = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [input, setInput] = useState("");
  const [user, setUser] = useState(null);
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

  const groupedCities = cities.reduce(
    (acc, city) => {
      if (city.orderWeight === 0) {
        acc.azerbaijan.push(city);
      } else if (city.orderWeight === 1) {
        acc.turkey.push(city);
      }
      return acc;
    },
    { azerbaijan: [], turkey: [] }
  );

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

      const filteredCategories = categories.flatMap((category) => {
        const categoryMatch = category.categoryTitle
          ?.toLowerCase()
          .includes(input.toLowerCase());
        const childMatches = category.childCategories?.filter((child) =>
          child.categoryTitle?.toLowerCase().includes(input.toLowerCase())
        );

        const matchedItems = categoryMatch
          ? [{ ...category, type: "category", hasChildren: !!childMatches?.length }]
          : [];

        const matchedChildren =
          childMatches?.map((child) => ({
            ...child,
            type: "category",
            parentCategory: category.categoryTitle,
          })) || [];

        return [...matchedItems, ...matchedChildren];
      });

      return [
        ...filteredProducts.map((product) => ({ ...product, type: "product" })),
        ...filteredCategories,
      ];
    },
    enabled: !!input.trim(),
    onError: () => setError("Veriler alınırken bir hata oluştu."),
  });

  const handleItemClick = (item) => {
    const categoryId = item.categoryId || item.parentCategoryId;

    if (!categoryId) {
      setError("Kategori ID bulunamadı.");
      return;
    }

    axios
      .get(
        `https://restartbaku-001-site3.htempurl.com/api/Product/search?CategoryId=${categoryId}`
      )
      .then((response) => {
        if (response.data?.data?.items) {
          const products = response.data.data.items;
          navigate("/searchresult-category", {
            state: {
              category: item,
              products,
            },
          });
        } else {
          setError("API'den beklenmeyen bir yanıt alındı.");
        }
      })
      .catch((error) => {
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
            <img
              className={style.navbarBrand}
              onClick={() => navigate("/")}
              src={logoIMg}
              alt=""
            />
            <div className={style.categoryBox} onClick={openModal}>
              <BiSolidCategory />
            </div>
            <div className={style.inputGroup}>
              <select
                value={selectedCity}
                onChange={handleCityChange}
                className={style.navBar_selectBox}
              >
                <option value="">--{t("chooseCity")}--</option>
                <optgroup label="Azərbaycan">
                  {groupedCities.azerbaijan.map((city) => (
                    <option key={city.cityId} value={city.title}>
                      {city.title}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Türkiyə">
                  {groupedCities.turkey.map((city) => (
                    <option key={city.cityId} value={city.title}>
                      {city.title}
                    </option>
                  ))}
                </optgroup>
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
              <IoAddSharp />
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
      <div
        className={`${style.nawBarSearchResultCategory_container} ${
          searchData.length > 0 ? style.shadowEffect : ""
        }`}
      >
        <div className={`container ${isFetching ? style.backgroundshadow : ""}`}>
          {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
          {searchData.length > 0 ? (
            <div className={style.nawBarSearchResultCategory}>
              {searchData.map((item, index) => (
                <div key={index}>
                  {item.type === "category" ? (
                    <p
                      onClick={() => handleItemClick(item)}
                      className={style.nawBarSearchResultText_category}
                    >
                      {item.parentCategory
                        ? `${item.parentCategory} - ${item.categoryTitle}`
                        : item.categoryTitle}
                    </p>
                  ) : (
                    <p
                      onClick={() => handleItemClick(item)}
                      className={style.nawBarSearchResultText}
                    >
                      {item.productTitle}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            null
          )}
        </div>
      </div>
      {isModalOpen && <CategoryModal closeModal={closeModal} />}
    </>
  );
};

export default Navbar;
