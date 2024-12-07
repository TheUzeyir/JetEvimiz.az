import React from 'react'
import "./headerBottom.css"
import { useTranslation } from "react-i18next"


export default function HeaderBottom() {
  const {t}= useTranslation()

  return (
    <div className="headerBottomContainer">
      <div className="container">
        <div className='headerBottom'>
          <span className='headerBottom_left'>{t('vipAnnoucment')}</span>
          <span className='headerBottom_right'>{t('allVipAnnoucment')}</span>
        </div>
      </div>
    </div>
  )
}
