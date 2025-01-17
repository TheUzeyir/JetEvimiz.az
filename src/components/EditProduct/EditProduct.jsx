import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
      parameters: updatedProduct.parameters,
    };

    try {
      const response = await fetch(
        "https://restartbaku-001-site3.htempurl.com/api/Product/product-update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.status === 401) {
        alert("Oturumunuzun süresi doldu, lütfen tekrar giriş yapın.");
        navigate("/login");
        return;
      }

      const result = await response.json();

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/product-details");
      } else {
        alert(result.message || "Failed to update the product.");
      }
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
    <div>
      <p>
        Başlıq:
        <input
          type="text"
          name="productTitle"
          value={updatedProduct.productTitle}
          onChange={handleInputChange}
          required
        />
      </p>
      <p>
        Qiymət:
        <input
          type="number"
          name="price"
          value={updatedProduct.parameters.price}
          onChange={handleInputChange}
          required
        />
      </p>
      <p>
        Məzmun:
        <textarea
          name="description"
          value={updatedProduct.description}
          onChange={handleInputChange}
          required
        />
      </p>

      <div>
        <h3>Product Galleries</h3>
        {updatedProduct.images.map((image, index) => (
          <div key={index}>
            <img src={image} alt={`Gallery Image ${index + 1}`} width="100" />
            <button onClick={() => handleImageDelete(index)}>Delete Image</button>
          </div>
        ))}
        <input type="file" onChange={handleImageAdd} />
      </div>
      <button onClick={handleUpdateProduct} disabled={!isFormValid}>
        Elanı Yenilə
      </button>
    </div>
  );
};

export default EditProduct;
