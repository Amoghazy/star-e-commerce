import { Link } from "react-router-dom";
import IProduct from "../types/IProduct";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavourite,
  removeFromFavourite,
} from "../redux/slices/favouriteSlice";
import { useEffect, useState } from "react";

export default function Product({ product }: { product: IProduct }) {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state: any) => state);
  const isExist = favourites.some((p: IProduct) => p._id === product._id);
  const [isFavourite, setIsFavourite] = useState(isExist);
  useEffect(() => {}, [favourites, isFavourite]);
  const toggelIsFavourite = () => {
    setIsFavourite(!isFavourite);
  };
  return (
    <Link
      to={`/product/${product._id}`}
      className="relative block rounded-lgrounded-mdrounded-md bg-neutral-950 group"
    >
      <img
        alt=""
        src={product.image}
        className="absolute inset-0 object-contain w-full transition-opacity opacity-75 h-96 group-hover:opacity-50"
      />
      <p className="absolute z-50 p-3 right-2 top-2 ">
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
      </p>

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium tracking-widest uppercase text-primary">
          {product.category?.name}
        </p>

        <p className="text-xl font-bold text-white sm:text-2xl text-nowrap text-ellipsis line-clamp-1">
          {product.name}
        </p>

        <div className="mt-64">
          <div className="transition-all transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white text-ellipsis line-clamp-3">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
