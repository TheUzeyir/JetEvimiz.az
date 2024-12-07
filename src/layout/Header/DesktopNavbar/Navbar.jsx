import React, { useState, useEffect } from "react";
import { IoSearchSharp, IoAddSharp, IoFilter } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "./navbar.module.css";
import { useTranslation } from "react-i18next"
import CategoryModal from "../CategoryModal/CategoryModal";
import HeaderFilterCard from "../headerFilterCard/HeaderFilterCard";

const Navbar = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFilterCardOpen, setFilterCardOpen] = useState(false);
  const [input, setInput] = useState(""); 
  const [filterData, setFilterData] = useState([]); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const {t}= useTranslation()

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
    if (input.trim() === "") {
      setFilterData([]);
      return;
    }

    axios
      .get("http://restartbaku-001-site3.htempurl.com/api/Product/get-all-products")
      .then((response) => {
        console.log("API Response:", response.data);

        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data.items)
        ) {
          const filtered = response.data.data.items.filter((item) => {
            if (item.productTitle && item.productTitle.toLowerCase().includes(input.toLowerCase())) {
              return true;
            }
            return false;
          });
          setFilterData(filtered);
        } else {
          setError("Beklenmeyen bir veri yapısı alındı.");
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Ürünler alınırken bir hata oluştu.");
      });
  }, [input]); 

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
                  <option value="">--{t('chooseCity')}--</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <input
                  placeholder={t('searchInput')}
                  type="text"
                  className={style.searchInput}
                  value={input}
                  onChange={(e) => setInput(e.target.value)} // input her değiştiğinde
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
                <IoAddSharp /> {t('newAnnouncement')}
              </button>
              <button
                className={style.advertsBox_btn_filter}
                onClick={toggleFilterCard}
              >
                <IoFilter /> {t('filter')}
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
              <p key={index}>{item.productTitle}</p> 
            ))}
          </div>
        ) : (
          <p>{t('searchInputResult')}.</p>
        )}
      </div>
    </>
  );
};

export default Navbar;
