import { useEffect } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function RatingStar({
  rating,
  numberReviews,
  showText = true,
}: {
  rating: number;
  numberReviews?: number;
  showText?: boolean;
}) {
  const fullStars = Math.floor(rating);
  const halfStars = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = Math.ceil(5 - (rating + halfStars));
  useEffect(() => {}, [rating]);
  return (
    <>
      {[...Array(fullStars || 0)].map((_, index) => (
        <FaStar key={index} color="orange" />
      ))}

      {[...Array(halfStars || 0)].map((_, index) => (
        <FaStarHalfAlt key={index} color="orange" />
      ))}
      {[...Array(emptyStars || 0)].map((_, index) => (
        <FaRegStar key={index} color="orange" />
      ))}
      {showText && <span>({numberReviews}) Reviews</span>}
    </>
  );
}
