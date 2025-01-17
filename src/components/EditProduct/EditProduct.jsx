import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { product } = location.state || {};

  const initialImages = product.productGalleries.length > 0 ? [...product.productGalleries] : [{ productGalleryFile: "https://via.placeholder.com/150" }];
  
  const [updatedProduct, setUpdatedProduct] = useState({
    productId: product.productId, // Include the productId for the API request
    price: product.price,
    productDescription: product.productDescription,
    productGalleries: initialImages,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageAdd = (e) => {
    const newImage = e.target.files[0];
    if (newImage) {
      const imageUrl = URL.createObjectURL(newImage);
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        productGalleries: [...prevProduct.productGalleries, { productGalleryFile: imageUrl }],
      }));
    }
  };

  const handleImageDelete = (index) => {
    if (updatedProduct.productGalleries.length > 1) {
      const updatedGalleries = updatedProduct.productGalleries.filter((_, i) => i !== index);
      setUpdatedProduct((prevProduct) => ({
        ...prevProduct,
        productGalleries: updatedGalleries,
      }));
    } else {
      alert("Minimum 1 fotoğraf olmalı!");
    }
  };

  // Handle the product update and send the data to the API
  const handleUpdateProduct = async () => {
    if (!updatedProduct.price || !updatedProduct.productDescription) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const formData = new FormData();
    formData.append("productId", updatedProduct.productId);
    formData.append("price", updatedProduct.price);
    formData.append("productDescription", updatedProduct.productDescription);

    // Append the image files to the formData
    updatedProduct.productGalleries.forEach((image, index) => {
      if (image.productGalleryFile) {
        formData.append(`productGalleryFiles[${index}]`, image.productGalleryFile);
      }
    });

    try {
      const response = await fetch("https://restartbaku-001-site3.htempurl.com/api/Product/product-update", {
        method: "PUT",
        body: formData,
      });

      const result = await response.json();
      
      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/product-details"); // Navigate to another page after update
      } else {
        alert(result.message || "Failed to update the product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("An error occurred while updating the product.");
    }
  };

  const isFormValid = updatedProduct.price && updatedProduct.productDescription;

  return (
    <div>
      <p>qiymet: 
        <input 
          type="number" 
          name="price" 
          value={updatedProduct.price} 
          onChange={handleInputChange} 
          required
        />
      </p>
      <p>mezmun: 
        <textarea
          name="productDescription"
          value={updatedProduct.productDescription}
          onChange={handleInputChange}
          required
        />
      </p>
      
      <div>
        <h3>Product Galleries</h3>
        {updatedProduct.productGalleries.map((item, index) => (
          <div key={index}>
            <img src={item.productGalleryFile} alt={`Gallery Image ${index + 1}`} width="100" />
            <button onClick={() => handleImageDelete(index)}>Delete Image</button>
          </div>
        ))}
        <input type="file" onChange={handleImageAdd} />
      </div>

      <button onClick={handleUpdateProduct} disabled={!isFormValid}>Elani Yenile</button>
    </div>
  );
};

export default EditProduct;
