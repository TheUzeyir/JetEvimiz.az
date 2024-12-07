import React, { useState, useEffect } from 'react';
import style from "./profileCard.module.css";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const ProfilePageWaiting = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [statusType, setStatusType] = useState(2);  // Set the initial statusType here (could be dynamically fetched)

  useEffect(() => {
    // Fetch data based on statusType
    const fetchData = async () => {
      try {
        const response = await fetch(`https://restartbaku-001-site3.htempurl.com/api/auth/get-user-products?LanguageCode=az&statusType=${statusType}`);
        const data = await response.json();
        if (statusType === 1) {
          setProducts(data);  // Store the data only if statusType is 1
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [statusType]);

  return (
    <div className={style.profileCardBox}>
      <p className={style.profileCardBox_title}>{t('profileCardWaitProduct')}</p>
      {statusType === 1 && products.length > 0 ? (
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
