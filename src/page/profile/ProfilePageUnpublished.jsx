import React from 'react'
import style from "./profileCard.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ProfilePageUnpublished = () => {
  const navigate=useNavigate()
  const {t}= useTranslation() 

  return (
    <div className={style.profileCardBox}>
      <p className={style.profileCardBox_title}>{t('profileCardNotUnpublishedProduct')}</p>
      <button className={style.profileCardBox_btn} onClick={()=>navigate('/yeniElan')}><CiCirclePlus/>{t('profileCardAddNew')}</button>
    </div>
  )
}

export default ProfilePageUnpublished
