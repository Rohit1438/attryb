import React from "react";
import { Routes, Route } from "react-router-dom";

import Products from "../Pages/Products";
import SingleProductsPage from "../Pages/SingleProductsPage";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";


import SavedPage from "../Pages/SavedPage";
import ProfilePage from "../Pages/ProfilePage";
import { PrivateRoute } from "./PrivateRoute";
import Profile from "../Pages/ProfilePage";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/watchlist" element={<SavedPage />} />
      <Route path="/movies/:id" element={<SingleProductsPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
