import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../../layout/Header/DesktopNavbar/Navbar"
import Footer from "../../layout/footer/Footer"
import FooterResponsive from "../../layout/footer_responsive/FooterResponsive"
import Contack from "../../page/about/Contack";
import ProductAddRuleCard from "../../page/newProductAdd/productAdd_ruleCard/ProductAddRuleCard";
import style from "./editProduct.module.css"

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product } = location.state || {};  

  const initialImages =
    product.productGalleries.length > 0
      ? product.productGalleries.map((gallery) => gallery.productGalleryFile)
      : ["https://via.placeholder.com/150"];

  const [updatedProduct, setUpdatedProduct] = useState({
    productId: product.productId,
    productTitle: product.productTitle || "",
    description: product.productDescription,
    images: initialImages,
    parameters: {
      price: product.price,
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "price") {
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        parameters: {
          ...prevProduct.parameters,
          price: value,
        },
      }));
    } else if (name === "description") {
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        description: value,
      }));
    } else {
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };  

  const handleImageAdd = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage);
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        images: [...prevProduct.images, imageUrl],
      }));
    }
  };

  const handleImageDelete = (index) => {
    if (updatedProduct.images.length > 1) {
      const updatedImages = updatedProduct.images.filter((_, i) => i !== index);
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        images: updatedImages,
      }));
    } else {
      alert("Minimum 1 fotoğraf olmalı!");
    }
  };

  const handleUpdateProduct = async () => {
    if (
      !updatedProduct.parameters.price ||
      !updatedProduct.description ||
      !updatedProduct.productTitle
    ) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
  
    const payload = {
      productId: updatedProduct.productId,
      productTitle: updatedProduct.productTitle,
      description: updatedProduct.description,
      images: updatedProduct.images,
      parameters: {
        price: updatedProduct.parameters.price.toString(),
      },
    };    
  
    try {
      const response = await fetch(
        "https://restartbaku-001-site3.htempurl.com/api/Product/product-update",
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );
  
      console.log("Raw response:", response);
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response body:", errorText);
        alert(`Error: ${response.statusText}`);
        return;
      }
  
      const result = await response.json();
      console.log("Success:", result);
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };
  
  const isFormValid =
    updatedProduct.parameters.price &&
    updatedProduct.description &&
    updatedProduct.productTitle;

  return (
    <div className={style.EditProduct}>
      <Navbar/>
      <div className="container">
        <div className={style.editProduct_main}>
        <h2 className={style.editProduct_main_left_title}>{product.productTitle},
                {product.parameters && product.parameters.length > 0 && (
                  <span className={style.detailPage_main_bottom_head_title}>
                    {product.parameters[0].parameterValue &&
                      product.parameters[0].parameterValue
                        .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, " ")} AZN
                  </span>                
                )},
                {product.parameters?.[1] && (<span className={style.detailPage_main_bottom_left_price}>{product.parameters[1].parameterValue}</span>)}
            </h2>
            <div className={style.editProduct_main_left_container}>
              <div className={style.editProduct_main_left}>
                <div className={style.editProduct_main_left_item}>
                  <span className={style.editProduct_main_left_item_title}>Məhsulun adı</span>
                  <input
                    type="text"
                    name="productTitle"
                    value={updatedProduct.productTitle}
                    onChange={handleInputChange}
                    required
                    className={style.editProduct_main_left_item_input}
                  />
                </div>
                <div className={style.editProduct_main_left_item}>
                  <span className={style.editProduct_main_left_item_title}>Qiymət-AZN:</span>
                  <input
                    type="number"
                    name="price"
                    value={updatedProduct.parameters.price}
                    onChange={handleInputChange}
                    required
                    className={style.editProduct_main_left_item_input}
                  />
                </div>
                <div className={style.editProduct_main_left_item_chooseBox_containers}>
                  <p className={style.editProduct_main_left_item_title}>Şəkil əlavə et(sadəcə jpg formatlarında şəkil yükləyə bilərsiniz)</p>
                  <div className={style.editProduct_main_left_item_chooseBox_card}>
                    <div className={style.editProduct_main_left_item_chooseBox_container}>
                      {updatedProduct.images.map((image, index) => (
                        <div key={index} className={style.editProduct_main_left_item_chooseBox}>
                            <img className={style.editProduct_main_left_item_chooseBox_Img} src={image} />
                            <button className={style.editProduct_main_left_item_chooseBox_deleteIcon} onClick={() => handleImageDelete(index)}>X</button>
                        </div>
                      ))}
                    </div>
                    <input type="file" onChange={handleImageAdd} className={style.editProduct_main_left_item_chooseBox_container_addInput}/>
                  </div>
                </div>
                <div className={style.editProduct_main_left_item}>
                  <span className={style.editProduct_main_left_item_title}>Məzmun:</span>
                  <textarea
                    name="description"
                    value={updatedProduct.description}
                    onChange={handleInputChange}
                    required
                    className={style.editProduct_main_left_item_input}
                  />
                </div>
                <button onClick={handleUpdateProduct} disabled={!isFormValid} className={style.editProduct_btn}>
                  Elanı Yenilə
                </button>
              </div>
                 <ProductAddRuleCard/>
            </div>
        </div>
      </div>
      <Contack/>
      <Footer/>
      <FooterResponsive/>
    </div>
  );
};

export default EditProduct;