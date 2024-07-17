import IProduct from "../types/IProduct";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateCart = (state: any) => {
  state.itemsPrice = state.cartItems
    .reduce(
      (acc: number, item: IProduct) => acc + item.price * item.countPices!,
      0
    )
    .toFixed(2);

  state.shippingPrice =
    state.itemsPrice == 0 ? 0 : state.itemsPrice > 100 ? 0 : 10;

  state.taxPrice = Number((0.15 * state.itemsPrice).toFixed(2));
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
