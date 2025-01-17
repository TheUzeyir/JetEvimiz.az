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

    console.log("Payload:", JSON.stringify(payload, null, 2));
  
    try {
      const response = await fetch(
        "https://restartbaku-001-site3.htempurl.com/api/Product/product-update",
        {
          method: "POST", // Changed from PUT to POST
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
  
  console.log("Updated Product Title:", updatedProduct.productTitle);


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