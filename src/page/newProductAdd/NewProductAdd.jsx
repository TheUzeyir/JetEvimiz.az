import React, { useState, useEffect } from "react";
import Footer from "../../layout/footer/Footer";
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive";
import style from "./newProductAdd.module.css";
import HeaderTop from "../../layout/Header/HeaderTop/HeaderTop";
import { useTranslation } from "react-i18next";
import { FaBars } from "react-icons/fa";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Contack from "../about/Contack";
import Swal from "sweetalert2";

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
  const { t, i18n } = useTranslation(); // Language handling
  const navigate = useNavigate();
  const currentLanguageCode = i18n.language; // Current language code

  // Validate the authToken
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the token
        const isExpired = decoded.exp * 1000 < Date.now(); // Check expiration
        if (isExpired) {
          Swal.fire({
            icon: "warning",
            title: t("sessionExpiredTitle"),
            text: t("sessionExpiredMessage"),
            confirmButtonText: t("ok"),
          }).then(() => {
            localStorage.removeItem("authToken"); // Remove the token
            navigate("/login"); // Redirect to login page
          });
        }
      } catch (error) {
        console.error("Token decode error:", error);
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    } else {
      navigate("/login"); // Redirect to login if no token
    }
  }, [navigate, t]);

  // Fetch categories based on the current language
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const response = await fetch(
          `http://restartbaku-001-site3.htempurl.com/api/Category/get-all-categories?LanguageCode=${currentLanguageCode}`
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
  }, [currentLanguageCode]);

  const handleCategoryChange = async (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    setParameters([]);
    setFormData({});

    if (!categoryId) return;

    setLoadingParameters(true);
    try {
      const response = await fetch(
        `http://restartbaku-001-site3.htempurl.com/api/Category/get-parameters?LanguageCode=${currentLanguageCode}&CategoryId=${categoryId}&RequestFrontType=add`
      );

      const data = await response.json();

      const initialFormData = data.data
        ? data.data.reduce((acc, parameter) => {
            acc[parameter.parameterKey] = "";
            return acc;
          }, {})
        : {};

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
        console.log("Images uploaded successfully!");
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
      alert("Please fill out all required fields!");
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
    console.log("Payload sent:", payload);

    try {
      const response = await fetch(
        "http://restartbaku-001-site3.htempurl.com/api/Product/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (data.isSuccessful) {
        alert("Product added successfully!");
        setProductTitle("");
        setSelectedCategory("");
        setImages([]);
        setFormData({});
        setDescription("");
        setParameters([]);
      } else {
        alert("Error occurred: " + data.messages.join(", "));
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product: " + error.message);
    }
  };

  return (
    <div className={style.addBox_main_container}>
      <HeaderTop />
      <div className="container">
        <div className={style.addBox_container}>
          <p className={style.addPageGoback} onClick={() => navigate(-1)}>
            <FaChevronLeft />
            Go back
          </p>
          <FaBars
            className={style.bar_icon}
            onClick={() => navigate("/headerBox")}
          />
          <p className={style.addBox_title}>{t("addProductPageNewAcc")}</p>
          <div className={style.addBox}>
            {/* Product Title */}
            <div className={style.addBox_left_box_top_card}>
              <label>{t("addProductPageProductName")}</label>
              <input
                type="text"
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                placeholder="Enter product name"
                className={style.addBox_left_box_top_card_item}
              />
            </div>
            {/* Category Selection */}
            <div className={style.addBox_left_box_top_card}>
              <label>{t("addProductPageCategeryText")}</label>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className={style.addBox_left_box_top_card_item}
                disabled={loadingCategories}
              >
                <option value="">--{t("addProductPageChooseCategery")}--</option>
                {loadingCategories ? (
                  <option disabled>{t("addProductPageLoading")}</option>
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
                        <option
                          key={child.categoryId}
                          value={child.categoryId}
                        >
                          -- {child.categoryTitle}
                        </option>
                      ))}
                    </React.Fragment>
                  ))
                )}
              </select>
            </div>
            {/* Parameter Input */}
            {loadingParameters ? (
              <p>{t("addProductPageOptionLoading")}</p>
            ) : parameters.length === 0 ? (
              <p className={style.errorText}>
                {t("addProductPageOptionLoadingNotFoud")}
              </p>
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
                      <option value="">
                        --{t("addProductPageChooseText")}--
                      </option>
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
                      placeholder="Enter value"
                    />
                  )}
                </div>
              ))
            )}
            {/* Images Upload */}
            <div className={style.addBox_left_box_top_card}>
              <label>{t("addProductPagePhotos")}</label>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className={style.addBox_left_box_top_card_item}
                disabled={uploading}
              />
              {images.length > 0 && (
                <div className={style.imagePreviewContainer}>
                  {images.map((image, index) => (
                    <div key={index} className={style.imagePreviewBox}>
                      <img
                        src={image}
                        alt={`Preview ${index}`}
                        className={style.imagePreview}
                      />
                      <button
                        className={style.imageRemoveButton}
                        onClick={() => handleRemoveImage(index)}
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* Submit Button */}
            <div className={style.submitButtonContainer}>
              <button
                onClick={handleSubmit}
                className={style.submitButton}
                disabled={uploading}
              >
                {uploading ? t("addProductPageUploadingText") : t("saveText")}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <FooterResponsive />
      <Contack />
    </div>
  );
};

export default NewProductAdd;
