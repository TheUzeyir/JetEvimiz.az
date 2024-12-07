import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import style from "./newProductAdd.module.css";
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop";
import { useTranslation } from "react-i18next"  


const NewProductAdd = () => {
  const [categories, setCategories] = useState([]);
  const [parameters, setParameters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingParameters, setLoadingParameters] = useState(false);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({});
  const [productTitle, setProductTitle] = useState("");
  const [description, setDescription] = useState("");
  const {t}= useTranslation() 
 
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(
          "http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=az"
        );
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    
    setParameters([]);
    setFormData({});

    if (!categoryId) return;

    setLoadingParameters(true);
    try {
      const response = await fetch(
        `http://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=az&CategoryId=${categoryId}&RequestFrontType=add`
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

  const handleImageUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    const imageData = new FormData();
    const imageUrls = [];
    setUploading(true);

    try {
      for (let i = 0; i < files.length; i++) {
        imageData.append("files", files[i]);
        imageUrls.push(URL.createObjectURL(files[i])); // Generate a URL for preview
      }

      setImages((prevImages) => [...prevImages, ...imageUrls]);

      const response = await fetch(
        "http://restartbaku-001-site3.htempurl.com/api/Product/add-image",
        {
          method: "POST",
          body: imageData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload images");
      }

      const data = await response.json();
      if (data.isSuccessful) {
        console.log("Görseller başarıyla yüklendi!");
      } else {
        throw new Error(data.messages.join(", "));
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!productTitle || !selectedCategory || images.length === 0) {
      alert("Bütün sahələri doldurun!");
      return;
    }
  
    const payload = {
      productTitle,
      categoryId: selectedCategory,
      storeId: null,
      description: description || "2024121",
      images,
      parameters: formData,
    };
    console.log("Göndərilən payload:", payload);
  
    try {
      const response = await fetch(
        "http://restartbaku-001-site3.htempurl.com/api/Product/add-product",
        { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      const data = await response.json();
      if (data.isSuccessful) {
        alert("Elan uğurla əlavə edildi!");
          setProductTitle("");
        setSelectedCategory("");
        setImages([]);
        setFormData({});
        setDescription("");
        setParameters([]);
      } else {
        alert("Xəta baş verdi: " + data.messages.join(", "));
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Məhsul əlavə edilərkən xəta baş verdi: " + error.message);
    }
  };
  
  return (
    <div className={style.addBox_main_container}>
      <HeaderTop />
      <div className="container">
        <div className={style.addBox_container}>
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
                <p>{t('addProductPageAddImgText')}</p>
                <div className={style.imagePreviews}>
                <label className={style.addBox_image_add}>
                  +
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className={style.addBox_image_input}
                    onChange={handleImageUpload}
                    disabled={uploading}
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
                        onClick={() => handleRemoveImage(index)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.addBox_left_box_top_card}>
                <span>{t('addProductPageProductDescribe')}</span>
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
      <Footer />
      <FooterResponsive />
    </div>
  );
};

export default NewProductAdd;
