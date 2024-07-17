/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  savePaymentMethod,
  saveShippingAddress,
} from "../../redux/slices/cartSlice";

export default function Shipping() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const { shippingAddress, paymentMethod: paymentMethodCart } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  console.log(paymentMethodCart);
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodCart || "");
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/checkout");
  };
  return (
    <>
      <div className="container max-w-3xl mx-auto">
        <div className="py-10">
          <h1 className="text-3xl font-bold">Shipping</h1>

          <div className="mt-10">
            <form onSubmit={handleSubmit}>
              <label className="block my-2"> Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="w-8/12 mb-2 bg-transparent rounded-md focus:border-primary"
              />
              <label className="block my-2"> Country</label>
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
                className="w-8/12 mb-2 bg-transparent rounded-md focus:border-primary"
              />
              <label className="block my-2"> City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
                className="w-8/12 mb-2 bg-transparent rounded-md focus:border-primary"
              />
              <label className="block my-2"> Postal Code</label>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                type="number"
                className="w-8/12 mb-2 bg-transparent rounded-md focus:border-primary"
              />
              <label className="block my-2"> Payment Method</label>
              <input
                value={"payPal"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
                checked={paymentMethod === "payPal"}
                type="radio"
                className="inline bg-transparent rounded-md text-primary checked:ring-0 checked:border-none checked:outline-none focus:border-primary"
              />
              <p className="inline ml-2">PayPal or CreditCard</p>
              <button
                disabled={!address && !city && !postalCode && !country}
                className="block w-8/12 p-2 mt-3 border rounded-full bg-primary hover:bg-secondry"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
