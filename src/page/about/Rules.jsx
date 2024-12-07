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
                    <p className={style.rulesPage_text}>{t('rulePageRuleText4')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText5')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText6')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText7')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText8')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText9')}</p>
                </section>
                <section>
                    <h4 className={style.rulesPage_subtitle}>{t('rulePageRuleText10')}</h4>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText11')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText12')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText13')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText14')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText15')}</p>
                </section>
                <section>
                    <h4 className={style.rulesPage_subtitle}>{t('rulePageRuleText16')}</h4>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText17')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText18')}</p>
                </section>
                <section>
                    <h4 className={style.rulesPage_subtitle}>{t('rulePageRuleText19')}</h4>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText20')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText21')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText22')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText23')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText24')}</p>
                </section>
                <section>
                    <h4 className={style.rulesPage_subtitle}>{t('rulePageRuleText25')}</h4>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText26')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText27')}</p>
                    <p className={style.rulesPage_text}>{t('rulePageRuleText28')}</p>
                </section>
                <p className={style.rulesPage_rulesText}>{t('rulePageRuleText29')}</p>
            </div>
        </div>
    );
};

export default Rules;
