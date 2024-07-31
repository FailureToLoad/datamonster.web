/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/react";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedLayout() {
  const { userId, isLoaded } = useAuth();
  const navigate = useNavigate();

  console.log("test", userId);

  if (isLoaded && !userId) {
    navigate("/sign-in");
  }

  if (!isLoaded) return <Spinner />;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <Outlet />;
    </div>
  );
}