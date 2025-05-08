// utils/cartUtils.js
export const updateCart = (state) => {
  // Calculate itemsPrice
  state.itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Calculate shippingPrice (example logic)
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  // Calculate taxPrice (example logic)
  state.taxPrice = 0.15 * state.itemsPrice;

  // Calculate totalPrice
  state.totalPrice = state.itemsPrice + state.shippingPrice + state.taxPrice;

  // Round to 2 decimal places
  state.itemsPrice = Number(state.itemsPrice.toFixed(2));
  state.shippingPrice = Number(state.shippingPrice.toFixed(2));
  state.taxPrice = Number(state.taxPrice.toFixed(2));
  state.totalPrice = Number(state.totalPrice.toFixed(2));

  localStorage.setItem('cart', JSON.stringify(state));
  return state;
};