import React, { useEffect, useState } from "react";
import style from "./headerProfileCard.module.css";
import { RxAvatar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"

const HeaderProfileCard = () => {
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();
  const {t}= useTranslation()

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUserName(savedUserName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setUserName(null);
    navigate("/");
    window.location.reload();
  };
  

  return (
    <div className={style.HeaderProfileCard}>
      <div className={style.headerProfileCardHead}>
        <RxAvatar className={style.headerProfileCardHead_icon} />
        <span>{userName ? userName : "Lorem"}</span>
      </div>
      <div
        className={style.headerProfileCardtitle}
        onClick={() => navigate("/profil")}
      >
        {t('myAnnoucment')}
      </div>
      <div className={style.headerProfileCardtitle}>{t('myAccountUpper')}</div>
      <div
        className={style.headerProfileCardtitle}
        onClick={() => navigate("/likedPage")}
      >
        {t('mySelected')}
      </div>
      <div className={style.headerProfileCardtitle} onClick={handleLogout}>{t('logOut')}</div>
    </div>
  );
};

export default HeaderProfileCard;
