/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import IProduct from "../../types/IProduct";
import Product from "../../components/Product";

export default function Favourites() {
  const favourites = useSelector((state: any) => state.favourites);
  return (
    <section className="px-20 mt-10">
      <h1 className="text-3xl font-semibold">Favourites</h1>
      <div className="flex flex-wrap pl-28">
        {favourites.map((product: IProduct) => (
          <div key={product._id} className="w-[20rem]    p-3  ">
            <Product product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
