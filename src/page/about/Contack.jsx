import React from 'react'
import style from "./aboutPage.module.css"
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"


const Contack = () => { 
  const navigate=useNavigate()
  const {t}= useTranslation()

  return (
    <div className={style.contack_container}>
      <div className='container'>

          <div className={style.contack_card}>
            <h3>{t('aboutContackText')}</h3>
            <p>{t('rulePageRuleText11')} </p>
          </div>
          <h3>{t('rulePageRuleText106')}</h3>
          <p> +994509914174</p>
          <p>+994709023910</p>
          <h3>{t('rulePageRuleText107')}</h3>
          <div className={style.contack_card}>
            <h3>{t('rulePageRuleText102')}</h3>
            <p>{t('rulePageRuleText105')}</p>
            <p>{t('rulePageRuleText103')}</p>
          </div>
          <a href="JetEvimiz.az">JetEvimiz.az</a>
          <p>{t('rulePageRuleText104')}</p>
      </div>
    </div>
  )
}

export default Contack
