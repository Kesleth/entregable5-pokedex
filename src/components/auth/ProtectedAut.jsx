import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAut = () => {
  const nameTrainerSlice = useSelector((store) => store.nameTrainerSlice);

  console.log(nameTrainerSlice);

  if (nameTrainerSlice) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedAut;
