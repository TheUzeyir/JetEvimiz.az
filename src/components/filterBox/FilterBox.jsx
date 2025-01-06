import React, { useState, useEffect } from "react";
import style from "./filterBox.module.css";
import { IoCloseCircleSharp } from "react-icons/io5";

const FilterBox = ({ isVisible, setIsVisible, categoryId }) => {
  const [parameters, setParameters] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (categoryId) {
      fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=az&CategoryId=${categoryId}&RequestFrontType=search`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("API Parametrlər Məlumatları:", data);
          setParameters(data.data || []);
        })
        .catch((error) => {
          console.error("Error fetching parameters:", error);
        });
    }
  }, [categoryId]);

  const handleInputChange = (parameterId, value) => {
    setFormData((prev) => ({
      ...prev,
      [parameterId]: value,
    }));
  };

  const handleClickCloseBtn = () => {
    setIsVisible(false);
  };

  const handleFilter = () => {
    if (!categoryId) {
      alert("Zəhmət olmasa kateqoriyanı seçin!");
      return;
    }

    const baseUrl = "https://restartbaku-001-site4.htempurl.com/api/Product/search";
    const queryParams = new URLSearchParams({
      LanguageCode: "az",
      CategoryId: categoryId,
    });

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value);
      }
    });

    const fullUrl = `${baseUrl}?${queryParams.toString()}`;

    console.log("API sorgu URL:", fullUrl); // Form data və query ilə yaradılmış tam URL-i konsola yaz

    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Filterlənmiş məlumatlar:", data); // Süzülmüş məlumatları konsola yaz
      })
      .catch((error) => {
        console.error("API sorğusunda xəta baş verdi:", error);
      });
  };

  return (
    <div className={style.filterBox_containers}>
      <div
        className={`${style.filterBox} ${!isVisible ? style.filterBoxDisplayNone : ""}`}
      >
        <IoCloseCircleSharp
          className={style.filterBoxIcon}
          onClick={handleClickCloseBtn}
        />
        {parameters.length > 0 ? (
          parameters.map((param) => (
            <div key={param.parameterId} className={style.filterBox_content}>
              {param.parameterTypeId === 1 && (
                <div className={style.filterLabel}>
                  <label htmlFor={`param-${param.parameterId}`}>
                    {param.parameterTitle}
                  </label>
                  <input
                    id={`param-${param.parameterId}`}
                    type="text"
                    placeholder="Dəyər daxil edin"
                    className={style.filterInput}
                    value={formData[param.parameterId] || ""}
                    onChange={(e) =>
                      handleInputChange(param.parameterId, e.target.value)
                    }
                  />
                </div>
              )}
              {param.parameterTypeId === 2 && param.parameterKey.includes('min') && (
                <div className={style.filterLabel}>
                  <label htmlFor={`param-${param.parameterId}`}>
                    {param.parameterTitle}
                  </label>
                  <input
                    type="number"
                    placeholder="Dəyər daxil edin"
                    className={style.filterInput}
                    value={formData[param.parameterId] || ""}
                    onChange={(e) =>
                      handleInputChange(param.parameterId, e.target.value)
                    }
                  />
                </div>
              )}
                    
              {
              param.parameterTypeId === 2 && param.parameterKey.includes('max') && (
                <div className={style.filterLabel}>
                  <label htmlFor={`param-${param.parameterId}`}>{param.parameterKey.split('-')[1] || param.parameterKey}
                  </label>
                  <input
                    type="number"
                    placeholder="Dəyər daxil edin"
                    className={style.filterInput}
                    value={formData[param.parameterId] || ""}
                    onChange={(e) =>
                      handleInputChange(param.parameterId, e.target.value)
                    }
                  />
                </div>
              )}

              {param.parameterTypeId === 3 && (
                <div className={style.filterLabel}>
                  <label htmlFor={`param-${param.parameterId}`}>
                    {param.parameterTitle}
                  </label>
                  <select
                    id={`param-${param.parameterId}`}
                    value={formData[param.parameterId] || ""}
                    className={style.filterInput}
                    onChange={(e) =>
                      handleInputChange(param.parameterId, e.target.value)
                    }
                  >
                    <option value="">Seçim edin</option>
                    {param.parameterMasks?.map((mask) => (
                      <option
                        key={mask.parameterMaskId}
                        value={mask.parameterMaskId}
                      >
                        {mask.parameterMaskData}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>Parametrlər mövcud deyil</p>
        )}
        <div className={style.filterGroup}>
          <button className={style.filterButton} onClick={handleFilter}>
            Axtar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
