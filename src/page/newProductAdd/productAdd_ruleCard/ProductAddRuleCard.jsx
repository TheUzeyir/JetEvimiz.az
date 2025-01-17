import React from 'react'
import style from "../newProductAdd.module.css"
import { useNavigate } from "react-router-dom";

const ProductAddRuleCard = () => {
      const navigate = useNavigate();
    
  return (
    <div className={style.addBox_ruleCard}>
    <h2 className={style.addBox_ruleCard_title}>JetEvimiz.az-ın sadə qaydaları</h2>
    <p className={style.addBox_ruleCard_text}><span className={style.addBox_ruleCard_text_icon}>*</span>Eyni elanı bir neçə dəfə təqdim etməyin.</p>
    <p className={style.addBox_ruleCard_text}><span className={style.addBox_ruleCard_text_icon}>*</span>Təsvir və ya şəkillərdə telefon, email və ya sayt ünvanı göstərməyin.</p>
    <p className={style.addBox_ruleCard_text}><span className={style.addBox_ruleCard_text_icon}>*</span>Ad yerində qiymət yazmayın - bunun üçün ayrıca yer var.</p>
    <p className={style.addBox_ruleCard_text}><span className={style.addBox_ruleCard_text_icon}>*</span>Qadağan olunmuş məhsulları satmayın.</p>
    <p className={style.addBox_ruleCard_btnText} onClick={()=>navigate('/termcondition')}>Saytın tam qaydaları</p>
    </div>
  )
}

export default ProductAddRuleCard
