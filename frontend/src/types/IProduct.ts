/* eslint-disable @typescript-eslint/no-explicit-any */
export default interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: {
    name: string;
    _id: string;
  };
  countInStock: number;
  rating: number;
  numReviews: number;
  brand: string;
  ceatedAt: Date;
  updatedAt: Date;
  reviews: any[];
  countPices?: number;
}
