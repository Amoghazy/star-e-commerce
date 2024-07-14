import Slider, { Settings } from "react-slick";
import IProduct from "./../types/IProduct";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function CarouselHeader({ products }: { products: IProduct[] }) {
  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} rounded-tr-md rounded-br-md  right-0  h-full content-center text-center w-5 bg-black bg-opacity-30 hover:bg-black hover:!bg-opacity-50 `}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <>
        <div
          className={`${className} rounded-tl-md rounded-bl-md   h-full left-0 content-center text-center w-5 bg-black bg-opacity-30 z-[1] hover:bg-black hover:!bg-opacity-50 `}
          onClick={onClick}
        />
      </>
    );
  }

  const settings: Settings = {
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 5000,
    swipeToSlide: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-screen pl-8 mb-3 max-w-fit">
      <Slider {...settings} className=" lg:w-[50rem]  w-11/12   ">
        {products?.slice(0, 5)?.map((product: IProduct) => (
          <div key={product._id} className="relative bg-white rounded-t-md">
            <img
              src={product.image}
              alt={product.name}
              className="block object-contain mx-auto bg-gray-300 shadow rounded-t-md w-fit h-96"
            />
            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 bg-opacity-60"></div>
            <div className="absolute w-full pl-3 bottom-3">
              <div className="container max-w-md p-3 space-y-1">
                <h2 className="text-2xl font-semibold">{product.name}</h2>
                <p className="pl-3 text-xl font-semibold">{product.price}$</p>
                <p className="text-ellipsis line-clamp-2">
                  {product.description}
                </p>
                <div className="flex gap-2">
                  <p className="text-sm">Brand : {product.brand}</p>
                  <p className="text-sm">Rating:{product.rating}</p>
                  <p className="text-sm"> Reviews :{product.numReviews}</p>
                </div>
                <button className="block w-3/12 p-2 !my-6 text-white rounded-md bg-gradient-to-tr from-sky-800 to-primary hover:bg-gradient-to-t hover:from-sky-600 hover:to-secondry">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
