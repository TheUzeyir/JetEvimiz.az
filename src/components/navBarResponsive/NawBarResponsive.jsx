import React,{useState,useEffect}from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import { FaHeart, FaCartShopping } from "react-icons/fa6";
import { IoMdPerson } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import style from "./nawBarResponsive.module.css"
import { FaEarthOceania } from "react-icons/fa6";
import { useTranslation } from "react-i18next"; 
import { useQuery } from "@tanstack/react-query";

const NawBarResponsive = () => {
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language); 

  const fetchLanguages = async () => {
    const response = await fetch(
      "https://restartbaku-001-site3.htempurl.com/api/Language/get-all-languages"
    );
    const data = await response.json();
    if (!response.ok || !data.isSuccessful) {
      throw new Error(data.message || "Dil siyahısını çəkmək mümkün olmadı.");
    }
    return data.data;
  };

  const {
    data: languages = [],
    isLoading: isLanguagesLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["languages"],
    queryFn: fetchLanguages,
  });

  useEffect(() => {
    const savedUserName = localStorage.getItem("userName");
    if (savedUserName) {
      setUser(savedUserName);
    }
    setLoading(false);
  }, []);

  const handleLoginClick = () => {
    if (user) {
      navigate("/profil");
    } else {
      navigate("/login");
    }
  };

  const handleLanguageChange = (event) => {
    const selectedLang = event.target.value;
    setSelectedLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className={style.nawBar_responsive}>
        <div className={style.nawBar_responsive_header}>
            <span>JetEvimiz</span>
            <IoMdCloseCircle className={style.nawBar_responsive_header_icon} onClick={()=>navigate(-1)}/>
        </div>
        <div className={style.nawBar_responsive_main}>
            <div className={style.nawBar_responsive_main_box} onClick={handleLoginClick}>
                <IoMdPerson /> {
                    loading
                    ? "Yukleniyor..."
                    : user
                    ? `${user}`
                    :"Giriş"
                } 
            </div>
            <div className={style.nawBar_responsive_main_box} onClick={() => navigate('/likedPage')}>
                <FaHeart /> {t('NawBarResponsiveLiked')}
            </div>
            <div className={style.nawBar_responsive_main_box}>
                <FaCartShopping /> {t('NawBarResponsivePacked')}
            </div>
            <p className={style.emptyBox}></p>
            <div className={style.nawBar_langBox}><FaEarthOceania/>{t('NawBarResponsiveLang')}</div>
            <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className={style.languageSelect}
        >
          {languages.map((language) => (
            <option key={language.languageId} value={language.languageCode}>
              {language.languageName}
            </option>
          ))}
        </select>
            <p className={style.emptyBox}></p>
            <div className={style.nawBar_responsive_main_box} onClick={()=>navigate('/info')}>{t('NawBarResponsiveInfo')}</div>
            <div className={style.nawBar_responsive_main_box} onClick={()=>navigate('/contack')}>{t('NawBarResponsiveContack')}</div>
            <div className={style.nawBar_responsive_main_box} onClick={()=>navigate('/rules')}>{t('NawBarResponsiveRules')}</div> 
            <div className={style.nawBar_responsive_main_box} onClick={()=>navigate('/termcondition')}>{t('NawBarResponsiveTermCond')}</div> 
            <div className={style.nawBar_responsive_main_box} onClick={()=>navigate('/faq')}>{t('NawBarResponsiveFaq')}</div> 
        </div>
    </div>
  )
}

export default NawBarResponsive
