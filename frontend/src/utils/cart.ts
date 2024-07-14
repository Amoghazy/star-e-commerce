export const updateCart = (state) => {
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
