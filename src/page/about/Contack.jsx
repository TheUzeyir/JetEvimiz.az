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
        <h4 className={style.contack_subtitle}>{t('contackSupportText')}:</h4>
        <p className={style.contack_text}><FaPhoneAlt className={style.contack_icon}/> +994 77 613 59 59</p>
        <p className={style.contack_text}><FaPhoneAlt className={style.contack_icon}/> +994 70 613 59 59</p>
        <p className={style.contack_lineBox}></p>
        <p className={style.contack_subtitle}>{t('contackemailText')}</p>
        <p className={style.contack_text}><IoMail className={style.contack_icon}/> Info@JetEvimiz.com</p>
      </div>
    </div>
  )
}

export default Contack
