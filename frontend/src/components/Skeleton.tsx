export default function Skeleton({
  width,
  hieght,
}: {
  width: number | string;
  hieght: number | string;
}) {
  return (
    <div
      role="status"
      className={`flex items-center justify-center ${width} bg-gray-700 rounded-lg animate-pulse  ${hieght}`}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
