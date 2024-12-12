import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import style from "./aboutPage.module.css"
import { IoMail } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useTranslation } from "react-i18next"


const Contack = () => { 
  const navigate=useNavigate()
  const {t}= useTranslation()

  return (
    <div className={style.contack_container}>
      <div className='container'>
        <h3 className={style.contack_title}>{t('aboutContackText')}</h3>
        <p className={style.AboutPage_goBack} onClick={()=>navigate(-1)}><MdOutlineKeyboardArrowLeft/>Go Back</p>   
             <p className={style.contack_text}>{t('rulePageRuleText11')}</p>
          <h3>{t('rulePageRuleText102')}</h3>
          <p>{t('rulePageRuleText103')}</p>
          <p>{t('rulePageRuleText104')}</p>
          <h3>{t('rulePageRuleText105')}</h3>
          <p>{t('rulePageRuleText106')}</p>
      </div>
    </div>
  )
}

export default Contack
