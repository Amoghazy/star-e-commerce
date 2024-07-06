/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GardUser({ children }: any) {
  const { userInfo } = useSelector((state: any) => state.auth);

  return userInfo ? <>{children}</> : <Navigate to="/login" />;
}
