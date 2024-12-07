import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // Stores liked products
};

const likedProductsSlice = createSlice({
  name: 'likedProducts',
  initialState,
  reducers: {
    addLikedProduct: (state, action) => {
      const newProduct = action.payload;
      const productExists = state.items.some(
        (item) => item.productId === newProduct.productId
      );

      if (productExists) {
        // If the product is already liked, remove it
        state.items = state.items.filter(
          (item) => item.productId !== newProduct.productId
        );
      } else {
        // If the product is not liked, add it
        state.items.push(newProduct);
      }
    },
  },
});

export const { addLikedProduct } = likedProductsSlice.actions;
export const selectLikedProducts = (state) => state.likedProducts.items;
export default likedProductsSlice.reducer;
