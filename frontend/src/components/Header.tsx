import { Link } from "react-router-dom";
import { useGetTopRatingProductsQuery } from "../redux/api/productApiSilce";
import CarouselHeader from "./CarouselHeader";
import IProduct from "../types/IProduct";

export default function Header() {
  const { data: topProducts } = useGetTopRatingProductsQuery();
  return (
    <header className="flex items-center justify-around pt-4 ">
      <div className="hidden pl-6 xl:block ">
        <div className="grid grid-cols-2 gap-3 gap-x-8">
          {topProducts?.data?.slice(0, 4).map((product: IProduct) => (
            <div key={product._id} className="">
              <div className="w-[12rem]   p-3  backdrop-blur-md">
                <div className="relative">
                  <div className="w-full bg-white rounded-t-md">
                    <img
                      src={product.image}
                      className="block object-cover h-20 mx-auto my-2 rounded-md"
                    />
                  </div>
                  <div className="px-1 rounded-sm hover:bg-gray-100 group hover:text-sky-300">
                    <Link to={`/product/${product._id}`} className="">
                      <div className="flex items-center justify-between">
                        <p className=" text-ellipsis line-clamp-1">
                          {product?.name}
                        </p>
                        <p className="p-1 ml-2 rounded-sm text-nowrap bg-primary group-hover:bg-transparent">
                          {product.price} $
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CarouselHeader products={topProducts?.data} />
    </header>
  );
}
