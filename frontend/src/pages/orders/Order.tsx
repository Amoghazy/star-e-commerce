/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import {
  useGetPaypalConfigQuery,
  useGetSpecificOrderQuery,
  useMakeOrderDeliveredMutation,
  useMakeOrderPaidMutation,
} from "../../redux/api/orderApiSlice";
import Divider from "../../components/Divider";
import {
  usePayPalScriptReducer,
  PayPalButtons,
  SCRIPT_LOADING_STATE,
} from "@paypal/react-paypal-js";
import Loader from "../../components/Loader";
import { useEffect } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";

export default function Order() {
  const { id } = useParams();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { data: orderData, isLoading } = useGetSpecificOrderQuery(id);
  const [deliverd, { isLoading: isLoadingDelivery }] =
    useMakeOrderDeliveredMutation();
  const [paid, { isLoading: isLoadingPay }] = useMakeOrderPaidMutation();

  const [{ isPending }, dispatchPayPal] = usePayPalScriptReducer();
  const { data: clientId, isLoading: isLoadingPaypalClient } =
    useGetPaypalConfigQuery();

  useEffect(() => {
    if (clientId && !isLoadingPaypalClient) {
      dispatchPayPal({
        type: "resetOptions",
        value: { currency: "USD", clientId },
      });
      dispatchPayPal({
        type: "setLoadingStatus",
        value: SCRIPT_LOADING_STATE.PENDING,
      });
    }
  }, [dispatchPayPal, clientId, isLoadingPaypalClient]);

  const deliverHandler = async () => {
    try {
      await deliverd(orderData?.data?._id).unwrap();
      toast.success("Order delivered successfully");
    } catch (error: any) {
      toast.error(error?.data?.message || "Error In Delivery");
    }
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderData?.data?.totalPrice,
            },
          },
        ],
      })
      .then((orderID: string) => {
        console.log("Order ID created:", orderID);
        return orderID;
      })
      .catch((err: any) => {
        console.error("Error creating order:", err);
        toast.error(err.message);
      });
  };

  const onApprove = async (data: any, actions: any) => {
    return actions.order
      .capture()
      .then(async (details: any) => {
        await paid({ id: orderData?.data?._id, details }).unwrap();
        toast.success("Order Paid successfully");
      })
      .catch((err: any) => {
        console.error("Error capturing order:", err);
        toast.error(err.message);
      });
  };

  const onError = (err: any) => {
    console.error("Error during PayPal transaction:", err);
    toast.error(err.message || err?.data?.message);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex justify-around gap-4 px-20 pt-10">
      <div className="overflow-x-auto">
        <table className="text-sm bg-white divide-y-2 divide-gray-200">
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
                Quantity
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
            {orderData?.data?.orderItems?.map((item: any, index: number) => (
              <tr className="text-center" key={index}>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="px-4 py-2">
                  <img
                    className="object-contain w-20 h-20 mx-auto min-w-20"
                    src={item.image}
                    alt="product"
                  />
                </td>
                <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                  {item.qty}
                </td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                  ${item.price}
                </td>
                <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                  ${+item.qty * +item.price}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={5} className="px-4 py-2 font-bold text-gray-900">
                Total
              </td>
              <td className="px-4 py-2 text-center text-gray-700 whitespace-nowrap">
                ${orderData?.data?.totalPrice}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="">
        <h1 className="text-3xl font-semibold uppercase">Order Information</h1>
        <div className="p-3 mt-2 uppercase bg-neutral-700">
          <p>
            <span className="font-semibold text-primary">Order Id :</span>
            {orderData?.data?._id}
          </p>
          <p>
            <span className="font-semibold text-primary">User Name :</span>
            {orderData?.data?.user?.username}
          </p>
          <p>
            <span className="font-semibold text-primary">User Email :</span>
            {orderData?.data?.user?.email}
          </p>
          <p>
            <span className="font-semibold text-primary">
              Shipping Address :
            </span>
            {orderData?.data?.shippingAddress?.address},{" "}
            {orderData?.data?.shippingAddress?.country}
          </p>
          <p>
            <span className="font-semibold text-primary">Payment Method :</span>
            {orderData?.data?.paymentMethod}
          </p>
        </div>
        {orderData?.data?.isPaid ? (
          <div className="p-3 mt-2 font-sans font-semibold bg-neutral-300 text-neutral-950">
            <p>
              <span className="font-semibold text-secondary/75">Paid At :</span>
              {moment(orderData?.data?.paidAt).format("Do-MM-YYYY")}
            </p>
          </div>
        ) : (
          <div className="p-3 mt-2 bg-neutral-300">
            <p>
              <span className="font-semibold text-secondary/90">Not Paid</span>
            </p>
          </div>
        )}
        <h1 className="mt-3 text-xl font-semibold">Order Summary</h1>
        <div className="p-2 mt-4 border bg-neutral-800">
          <div className="flex justify-between p-4 pb-1">
            <p className="text-sm">Subtotal</p>
            <p className="text-sm">${orderData?.data?.itemsPrice}</p>
          </div>
          <Divider cls="pr-6 mb-2" />
          <div className="flex justify-between p-4 pt-0 pb-1">
            <p className="text-sm">Shipping</p>
            <p className="text-sm">${orderData?.data?.shippingPrice}</p>
          </div>
          <Divider cls="pr-6 mb-2" />
          <div className="flex justify-between p-4 pt-0 pb-1">
            <p className="text-sm">Tax</p>
            <p className="text-sm">${orderData?.data?.taxPrice}</p>
          </div>
          <Divider cls="pr-6 mb-2" />
          <div className="flex justify-between p-4 pt-0 pb-1">
            <p className="text-sm">Total</p>
            <p className="text-sm">${orderData?.data?.totalPrice}</p>
          </div>
        </div>
        {!orderData?.data?.isPaid && (
          <div>
            {isLoadingPay && <Loader />}
            {isPending ? (
              <Loader />
            ) : (
              <PayPalButtons
                className="mt-2"
                createOrder={createOrder}
                onApprove={onApprove}
                onError={onError}
              />
            )}
          </div>
        )}
        {orderData?.data?.isPaid &&
          userInfo?.isAdmin &&
          !orderData?.data?.isDelivered && (
            <div>
              {isLoadingDelivery && <Loader />}
              <button
                onClick={deliverHandler}
                className="w-full p-2 mt-2 font-semibold text-white uppercase rounded-lg bg-primary hover:bg-secondary"
              >
                Mark As Delivered
              </button>
            </div>
          )}
      </div>
    </div>
  );
}
