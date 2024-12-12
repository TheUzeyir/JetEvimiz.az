import React from 'react'
import style from "./aboutPage.module.css"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"

 
const TermCondition = () => {
  const navigate=useNavigate()
  const {t}= useTranslation() 

  return (
    <div className={style.TermCondition_container}>
      <div className='container'>
        <h3 className={style.TermCondition_title}>{t('termTextHead')}</h3>
        <p className={style.AboutPage_goBack} onClick={()=>navigate(-1)}><MdOutlineKeyboardArrowLeft/>Go Back</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText13')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText14')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText15')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText16')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText17')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText18')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText19')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText20')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText21')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText22')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText23')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText13')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText24')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText25')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText26')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText27')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText28')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText29')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText30')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText31')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText32')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText33')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText34')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText35')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText36')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText37')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText38')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText39')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText40')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText41')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText42')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText43')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText44')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText45')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText46')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText47')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText48')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText49')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText50')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText51')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText52')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText53')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText54')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText55')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText56')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText57')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText58')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText59')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText60')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText61')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText62')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText63')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText64')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText65')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText66')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText67')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText68')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText69')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText70')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText71')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText72')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText73')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText74')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText75')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText76')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText77')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText78')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText79')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText80')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText81')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText82')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText83')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText84')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText85')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText86')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText87')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText88')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText89')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText90')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText91')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText92')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText93')}</h2>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText94')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText95')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText96')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText97')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText98')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText99')}</p>
        <p className={style.TermCondition_subtitle}>{t('rulePageRuleText100')}</p>
        <h2 className={style.TermCondition_subtitle}>{t('rulePageRuleText101')}</h2>
      </div>
    </div>
  )
}

export default TermCondition
