import React, { useEffect, useState } from "react";
import style from "./headerProfileCard.module.css";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";

const HeaderProfileCard = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the token
        const isExpired = decoded.exp * 1000 < Date.now(); // Check token expiration
        if (isExpired) {
          Swal.fire({
            icon: "warning",
            title: t("sessionExpired"),
            text: t("pleaseLoginAgain"),
            confirmButtonText: t("ok"),
          }).then(() => {
            localStorage.removeItem("authToken");
            navigate("/login");
          });
        } else {
          const savedUserName = localStorage.getItem("userName");
          setUserName(savedUserName || t("defaultUserName")); // Better fallback
        }
      } catch (error) {
        console.error("Token decode error:", error);
        Swal.fire({
          icon: "error",
          title: t("error"),
          text: t("sessionError"),
          confirmButtonText: t("ok"),
        }).then(() => {
          localStorage.removeItem("authToken");
          navigate("/login");
        });
      }
    } else {
      navigate("/login"); 
    }
  }, [navigate, t]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setUserName(null);
  };
  

  return (
    <div className={style.HeaderProfileCard}>
      <div className={style.headerProfileCardHead}>
        <RxAvatar className={style.headerProfileCardHead_icon} />
        <span>{userName}</span>
      </div>
      <div
        className={style.headerProfileCardtitle}
        onClick={() => navigate("/profil")}
      >
        {t("myAnnoucment")}
      </div>
      <div className={style.headerProfileCardtitle}>{t("myAccountUpper")}</div>
      <div
        className={style.headerProfileCardtitle}
        onClick={() => navigate("/likedPage")}
      >
        {t("mySelected")}
      </div>
      <div
        className={style.headerProfileCardtitle}
        onClick={handleLogout}
      >
        {t("logOut")}
      </div>
    </div>
  );
};

export default HeaderProfileCard;
