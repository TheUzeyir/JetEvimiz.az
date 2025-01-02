import React, { useState, useEffect } from "react";
import style from "./filterBox.module.css";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleSharp } from "react-icons/io5";

const FilterBox = ({  isVisible, setIsVisible,categoryId }) => {
  const [parameters, setParameters] = useState([]);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (categoryId) {
      fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=az&CategoryId=${categoryId}&RequestFrontType=add`
      )
        .then((response) => response.json())
        .then((data) => {
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
    console.log("hello");
    
  };
  
  return (
    <div className={style.filterBox_containers}>
      <div className={`${style.filterBox} ${!isVisible ? style.filterBoxDisplayNone : ""}`}>
        <IoCloseCircleSharp className={style.filterBoxIcon} onClick={handleClickCloseBtn}/>
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
              {param.parameterTypeId === 2 && (
                <div className={style.filterLabel}>
                  <label htmlFor={`param-${param.parameterId}`}>
                    {param.parameterTitle}
                  </label>
                  <div className={style.priceRange}>
                    <input
                      type="number"
                      placeholder="Min"
                      className={style.filterInput}
                      value={formData[`${param.parameterId}_min`] || ""}
                      onChange={(e) =>
                        handleInputChange(`${param.parameterId}_min`, e.target.value)
                      }
                    />-
                    <input
                      type="number"
                      placeholder="Max"
                      className={style.filterInput}
                      value={formData[`${param.parameterId}_max`] || ""}
                      onChange={(e) =>
                        handleInputChange(`${param.parameterId}_max`, e.target.value)
                      }
                    />
                  </div>
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
                      <option key={mask.parameterMaskId} value={mask.parameterMaskId}>
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
