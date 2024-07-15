import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useGetProductsByIdQuery } from "../../redux/api/productApiSilce";
import {
  FaArrowLeft,
  FaClock,
  FaShoppingBag,
  FaStar,
  FaStore,
} from "react-icons/fa";
import momment from "moment";
import RatingStar from "./RatingStar";
import { IoAdd, IoRemove } from "react-icons/io5";
import { useState } from "react";
import Skeleton from "../../components/Skeleton";
import { toast } from "react-toastify";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/slices/cartSlice";

export default function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductsByIdQuery(id);
  const [countPices, setCountPices] = useState(1);
  if (isError) {
    console.log(error);
    toast.error(
      error?.data?.message || "Something went wrong please reload the page"
    );
  }
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product?.data,
        countPices,
      })
    );
  };
  return (
    <>
      <section className="container w-full pt-5 pl-20 overflow-hidden">
        <Link to={`/`} className="flex items-center gap-1">
          <FaArrowLeft />
          <h1 className="text-3xl font-semibold hover:underline">Back Home</h1>
        </Link>

        <div className="flex justify-between mt-10 xl:px-10 gap-x-4">
          <div className="w-[50rem] h-[20rem] xl:h-[30rem] bg-neutral-50 bg-opacity-70 rounded-lg ">
            {isLoading || isError ? (
              <Skeleton width={"w-full"} hieght={"h-full"} />
            ) : (
              <img
                src={product?.data?.image}
                alt=""
                className="object-contain w-[50rem] h-[20rem] xl:h-[30rem] rounded-md filter drop-shadow-2xl   "
              />
            )}
          </div>{" "}
          {isLoading || isError ? (
            <>
              <div className="w-full h-full space-y-4 ">
                <Skeleton width={"w-64"} hieght={"h-8"} />
                <Skeleton width={"w-96"} hieght={"h-24"} />
                <Skeleton width={"w-96"} hieght={"h-8"} />
                <Skeleton width={"w-80"} hieght={"h-8"} />
                <Skeleton width={"w-84"} hieght={"h-8"} />
                <Skeleton width={"w-80"} hieght={"h-8"} />
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <h1 className="text-xl font-semibold md:text-3xl">
                {product?.data?.name}
              </h1>
              <p className="text-sm md:text-xl">{product?.data?.description}</p>
              <p className="text-4xl font-bold">{product?.data?.price}$</p>
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="space-y-4">
                  <p className="flex items-center gap-1">
                    <FaStore /> Brand : {product?.data?.brand}{" "}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaClock /> From :{" "}
                    {momment(product?.data?.createdAt).format("DD/MM/YYYY")}{" "}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaShoppingBag /> In Stock : {product?.data?.countInStock}{" "}
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center gap-1">
                    <FaStar /> Rating : {product?.data?.rating}{" "}
                  </p>
                  <p className="flex items-center gap-1">
                    <FaShoppingBag /> Reviews : {product?.data?.numReviews}{" "}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <RatingStar
                  numberReviews={product?.data?.numReviews}
                  rating={product?.data?.rating}
                />{" "}
              </div>
              <div className="flex justify-between">
                <div className="flex items-center ">
                  <button
                    disabled={countPices === 1}
                    onClick={() => setCountPices(countPices - 1)}
                    className="h-8 p-1 text-white rounded-l-sm bg-primary hover:bg-secondry"
                  >
                    <IoRemove />
                  </button>{" "}
                  <input
                    type="number"
                    min={1}
                    max={product?.data?.countInStock}
                    value={countPices}
                    disabled
                    className="w-10 h-8 px-2 text-center text-black border-none focus:ring-0 focus:border-none"
                  />
                  <button
                    onClick={() => setCountPices(countPices + 1)}
                    disabled={countPices === product?.data?.countInStock}
                    className="h-8 p-1 text-white rounded-r-sm bg-primary hover:bg-secondry"
                  >
                    <IoAdd />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="p-1 ml-2 text-sm rounded-md hover:bg-secondry bg-primary sm:text-base sm:p-2"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          )}
          <div></div>
        </div>
        <ProductTabs product={product?.data} />
      </section>
    </>
  );
}
