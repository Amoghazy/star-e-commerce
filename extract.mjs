import fs from "fs";
const res = fetch("https://dummyjson.com/products/category/womens-watches")
  .then((res) => res.json())
  .then((data) => {
    const products = data.products.map((product) => {
      return {
        name: product.title,
        description: product.description,
        price: product.price,
        rating: product.rating,
        category: product.category,
        brand: product.brand,
        countInStock: product.stock,
        images: product.images[0],
      };
    });
    fs.writeFileSync(`${products[0].category}`, JSON.stringify(products));
  });
