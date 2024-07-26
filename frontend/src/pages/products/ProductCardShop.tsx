/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import IProduct from "../../types/IProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addToFavourite,
  removeFromFavourite,
} from "../../redux/slices/favouriteSlice";
import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";
import { getImage } from "../../cashImage";

export default function ProductCardShop({ product }: { product: IProduct }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [image, setImage] = useState(product.image);
  useEffect(() => {
    if (product) {
      getImage(product.image).then((cachedImage) => {
        if (cachedImage) {
          setImage(URL.createObjectURL(cachedImage.blob));
        }
      });
    }
  }, [product]);

  const favourites = useSelector((state: any) => state.favourites);
  const isExist = favourites.some((p: IProduct) => p._id === product._id);
  const [isFavourite, setIsFavourite] = useState(isExist);
  const toggelIsFavourite = () => {
    setIsFavourite(!isFavourite);
  };
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        countPices: 1,
      })
    );
  };

  return (
    <div className="relative flex w-full max-w-[26rem] flex-col rounded-xl bg-white  bg-clip-border text-gray-700 shadow-lg">
      <div className="relative flex justify-center mx-4 mt-4 overflow-hidden text-white border shadow-lg rounded-xl bg-clip-border shadow-[#e0e0e0]">
        <img src={image} alt={product.name} className="object-contain h-48 " />
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
        <span className="absolute px-1 rounded-lg bottom-4 right-4 bg-primary/60">
          {" "}
          {product.brand}
        </span>
        <button
          className="!absolute  top-4 right-4 h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase  transition-all hover:bg-secondry/30 active:bg-secondry/60 "
          type="button"
        >
          <span className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {isFavourite ? (
              <FaHeart
                size={22}
                className="text-primary "
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggelIsFavourite();
                  dispatch(removeFromFavourite(product));
                }}
              />
            ) : (
              <FaRegHeart
                size={22}
                className="text-white"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggelIsFavourite();
                  dispatch(addToFavourite(product));
                }}
              />
            )}
          </span>
        </button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between ">
          <h5 className="font-sans text-xl font-medium leading-snug tracking-normal text-ellipsis line-clamp-1">
            {product.name}
          </h5>
          <p className="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
            <FaStar color="orange" /> {product.rating}
          </p>
        </div>
        <p className="font-sans text-lg font-bold">${product.price}</p>
        <p className="font-sans text-base antialiased font-light text-gray-700 line-clamp-2 text-ellipsis">
          {product.description}
        </p>
      </div>
      {product?.countInStock == 0 && (
        <p className="ml-5 mr-auto font-sans text-lg text-red-500 text-balance">
          {" "}
          out of stock
        </p>
      )}
      <div className="flex justify-between w-full p-6 pt-3">
        <button
          onClick={() => navigate(`/product/${product._id}`)}
          className=" select-none flex gap-1 rounded-lg bg-primary py-2 px-3 text-center  font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          Read More <HiOutlineArrowLongRight size={20} />
        </button>
        <button
          disabled={product?.countInStock == 0}
          onClick={handleAddToCart}
          className={` transition-all   hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85]   hover:scale-105  focus:scale-105  active:scale-100 ${
            product?.countInStock == 0 ? "cursor-not-allowed text-gray-500" : ""
          }`}
          type="button"
        >
          <GiShoppingCart size={35} />
        </button>
      </div>
    </div>
  );
}
