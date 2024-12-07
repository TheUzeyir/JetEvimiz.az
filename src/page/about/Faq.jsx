import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import style from "./aboutPage.module.css";
import { useNavigate } from 'react-router-dom';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const clickBox = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: t("faqQuestion1"),
      answer: t("faqAnswer1"),
    },
    {
      question: t("faqQuestion2"),
      answer: t("faqAnswer2"),
    },
    {
      question: t("faqQuestion3"),
      answer: t("faqAnswer3"),
    },
  ];

  return (
    <div className={style.faq_container}>
      <div className="container">
        <p className={style.AboutPage_goBack} onClick={() => navigate(-1)}>
          <MdOutlineKeyboardArrowLeft />
          {t("goBack")}
        </p>
        {faqItems.map((item, index) => (
          <section key={index} className={style.faq_card}>
            <h4
              className={style.faq_card_title}
              onClick={() => clickBox(index)}
            >
              {item.question}
              <IoIosArrowDown
                className={`${style.faq_card_icon} ${
                  openIndex === index ? style.faq_card_icon_rotate : ""
                }`}
              />
            </h4>
            <p
              className={`${style.faq_card_subtitle} ${
                openIndex === index ? style.faq_card_subtitle_disBlock : ""
              }`}
            >
              {item.answer}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Faq;
