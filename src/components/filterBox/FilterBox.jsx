import React, { useState, useEffect } from "react";
import style from "./filterBox.module.css";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const FilterBox = ({ isVisible, setIsVisible, categoryId, setFilteredProducts }) => {
  const [parameters, setParameters] = useState([]);
  const [formData, setFormData] = useState({});
  const [filteredResults, setFilteredResults] = useState([]);
  const [parameterTitles, setParameterTitles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      // Fetch parametreler için URL
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

      // Fetch parameter titles for 'add' type
      fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=az&CategoryId=${categoryId}&RequestFrontType=add`
      )
        .then((response) => response.json())
        .then((data) => {
          const titles = data.data?.map((param) => param.parameterTitle) || [];
          setParameterTitles(titles);
        })
        .catch((error) => {
          console.error("Error fetching parameter titles for add:", error);
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

    const baseUrl = "https://restartbaku-001-site3.htempurl.com/api/Product/search";
    const queryParams = new URLSearchParams({
      LanguageCode: "az",
      CategoryId: categoryId,
    });

    parameters.forEach((param) => {
      const parameterId = param.parameterId;
      const parameterKey = param.parameterKey;
      const value = formData[parameterId];

      if (value) {
        queryParams.append(parameterKey, value);
      }
    });

    const fullUrl = `${baseUrl}?${queryParams.toString()}`;

    console.log("API sorgu URL:", fullUrl);

    fetch(fullUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log("Filterlənmiş məhsullar:", data.data?.items || []);
        setFilteredResults(data.data?.items || []);
        setFilteredProducts(data.data?.items || []);
      })
      .catch((error) => {
        console.error("API sorğusunda xəta baş verdi:", error);
      });
  };

  const handleReset = () => {
    setFormData({});

    if (categoryId) {
      fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Product/get-all-products?LanguageCode=az&CategoryId=${categoryId}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Bütün məhsullar:", data.data?.items || []);
          setFilteredResults(data.data?.items || []);
          setFilteredProducts(data.data?.items || []);
        })
        .catch((error) => {
          console.error("Error fetching all products:", error);
        });
    }
  };

  const combinedParameters = parameters.map((param, index) => ({
    ...param,
    parameterTitle: parameterTitles[index] || param.parameterTitle,
  }));

  return (
    <div className={style.filterBox_containers}>
      <div className={`${style.filterBoxs} ${!isVisible ? style.filterBoxDisplayNone : ""}`}>
        <IoCloseCircleSharp
          className={style.filterBoxIcon}
          onClick={handleClickCloseBtn}
        />
        <div className={style.filterBox}>
          {combinedParameters.length > 0 ? (
            combinedParameters.map((param) => (
              <div key={param.parameterId} className={style.filterBox_content}>
                {param.parameterTypeId === 2 && param.parameterKey.includes("min") && (
                  <div className={style.filterLabel}>
                    <span>{param.parameterTitle}</span>
                    <input
                      type="number"
                      placeholder="min"
                      className={style.filterInput}
                      value={formData[param.parameterId] || ""}
                      onChange={(e) => handleInputChange(param.parameterId, e.target.value)}
                    />
                  </div>
                )}
                {param.parameterTypeId === 2 && param.parameterKey.includes("max") && (
                  <div className={style.filterLabel}>
                    <input
                      type="number"
                      placeholder="max"
                      className={style.filterInput}
                      value={formData[param.parameterId] || ""}
                      onChange={(e) => handleInputChange(param.parameterId, e.target.value)}
                    />
                  </div>
                )}
                {param.parameterTypeId === 1 && (
                  <div className={style.filterLabel}>
                    <span>{param.parameterTitle}</span>
                    <input
                      id={`param-${param.parameterId}`}
                      type="text"
                      placeholder="Dəyər daxil edin"
                      className={style.filterInput}
                      value={formData[param.parameterId] || ""}
                      onChange={(e) => handleInputChange(param.parameterId, e.target.value)}
                    />
                  </div>
                )}
                {param.parameterTypeId === 3 && param.parameterMasks?.length > 0 && (
                  <div className={style.filterLabel}>
                    <select
                      id={`param-${param.parameterId}`}
                      value={formData[param.parameterId] || ""}
                      className={style.filterInput}
                      onChange={(e) => handleInputChange(param.parameterId, e.target.value)}
                    >
                      <option value="">{param.parameterTitle}</option>
                      {param.parameterMasks.map((mask) => (
                        <option key={mask.parameterMaskId} value={mask.parameterMaskData}>
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
        </div>
        <div className={style.filterGroup}>
          <button className={style.filterButton} onClick={handleFilter}>
            Axtar
          </button>
          <button className={style.filterButton} onClick={handleReset}>
            Sıfırla
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBox;
