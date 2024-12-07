import React, { useState } from 'react';
import { IoCloseCircle } from "react-icons/io5";
import { FaCar, FaHome, FaTshirt, FaCouch } from 'react-icons/fa';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import style from "./categoryBox.module.css";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next"  

const CategoryBox = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    const navigate=useNavigate() 
  const {t}= useTranslation() 

    const categories = [
        { name: 'Nəqliyyat', products: ['Skuter', 'Avtomobil', 'Motosiklet'], icon: <FaCar /> },
        { name: 'Daşınmaz Əmlak', products: ['Mənzil', 'Ev', 'Ofis'], icon: <FaHome /> },
        { name: 'Dekor', products: ['Güzgü', 'Lampa', 'Divar bəzəkləri'], icon: <FaCouch /> },
        { name: 'Geyim', products: ['Köynək', 'Şalvar', 'Ayaqqabı'], icon: <FaTshirt /> }
    ];

    const toggleCategory = (index) => {
        setActiveCategory(activeCategory === index ? null : index);
    };

    return (
        <div className={style.categoryBox_container}>
            <div className={style.categoryBox_header}>
                <IoCloseCircle onClick={()=>navigate(-1)} /> {t('categoryBoxHeadText')}
            </div>
            <div className={style.categoryBox_card}>
                {categories.map((category, index) => (
                    <div key={index} className={style.categoryBox_card_boxs}>
                        <div className={style.categoryBox_card_box} onClick={() => toggleCategory(index)}>
                            <p className={style.categoryBox_card_box_title}>
                                {category.icon} {category.name}
                            </p>
                            <MdOutlineKeyboardArrowDown 
                                className={style.categoryBox_card_box_icon} 
                            />
                        </div>
                        {activeCategory === index && (
                            <div className={style.categoryBox_card_box_card}>
                                {category.products.map((product, productIndex) => (
                                    <p key={productIndex}>{product}</p>
                                ))}
                            </div>
                        )}
                    </div> 
                ))}
            </div>
        </div>
    );
};

export default CategoryBox;
