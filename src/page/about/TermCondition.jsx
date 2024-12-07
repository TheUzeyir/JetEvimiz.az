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
        <p className={style.TermCondition_subtitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac etiam diam est sit et pellentesque. Vitae egestas imperdiet non enim.
          Cursus massa quis sollicitudin egestas sit imperdiet nisl. Fringilla quam fringilla cras iaculis fermentum pellentesque.
            Ultricies egestas aliquet aliquam diam diam. Pretium elementum sed sed pellentesque ullamcorper mollis in lobortis. Tincidunt 
            blandit auctor nibh eu, elementum id. Cursus posuere amet, amet morbi egestas malesuada nunc, integer. Potenti hendrerit pretium
            dui orci. Sed in ut vel amet aenean feugiat. Pellentesque pellentesque vulputate vulputate amet. Id aenean posuere sit et in
              cras in aliquam tellus. Lacus, quis ultricies condimentum ac dui, turpis sapien sit justo. Nullam risus, pellentesque conse
              quat eu neque. Amet quis iaculis tortor maecenas. Nisl elementum vestibulum ipsum porttitor maecenas laoreet penatibus pul
              vinar elementum. Aliquet pulvinar odio mattis sit mauris lacus. Ac dui dolor sit cras at elementum nisl egestas. Quam dolor, 
              facilisis semper consectetur eget porta aliquam vel tristique. Posuere at pulvinar velit varius sed aliquam. Massa duis est 
              enim, vulputate. Dictumst turpis tempus, et nisl, pharetra at nascetur volutpat lobortis. Ultrices est quam blandit faucibus
              egestas ac tristique non blandit. Risus ac commodo, ipsum imperdiet ipsum a orci, metus. In tempus sit arcu gravida tellus, 
              tortor. Scelerisque venenatis, tellus, at in nunc consectetur dolor sed. Dolor quam malesuada viverra viverra varius vel.
              Non id semper non, faucibus venenatis, ultricies. Pellentesque non vitae sed aliquet diam a. Eu augue vehicula tristique id
              porttitor amet. Nunc dui lacus vestibulum eget eget mi pharetra pulvinar. Sagittis placerat arcu fermentum quis consectetur 
              volutpat tellus massa. Tincidunt aliquam nunc, eget nam egestas dolor accumsan in tellus. Metus vitae libero sit tempus
              sit sit arcu. Consectetur sit turpis mi libero, scelerisque metus. A ornare amet cursus non quis aliquam sit mauris in. 
              Etiam viverra at eleifend dictumst. Interdum semper aenean pellentesque dolor.</p>
      </div>
    </div>
  )
}

export default TermCondition
