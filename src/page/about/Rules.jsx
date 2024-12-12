import React from 'react'
import style from "./aboutPage.module.css"
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"

const Rules = () => {
    const navigate = useNavigate();
    const { t } = useTranslation(); 

    return (
        <div className={style.rules_container}>
            <div className='container'>
                <h3 className={style.rulesPage_title}>{t('rulePageRuleText1')}</h3>
                <p className={style.AboutPage_goBack} onClick={() => navigate(-1)}><MdOutlineKeyboardArrowLeft />{t('goBack')}</p>
                <section>
                    <h4 className={style.rulesPage_subtitle}>{t('rulePageRuleText2')}</h4>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText3')}</p>
                </section>
                <section>
                    <h4 className={style.rulesPage_subtitle}>{t('rulePageRuleText4')}</h4>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText5')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText6')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText7')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText8')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText9')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText10')}</p>
                </section>
            </div>
        </div>
    );
};

export default Rules;
