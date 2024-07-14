/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoCodeReview } from "react-icons/go";

import { TbCirclesRelation } from "react-icons/tb";

import { MdOutlineRateReview } from "react-icons/md";
import IProduct from "../../types/IProduct";
import { useState } from "react";
import {
  useAddReviewMutation,
  useGetProductsByCategoryQuery,
} from "../../redux/api/productApiSilce";
import { toast } from "react-toastify";
import moment from "moment";
import RatingStar from "./RatingStar";
import Loader from "../../components/Loader";
import Product from "../../components/Product";
export default function ProductTabs({ product }: { product: IProduct }) {
  const [isSelectedTab, setIsSelectedTab] = useState(1);
  const [rate, setRate] = useState(0);
  const [comment, setComment] = useState("");
  const [addReview, { isLoading: isLoadingAddReview }] = useAddReviewMutation();
  const { data: relatedProducts, isLoading: isLoadingRelatedProducts } =
    useGetProductsByCategoryQuery(product?.category?._id as string);

  const handelAddReview = async () => {
    try {
      const res = await addReview({
        data: {
          rating: rate,
          comment,
        },
        id: product._id,
      }).unwrap();

      setRate(0);
      setComment("");
      toast.success(res?.message || "Review Added");
    } catch (error: any) {
      setRate(0);
      setComment("");
      console.log(error?.data?.message);
      toast.error(error?.data?.message || "some thing is wrong");
    }
  };

  return (
    <>
      <div className="mr-3 mt-7">
        <div>
          <nav className="flex justify-center gap-6 -mb-px cursor-pointer">
            <span
              onClick={() => setIsSelectedTab(1)}
              className={` ${
                isSelectedTab === 1
                  ? "text-primary border-primary   "
                  : "border-transparent "
              } flex  items-center gap-2 px-1 pb-4 text-sm font-medium border-b-2  hover:border-gray-300 hover:text-gray-400 `}
            >
              <MdOutlineRateReview />
              Add Review
            </span>

            <span
              onClick={() => setIsSelectedTab(2)}
              className={` ${
                isSelectedTab === 2
                  ? "text-primary border-primary   "
                  : "border-transparent "
              } flex  items-center gap-2 px-1 pb-4 text-sm font-medium border-b-2  hover:border-gray-300 hover:text-gray-400 `}
            >
              {" "}
              <GoCodeReview />
              All Reviews
            </span>

            <span
              onClick={() => setIsSelectedTab(3)}
              className={` ${
                isSelectedTab === 3
                  ? "text-primary border-primary   "
                  : "border-transparent "
              } flex  items-center gap-2 px-1 pb-4 text-sm font-medium border-b-2  hover:border-gray-300 hover:text-gray-400 `}
            >
              {" "}
              <TbCirclesRelation />
              Related Products
            </span>
          </nav>
        </div>

        <div className="container flex justify-center mt-5">
          {" "}
          <div className="w-10/12 ">
            {isSelectedTab === 1 ? (
              <div>
                <div className="flex items-center gap-5">
                  <span className="text-lg font-semibold">
                    Select Your Rate
                  </span>

                  <select
                    value={rate}
                    onChange={(e) => {
                      setRate(+e.target.value);
                    }}
                    className="w-4/12 border-none rounded-md focus:ring-0 focus:border-none text-neutral-800"
                  >
                    <option value={1}>Very Bad</option>
                    <option value={2}>Bad</option>
                    <option value={3}>Good</option>
                    <option value={4}>Very Good</option>
                    <option value={5} selected>
                      Excellent
                    </option>
                  </select>
                </div>
                <div className="mt-5">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-10/12 h-40 bg-transparent rounded-md focus:ring-0 focus:border-primary"
                    placeholder="Write your Review"
                  />
                </div>
                <button
                  onClick={handelAddReview}
                  className="block p-2 ml-auto rounded-md bg-primary hover:bg-secondry"
                  disabled={rate === 0}
                >
                  Add Review
                </button>
                {isLoadingAddReview && <Loader />}
              </div>
            ) : isSelectedTab === 2 ? (
              <div className="flex flex-col items-center justify-center gap-5 my-5 overflow-y-auto rounded-md bg-slate-500 bg-opacity-55">
                {product?.reviews?.map((review: any) => (
                  <div
                    key={review?._id}
                    className="w-full p-4 rounded-md lg:w-[60rem] "
                  >
                    <div className="relative w-10/12 p-4 mx-auto bg-gray-700 rounded-md">
                      <div className="flex items-center gap-2">
                        <h1 className="text-xl font-medium text-gray">
                          {review?.name}
                        </h1>
                        <p className="text-slate-500">
                          {moment(review?.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>
                      <p className="text-slate-400">{review?.comment}</p>

                      <div className="flex items-center gap-1 text-slate-200">
                        Rating:{" "}
                        <RatingStar showText={false} rating={review?.rating} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isSelectedTab === 3 ? (
              <div className="flex flex-wrap justify-center gap-4">
                {isLoadingRelatedProducts && <Loader />}
                {relatedProducts?.data?.map((product: IProduct) => (
                  <div
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    key={product?._id}
                    className="w-[20rem]"
                  >
                    <Product product={product} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
