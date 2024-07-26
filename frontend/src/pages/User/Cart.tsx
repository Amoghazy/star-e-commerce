/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateCountPices } from "../../redux/slices/cartSlice";
import IProduct from "../../types/IProduct";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state: any) => state);
  const handleRemoveFromCart = (item: any) => {
    dispatch(removeFromCart(item));
  };
  return (
    <>
      <section>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-xl font-bold text-center sm:text-3xl">
              Your Cart
            </h1>

            <div className="mt-8">
              <ul className="space-y-4">
                {cart?.cartItems?.map((item: IProduct) => (
                  <li key={item._id} className="flex items-center gap-4">
                    <img
                      src={item?.image}
                      alt=""
                      className="object-contain bg-white rounded size-16"
                    />

                    <div>
                      <h3 className="text-sm "> {item?.name}</h3>

                      <div className="mt-0.5 space-y-px text-[10px]">
                        <p className="inline">{item?.brand}</p>

                        <p>{item?.category?.name}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-end flex-1 gap-2">
                      <form>
                        <label htmlFor="Quantity" className="">
                          {" "}
                          Quantity{" "}
                        </label>

                        <select
                          onChange={(e) => {
                            dispatch(
                              updateCountPices({
                                ...item,
                                countPices: Number(e.target.value),
                              })
                            );
                          }}
                          id="Quantity"
                          className="w-16 h-8 p-0 text-xs text-center text-gray-600 border-gray-200 rounded bg-gray-50 focus:outline-none focus:ring-0 focus:border-0 "
                        >
                          {[...Array(item?.countInStock)].map((_, x) => (
                            <option
                              selected={item?.countPices === x + 1}
                              key={x + 1}
                              value={x + 1}
                            >
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </form>

                      <button
                        onClick={() => handleRemoveFromCart(item)}
                        className="text-gray-600 transition hover:text-red-600"
                      >
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="flex justify-end pt-8 mt-8 border-t border-gray-100">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-300">
                    <div className="flex justify-between">
                      <dt>Subtotal</dt>
                      <dd>${cart.itemsPrice}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Tax</dt>
                      <dd>${cart.taxPrice}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Shipping</dt>
                      <dd>${cart.shippingPrice}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt>Discount</dt>
                      <dd>-${0}</dd>
                    </div>

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>${cart.totalPrice}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end"></div>

                  <div className="flex justify-end">
                    <Link
                      to="/shipping"
                      className="block px-5 py-3 text-sm text-gray-100 transition rounded bg-primary hover:bg-secondry"
                    >
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
