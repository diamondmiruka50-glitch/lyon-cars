import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./Home";
import Admin from "./Admin";
import Inventory from "./Inventory";
import CarDetails from "./CarDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* INVENTORY PAGE */}
        <Route
          path="/inventory"
          element={<Inventory />}
        />

        {/* ADMIN PAGE */}
        <Route
          path="/admin"
          element={<Admin />}
        />

        {/* ADMIN INVENTORY */}
        <Route
          path="/admin-inventory"
          element={<Inventory />}
        />

        {/* CAR DETAILS */}
        <Route
          path="/car/:id"
          element={<CarDetails />}
        />

        {/* FALLBACK ROUTE */}
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}