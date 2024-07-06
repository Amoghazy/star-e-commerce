/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import UnAuthorized from "../components/UnAuthorized";
import { Navigate } from "react-router-dom";
export default function GardAdmin({ children }: any) {
  const { userInfo } = useSelector((state: any) => state.auth);
  return userInfo?.isAdmin ? (
    <>{children}</>
  ) : userInfo ? (
    <UnAuthorized />
  ) : (
    <Navigate to="/login" />
  );
}
