import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthContextProvider";

export const PrivateRoute = ({ children }) => {
  const { isAuth } = useContext(AuthContext);



  const token = localStorage.getItem("buycartoken") || "";
  //     const authentication=()=>{
  //         if(token){
  //            setIsAuth(true)
  //         }
  //     }

  // useEffect(()=>{
  // authentication()
  // },[])
  const location = useLocation();
//console.log(token)
  return token ? (
    children
  ) : (
    <Navigate
      // state={location.pathname}
      to={"/login"}
    />
  );
};
