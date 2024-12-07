import React, { useState } from 'react';
import style from './headerFilterCard.module.css';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { PiArrowBendRightDownBold } from 'react-icons/pi';
import { useTranslation } from "react-i18next"

const HeaderFilterCard = ({ isFilterCardOpen }) => {
    const [displayBlockBox, setDisplayBlockBox] = useState(false);
  const {t}= useTranslation()

    const transportation = ['Avtomobi', 'Skuter', 'Motosiklet', 'Velosipet', 'Kortec', 'Qayiq'];
    const property = ['Ev', 'Bag', 'Menzil', 'Obyekt', 'Qaraj', 'Ofis', 'Anbar', 'Torpaq Sahesi'];
    const decor = ['Toy', 'Nisan', 'Ad Gunu', 'Xinayaxdi'];
    const clothing = ['Gelinlik', 'Kostuyumlar', 'Ziyafet Geyimleri'];
    const electronics = ['Soyuducu', 'Playstation', 'Fotoaparat'];

    const clickFilterCard = () => {
        setDisplayBlockBox((prev) => !prev);
    };

    return (
        <div className={`${style.headerFilterCard} ${isFilterCardOpen ? style.headerFilterCard_displayBlock : ''}`}>
            <div className={style.HeaderFilterCard_top}>
                <div>
                    <div className={style.HeaderFilterCard_top_categoryBox} onClick={clickFilterCard}>
                        Kateqoriya Seçin <MdOutlineKeyboardArrowDown className={style.HeaderFilterCard_top_categoryBox_icon} />
                    </div>
                    <div
                        className={`${style.HeaderFilterCard_top_categoryCard} ${displayBlockBox ? style.HeaderFilterCard_top_categoryCard_displayBlock : ''}`}>
                        <p className={style.HeaderFilterCard_top_categoryCard_title}>
                            <span className={style.HeaderFilterCard_top_categoryCard_subtitle}>Neqiliyyat</span>{' '}
                            <PiArrowBendRightDownBold />
                            {transportation.map((category, index) => (
                                <option key={index} value={category} className={style.HeaderFilterCard_top_categoryCard_category}>
                                    {category}
                                </option>
                            ))}
                        </p>
                        <p className={style.HeaderFilterCard_top_categoryCard_title}>
                            <span className={style.HeaderFilterCard_top_categoryCard_subtitle}>Dasinmaz Emlak</span>{' '}
                            <PiArrowBendRightDownBold />
                            {property.map((category, index) => (
                                <option key={index} value={category} className={style.HeaderFilterCard_top_categoryCard_category}>
                                    {category}
                                </option>
                            ))}
                        </p>
                        <p className={style.HeaderFilterCard_top_categoryCard_title}>
                            <span className={style.HeaderFilterCard_top_categoryCard_subtitle}>Geyim</span>{' '}
                            <PiArrowBendRightDownBold />
                            {clothing.map((category, index) => (
                                <option key={index} value={category} className={style.HeaderFilterCard_top_categoryCard_category}>
                                    {category}
                              </option>
                            ))}
                        </p>
                        <p className={style.HeaderFilterCard_top_categoryCard_title}>
                            <span className={style.HeaderFilterCard_top_categoryCard_subtitle}>Dekor</span>{' '}
                            <PiArrowBendRightDownBold />
                            {decor.map((category, index) => (
                                <option key={index} value={category} className={style.HeaderFilterCard_top_categoryCard_category}>
                                    {category}
                                </option>
                            ))}
                        </p>
                        <p className={style.HeaderFilterCard_top_categoryCard_title}>
                            <span className={style.HeaderFilterCard_top_categoryCard_subtitle}>Elektronika</span>{' '}
                            <PiArrowBendRightDownBold />
                            {electronics.map((category, index) => (
                                <option key={index} value={category} className={style.HeaderFilterCard_top_categoryCard_category}>
                                    {category}
                                </option>
                            ))}
                        </p>
                    </div>
                </div>
            </div>
            <div className={style.HeaderFilterCard_bottom}>
                <button className={style.HeaderFilterCard_bottom_btn1}>Tarixe Gore Artma</button>
                <button className={style.HeaderFilterCard_bottom_btn2}>Elanlari Goster</button>
            </div>
        </div>
    );
};

export default HeaderFilterCard;
