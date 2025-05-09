import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

// Initialize state from localStorage, with migration for product IDs
const initialState = (() => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    try {
      const cart = JSON.parse(storedCart);
      // Migrate product IDs if necessary and return migrated cart
      if (cart.cartItems) {
        const migratedCartItems = cart.cartItems.map((item) => {
          if (item.product && typeof item.product === "object") {
            return {
              ...item,
              product: item.product._id || item._id,
            };
          }
          return item;
        });
        const migratedCart = { ...cart, cartItems: migratedCartItems };
        localStorage.setItem("cart", JSON.stringify(migratedCart)); //update the local storage
        return migratedCart;
      }
      return cart;
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      // Handle corrupted cart data (e.g., clear it or return a default)
      localStorage.removeItem("cart");
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "",
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
      };
    }
  }
  // Return a default initial state if no cart in localStorage
  return {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: "",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  };
})();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      if (!product?._id) {
        console.error("Invalid product added to cart:", product);
        return state;
      }
      const productId = product._id;
      const qty = action.payload.qty; // Ensure you're using the qty from the payload

      const cartItem = {
        product: productId,
        _id: productId,
        name: product.name,
        image: product.image,
        price: product.price,
        qty: qty,
        product: productId,
      };

      const existItem = state.cartItems.find((x) => x._id === productId);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === productId ? { ...x, qty: qty } : x // Update existing item's qty
        );
      } else {
        state.cartItems.push(cartItem);
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== itemIdToRemove);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart'); // also remove from local storage
      return state;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;
export default cartSlice.reducer;