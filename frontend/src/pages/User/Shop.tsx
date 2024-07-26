/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import {
  useGetBrandsByCategoryQuery,
  useGetFiltredProductsQuery,
} from "../../redux/api/productApiSilce";
import ShopFilter from "./ShopFilter";
import { useEffect, useMemo, useState } from "react";
import {
  setAllBrands,
  setBrands,
  setProducts,
  setVisibleBrands,
} from "../../redux/slices/shopSlice";

import IProduct from "../../types/IProduct";
import ProductCardShop from "../products/ProductCardShop";
import Pagenation from "../../components/Pagenation";

export default function Shop() {
  const { checkedCategory, checkedBrand, products, price } = useSelector(
    (state: any) => state.shop
  );
  const dispatch = useDispatch();
  const { data: filtretedProducts } = useGetFiltredProductsQuery({
    category: checkedCategory,
    brand: checkedBrand,
    price,
  });

  const [cuurentPage, setCurrentpage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cuurentPage]);
  useEffect(() => {
    if (filtretedProducts?.data) {
      dispatch(setProducts(filtretedProducts.data));
      const brands = new Set<string>();
      filtretedProducts.data.forEach((product: IProduct) => {
        brands.add(product.brand);
      });
      dispatch(setAllBrands(Array.from(brands)));
    }
  }, [filtretedProducts, dispatch]);
  useEffect(() => {
    setCurrentpage(1);
  }, [checkedCategory, checkedBrand, price]);

  const skip = (cuurentPage - 1) * 9;
  const limit = 9 + skip;
  return (
    <>
      <section className="pl-3 mx-auto lg:pl-20 ">
        <ShopFilter />
        <div className="flex flex-col justify-center">
          <section className="flex flex-wrap gap-y-3 justify-center products pl-[42%] lg:pl-[27%] ">
            {products?.slice(skip, limit)?.map((product: IProduct) => (
              <div
                key={product._id}
                className="w-[19rem]    p-3  backdrop-blur-md"
              >
                <ProductCardShop product={product} />
              </div>
            ))}
          </section>{" "}
          <div className="pl-[42%] lg:pl-[27%] flex justify-center mt-3">
            <Pagenation
              numberOfPages={Math.ceil(products.length / 10)}
              setPage={setCurrentpage}
              currentPage={cuurentPage}
            />
          </div>
        </div>
      </section>
    </>
  );
}
