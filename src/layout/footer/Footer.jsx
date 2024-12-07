import React, { useState } from 'react'
import style from "./footer.module.css"
import { FaFacebook,FaPinterest } from "react-icons/fa";
import { FaXTwitter,FaInstagram } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"

const Footer = () => {
  const navigate=useNavigate()
  const {t}= useTranslation()

    const[email,setEmail]=useState('')
    const handleClickEmail=(e)=>{
      setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Submitted email:", email);
  };
  return (
      <div className={style.footer}>
      <div className={style.footerMain}>
        <div className={style.footerMain_infoBox}>
            <p className={style.footerMain_infoBox_title}>{t('footerMission')}</p>
            <p className={style.footerMain_infoBox_mainText}>{t('footerMainText')}</p>
            <em className={style.footerMain_infoBox_mainText}>{t('footeraboutText')}</em>
        </div>
        <div className={style.footerMain_Link}>
            <p className={style.footerMain_title}>{t('footerStoreText')}</p>
            <ul className={style.footerMain_Link_ul}>
                <a href="" className={style.footerMain_Link_ul_links} >{t('footerproductNoteBook')}</a>
                <a href="" className={style.footerMain_Link_ul_links}>PC</a>
                <a href="" className={style.footerMain_Link_ul_links} >{t('footerCompPartText')}</a>
                <a href="" className={style.footerMain_Link_ul_links}>{t('footerproductHeadset')}</a>
                <a href="" className={style.footerMain_Link_ul_links}>{t('footerproductAcsesories')}</a>
            </ul>
        </div>
        <div className={style.footerMain_Link}>
            <p className={style.footerMain_title}>{t('footerproductInfoText')}</p>
            <ul className={style.footerMain_Link_ul}>
                <a href="" className={style.footerMain_Link_ul_links}>{t('footerSearchText')}</a>
                <a href="" className={style.footerMain_Link_ul_links}>{t('footerContackText')}</a>
                <a href="" className={style.footerMain_Link_ul_links} onClick={()=>navigate('/about')}>{t('footerAboutNav')}</a>
            </ul>
        </div>
        <div className={style.footerMain_login}>
            <p className={style.footerMain_title}>{t('footerNewsText')}</p>
            <div className={style.footerMain_login_inputBox}>
            <form onSubmit={handleSubmit} className={style.footerMain_login_inputBox}>
              <input
                type="email"
                value={email}
                required
                onChange={handleClickEmail}
                className={style.footerMain_login_inputBox_input}
                placeholder='Enter your e-mail'
              />
            </form>
            </div>
            <p className={style.footerMain_login_text}>{t('footerJoinText')}</p>
            <div className={style.footerMain_login_contackLogo}>
                <FaFacebook className={style.footerMain_login_contackLogo_icon} href='https://www.facebook.com/shopify'/>
                <FaXTwitter className={style.footerMain_login_contackLogo_icon} href='https://www.twitter.com/shopify/'/>
                <FaPinterest className={style.footerMain_login_contackLogo_icon} href='https://www.pinterest.com/shopify/'/>
                <FaInstagram className={style.footerMain_login_contackLogo_icon} href='https://www.instagram.com/shopify/'/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
