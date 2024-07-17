/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import IProduct from "../../types/IProduct";
import Divider from "../../components/Divider";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PlaceOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress, paymentMethod: paymentMethodCart, cartItems } = cart;

  const [creatOrder] = useCreateOrderMutation();
  const placeOrderHandler = async (e: Event) => {
    e.preventDefault();
    try {
      const { data } = await creatOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod: paymentMethodCart,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      toast.success("Order created successfully");
      dispatch(clearCart());
      navigate(`/order/${data._id}`);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <>
      <div className="px-20">
        <div className="overflow-x-auto border border-gray-200 rounded-lg ">
          <table className="min-w-full text-sm bg-white divide-y-2 divide-gray-200">
            <thead className="ltr:text-left rtl:text-right">
              <tr>
                <th className="px-0 py-2 font-medium text-gray-900 whitespace-nowrap">
                  #
                </th>
                <th className="px-0 py-2 font-medium text-gray-900 whitespace-nowrap">
                  Image
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  Name
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  Quentity
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  Price
                </th>
                <th className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  Total
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {cartItems.map((item: IProduct, index: number) => (
                <tr className="text-center">
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2">
                    <img
                      className="object-contain w-20 h-20 mx-auto min-w-20 "
                      src={item.image}
                      alt="product"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                    {item.name}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    {item.countPices}
                  </td>

                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    ${item.price}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    ${+item.countPices! * +item.price}
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={5} className="px-4 py-2 font-bold text-gray-900">
                  Total
                </td>
                <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                  ${cart.itemsPrice}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h1 className="mt-3 text-xl font-semibold">Order Summary</h1>
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="mx-auto">
            <div className="p-2 mt-4 border rounded-lg w-96 bg-neutral-800">
              <div className="flex justify-between p-4 pb-1">
                <p className="text-sm">Subtotal</p>
                <p className="text-sm">${cart.itemsPrice}</p>
              </div>
              <Divider cls="pr-6 mb-2" />
              <div className="flex justify-between p-4 pt-0 pb-1">
                <p className="text-sm">Shipping</p>
                <p className="text-sm">${cart.shippingPrice}</p>
              </div>{" "}
              <Divider cls="pr-6 mb-2" />
              <div className="flex justify-between p-4 pt-0 pb-1">
                <p className="text-sm">Tax</p>
                <p className="text-sm">${cart.taxPrice}</p>
              </div>{" "}
              <Divider cls="pr-6 mb-2" />
              <div className="flex justify-between p-4 pt-0 pb-1">
                <p className="text-sm">Total</p>
                <p className="text-sm">${cart.totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <div className="p-2 mt-4 border rounded-lg w-96 bg-neutral-800">
              <h1>Shipping Address</h1>
              <Divider cls="pr-6 my-2" />
              <p>
                {shippingAddress.address.toUpperCase()}{" "}
                {shippingAddress.country.toUpperCase()}
              </p>
            </div>
          </div>
          <div className="mx-auto">
            <div className="p-2 mt-4 border rounded-lg w-96 bg-neutral-800">
              <h1>Payment Method</h1>
              <Divider cls="pr-6 my-2" />
              <p>{paymentMethodCart.toUpperCase()}</p>
            </div>
          </div>
        </div>
        <button
          onClick={placeOrderHandler}
          className="block w-8/12 p-2 mx-auto mt-3 border rounded-full bg-primary hover:bg-secondry"
        >
          Place Order
        </button>
      </div>
    </>
  );
}
