import React from 'react'
import style from "./aboutPage.module.css"
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useTranslation } from "react-i18next"


const Info = () => {
  const navigate=useNavigate()
  const {t}= useTranslation() 

  return (
    <div className={style.Info_container}>
      <div className="container">
      <div className={style.aboutPage_main}>
        <h3 className={style.aboutPage_main_title}>{t('infoInfoText')} </h3>
        <p className={style.AboutPage_goBack} onClick={()=>navigate(-1)}><MdOutlineKeyboardArrowLeft/>Go Back</p>
        <p className={style.aboutPage_main_subtitle}>{t('infoRuleText1')}</p>
        <p className={style.aboutPage_main_subtitle}>{t('infoRuleText2')}      </p>
        <p className={style.aboutPage_main_subtitle}>{t('infoRuleText3')}   </p>
        <p className={style.aboutPage_main_subtitle}>{t('infoRuleText4')}</p>
        <h3 className={style.aboutPage_main_title}>{t('infoRuleText5')}</h3>
        <p className={style.aboutPage_main_subtitle}>{t('infoRuleText6')}</p>
      </div>
    </div>
    </div>
  )
}

export default Info
