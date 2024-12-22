import React from "react";
import { useLocation } from "react-router-dom";

const Simple = () => {
  const location = useLocation();
  const product = location.state || {};

  return (
    <div>
      <h1>{product.productTitle || "Ürün Başlığı Bulunamadı"}</h1>
      <img src={product.coverImage} alt={product.productTitle} />
      <p>ID: {product.productId}</p>
      <p>Price: {product.price} AZN</p>
      <p>City: {product.city}</p>
    </div>
  );
};

export default Simple;
