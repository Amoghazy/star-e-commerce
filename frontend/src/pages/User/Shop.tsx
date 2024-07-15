/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { useGetFiltredProductsQuery } from "../../redux/api/productApiSilce";
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

export default function Shop() {
  const { checkedCategory, checkedBrand, products, allBrands, visibleBrands } =
    useSelector((state: any) => state.shop);
  const dispatch = useDispatch();
  const [visBrands, setVisBrands] = useState<string[]>([]);
  const { data: filtretedProducts } = useGetFiltredProductsQuery({
    category: checkedCategory,
    brand: checkedBrand,
  });

  useEffect(() => {
    if (filtretedProducts?.data) {
      dispatch(setProducts(filtretedProducts.data));
      const brands = new Set<string>();
      filtretedProducts.data.forEach((product: IProduct) => {
        brands.add(product.brand);
      });
      dispatch(setAllBrands(Array.from(brands)));

      // updateVisibleBrands(filtretedProducts.data);
    }
  }, [filtretedProducts, dispatch]);
  useEffect(() => {
    updateVisibleBrands(products);
  }, [products]);
  const updateVisibleBrands = (products: IProduct[]) => {
    const newVisBrands = new Set<string>();
    products.forEach((product: IProduct) => {
      newVisBrands.add(product.brand);
    });
    setVisBrands(Array.from(newVisBrands));
  };

  useEffect(() => {
    console.log("checkedcategorycahnge");
    console.log("visbrands", visBrands);
    console.log(products);
    updateVisibleBrands(products);
  }, [checkedCategory]);

  return (
    <>
      <section className="pl-3 mx-auto lg:pl-20 ">
        <ShopFilter brands={visBrands} />
        <section className="flex flex-wrap justify-center products pl-[42%] lg:pl-[27%] ">
          {products?.slice(0, 10)?.map((product: IProduct) => (
            <div
              key={product._id}
              className="w-[19rem]    p-3  backdrop-blur-md"
            >
              <ProductCardShop product={product} />
            </div>
          ))}
        </section>
      </section>
    </>
  );
}
