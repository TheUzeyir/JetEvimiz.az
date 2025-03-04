import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaRegHeart } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import style from "../header.module.css";
import HeaderProfileCard from "../headerProfileCard/HeaderProfileCard";
import axios from 'axios';
import { useTranslation } from "react-i18next";
 
export default function HeaderTop() {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileCardOpen, setProfileCardOpen] = useState(false);
  const profileCardRef = useRef(null);

  const openProfileCard = () => setProfileCardOpen(true);
  const closeProfileCard = () => setProfileCardOpen(false);

  const handleLoginClick = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          Swal.fire({
            icon: "warning",
            title: "Oturum Süresi Doldu",
            text: "Oturumunuzun süresi dolduğu için yeniden giriş yapmanız gerekiyor.",
            confirmButtonText: "Tamam",
          }).then(() => {
            localStorage.removeItem("authToken");
            navigate("/login");
          });
        } else {
          openProfileCard();
        }
      } catch (error) {
        console.error("Token decode hatası:", error);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  };

  const handleLikedPageClick = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          Swal.fire({
            icon: "warning",
            title: "Oturum Süresi Doldu",
            text: "Oturumunuzun süresi dolduğu için yeniden giriş yapmanız gerekiyor.",
            confirmButtonText: "Tamam",
          }).then(() => {
            localStorage.removeItem("authToken");
            navigate("/login");
          });
        } else {
          navigate("/likedPage");
        }
      } catch (error) {
        console.error("Token decode hatası:", error);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
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
    const handleClickOutside = (event) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target)
      ) {
        closeProfileCard();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    axios.get('https://restartbaku-001-site3.htempurl.com/api/Language/get-all-languages')
      .then(response => {
        if (response.data.isSuccessful) {
          setLanguages(response.data.data);
        } else {
          console.error('API başarısız:', response.data.message);
        }
      })
      .catch(error => console.error('API hatası:', error));
  }, []);

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang); 
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className={style.headerTop}>
      <div className="container">
        <div className={style.headerTop_container}>
          <div className={style.contactNum}>
            <p>{t("support")}: (077) 613-59-59</p>
          </div>
          <div className={style.headerTop_container_right}>
            <select
              className={style.headerTop_container_right_langBox}
              value={selectedLanguage}
              onChange={handleLanguageChange}
            >
              {languages.map((language) => (
                <option key={language.languageId} value={language.languageCode}>
                  {language.languageName}
                </option>
              ))}
            </select>
            <a
              className={style.headerTop_container_right_item}
              onClick={handleLikedPageClick}
            >
              <FaRegHeart className={style.headerTop_container_right_icon} />
              <span>{user ? t("favorite") : t("favorite")}</span>
            </a>
            <a
              className={style.headerTop_container_right_item}
              onClick={handleLoginClick}
            >
              <FaUser className={style.headerTop_container_right_icon} />
              <span>
              <span>{user ? t("") : t("login")}</span>
              </span>
            </a>
          </div>
        </div>
      </div>
      {isProfileCardOpen && (
        <div
          ref={profileCardRef}
          onClick={(e) => e.stopPropagation()}
        >
          <HeaderProfileCard />
        </div>
      )}
    </div>
  );
}