import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import style from "./newProductAdd.module.css";
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Contack from "../about/Contack";
import { useQuery } from "@tanstack/react-query";


const NewProductAdd = () => {
  const [categories, setCategories] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingParameters, setLoadingParameters] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const { t, i18n } = useTranslation(); 
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const currentLanguageCode = i18n.language; 

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          alert("Sistemdən çıxmısınız, lütfən yenidən daxil olun.");
          navigate("/login"); 
          return;
        }
  
        const response = await fetch(
          `https://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=${currentLanguageCode}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.status === 401) {
          alert("Giriş vaxtınız bitib, lütfən yenidən daxil olun.");
          navigate("/login");
          return;
        }
  
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
  
    fetchCategories();
  }, [currentLanguageCode, navigate]);
  

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    
    setParameters([]);
    setFormData({});

    if (!categoryId) return;

    setLoadingParameters(true);
    try {
      const response = await fetch(
        `https://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=${currentLanguageCode}&CategoryId=${categoryId}&RequestFrontType=add`
      );

      const data = await response.json();

      const initialFormData = data.data ? data.data.reduce((acc, parameter) => {
        acc[parameter.parameterKey] = ""; 
        return acc;
      }, {}) : {};

      setParameters(data.data || []);
      setFormData((prevData) => ({ ...prevData, ...initialFormData }));

    } catch (error) {
      console.error("Error loading parameters:", error);
    } finally {
      setLoadingParameters(false);
    }
  };

  const handleInputChange = (event, parameterKey) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [parameterKey]: value,
    }));
  };


  const handleSubmit = async () => {
    if (!productTitle || !selectedCategory || images.length === 0) {
      alert("Bütün sahələri doldurun!");
      return;
    }
  
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Sistemdən çıxmısınız, lütfən yenidən daxil olun.");
      navigate("/login");
      return;
    }
  
    const payload = {
      productTitle,
      categoryId: selectedCategory,
      storeId: null,
      description: description || "2024121",
      images: images,
      parameters: formData,
    };
  
    console.log("Göndərilən payload:", payload);
  
    try {
      const response = await fetch(
        "https://restartbaku-001-site3.htempurl.com/api/Product/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      if (response.status === 401) {
        alert("Giriş vaxtınız bitib, lütfən yenidən daxil olun.");
        navigate("/login");
        return;
      }
  
      const data = await response.json();
      if (data.isSuccessful) {
        alert("Elan uğurla əlavə edildi!");
        setProductTitle("");
        setSelectedCategory("");
        setImages([]);
        setFormData({});
        setDescription("");
        setParameters([]);
        navigate(-1);
      } else {
        alert("Xəta baş verdi: " + data.messages.join(", "));
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Məhsul əlavə edilərkən xəta baş verdi: " + error.message);
    }
  };
  

  const handleFileChange = async (event) => {
    const files = event.target.files;
  
    if (files.length > 0) {
      const formDataArray = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("files", file); 
        formDataArray.push(formData);
      }
  
      try {
        const responses = await Promise.all(
          formDataArray.map((formData) =>
            axios.post(
              "https://restartbaku-001-site3.htempurl.com/api/Product/add-image",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            )
          )
        );
  
        const newImages = responses
          .filter((response) => response.data.isSuccessful)
          .map((response) => response.data.data);
  
        setImages((prevImages) => [...prevImages, ...newImages]); 
        
      } catch (error) {
        console.error("Xəta baş verdi:", error);
      }
    }
  };

  const {
    data: cities = [],
    isLoading: citiesLoading,
    isError: citiesError,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: async () => {
      const response = await axios.get(
        "https://restartbaku-001-site3.htempurl.com/api/City/get-cities"
      );
      return response.data.data;
    },
    onError: () => setError("Şəhərləri alarkən xəta baş verdi."),
  });
  
  const handleRemoveImage = (imageToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image !== imageToRemove)
    );
    console.log(images);
    
  };
  return (
    <div className={style.addBox_main_container}>
      <HeaderTop />
      <div className="container">
        <div className={style.addBox_container}>
        <p className={style.addPageGoback} onClick={()=>navigate(-1)}><FaChevronLeft/>Go back</p>
          <FaBars
            className={style.bar_icon}
            onClick={() => navigate("/headerBox")}
          />
          <p className={style.addBox_title}>{t('addProductPageNewAcc')}</p>
          <div className={style.addBox}>
              <div className={style.addBox_left_box_top_card}>
                <label>{t('addProductPageProductName')}</label>
                <input
                  type="text"
                  value={productTitle}
                  onChange={(e) => setProductTitle(e.target.value)}
                  placeholder="Məhsulun adını daxil edin"
                  className={style.addBox_left_box_top_card_item}
                />
              </div>
              <div className={style.addBox_left_box_top_card}>
                <label>{t('addProductPageCategeryText')}</label>
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className={style.addBox_left_box_top_card_item}
                  disabled={loadingCategories}
                >
                  <option value="">--{t('addProductPageChooseCategery')}--</option>
                  {loadingCategories ? (
                    <option disabled>{t('addProductPageLoading')}</option>
                  ) : (
                    categories.map((category) => (
                      <React.Fragment key={category.categoryId}>
                        <option
                          value={category.categoryId}
                          disabled
                          className={style.parentCategoryTitle}
                        >
                          {category.categoryTitle}
                        </option>
                        {category.childCategories?.map((child) => (
                          <option key={child.categoryId} value={child.categoryId}>
                            -- {child.categoryTitle}
                          </option>
                        ))}
                      </React.Fragment>
                    ))
                  )}
                </select>
              </div>
              <div className={style.addBox_left_box_top_card}>
                <label>{t('addProductPageCityText')}</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className={style.addBox_left_box_top_card_item}
                  disabled={citiesLoading}
                >
                  <option value="">--{t('addProductPageCityText')}--</option>
                  {citiesLoading ? (
                    <option disabled>{t('addProductPageLoading')}</option>
                  ) : cities.length > 0 ? (
                    cities.map((city) => (
                      <option key={city.cityId} value={city.cityId}>
                        {city.title}
                      </option>
                    ))
                  ) : (
                    <option disabled>{t('addProductPageCityNotFound')}</option>
                  )}
                </select>
              </div>
              {loadingParameters ? (
                <p>{t('addProductPageOptionLoading')}</p>
              ) : parameters.length === 0 ? (
                <p className={style.errorText}>{t('addProductPageOptionLoadingNotFoud')}</p>
              ) : (
                parameters.map((parameter) => (
                  <div
                    key={parameter.parameterKey}
                    className={style.addBox_left_box_top_card}
                  >
                    <label>{parameter.parameterTitle}</label>
                    {parameter.parameterTypeId === 3 ? (
                      <select
                        value={formData[parameter.parameterKey] || ""}
                        onChange={(e) =>
                          handleInputChange(e, parameter.parameterKey)
                        }
                        className={style.addBox_left_box_top_card_item}
                      >
                        <option value="">--{t('addProductPageChooseText')}--</option>
                        {parameter.parameterMasks?.map((mask) => (
                          <option
                            key={mask.parameterMaskId}
                            value={mask.parameterMaskData}
                          >
                            {mask.parameterMaskData}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={formData[parameter.parameterKey] || ""}
                        onChange={(e) =>
                          handleInputChange(e, parameter.parameterKey)
                        }
                        className={style.addBox_left_box_top_card_item}
                        placeholder={parameter.parameterTitle}
                      />
                    )}
                  </div>
                ))
              )}
              <div className={style.addBox_left_box_top_card}>
                <p className={style.addBox_left_box_top_card_title}>{t('addProductPageAddImgText')}</p>
                <div className={style.imagePreviews}>
                  <label>
                    +
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </label>
                  {images.map((image, index) => (
                    <div key={index} className={style.imagePreview}>
                      <img
                        src={image}
                        alt={`Uploaded preview ${index}`}
                        className={style.imagePreviewImg}
                      />
                      <button
                        type="button"
                        className={style.removeImageButton}
                        onClick={() => handleRemoveImage(image)} // Properly pass the image to the function
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.addBox_left_box_top_card}>
                <span  className={style.addBox_left_box_top_card_title}>{t('addProductPageProductDescribe')}</span>
                <textarea
                  placeholder="Məhsulun təsviri"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={style.addBox_left_box_top_card_textArea}
                />
            </div>
                <button
                  type="button"
                  className={style.addBox_button}
                  onClick={handleSubmit}
                  disabled={uploading}
                >
                   {t('addProductPageProductAddText')}
                </button>
          </div>
        </div>
      </div>
      <Contack/>
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default NewProductAdd;