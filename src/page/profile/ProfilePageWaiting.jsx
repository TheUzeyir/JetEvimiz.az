import React, { useState, useEffect } from 'react';
import style from "./profileCard.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ProfilePageWaiting = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);

  // API'den veri çəkmək üçün ümumi funksiya
  const fetchProducts = async (statusType) => {
    try {
      const token = localStorage.getItem('authToken');  // Tokeni alın
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/auth/get-user-products?LanguageCode=az&statusType=${statusType}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      console.log('Fetched Products:', data);
      setProducts(data);  
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(1);  
  }, []);

  return (
    <div className={style.profileCardBox}>
      <p className={style.profileCardBox_title}>{t('profileCardWaitProduct')}</p>
      {products.length > 0 ? (
        <div className={style.productList}>
          {products.map((product) => (
            <div key={product.id} className={style.productItem}>
              <p>{product.title}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>{t('noProductsAvailable')}</p>
      )}

      <button className={style.profileCardBox_btn} onClick={() => navigate('/yeniElan')}>
        <CiCirclePlus />
        {t('profileCardAddNew')}
      </button>
    </div>
  );
};

export default ProfilePageWaiting;
