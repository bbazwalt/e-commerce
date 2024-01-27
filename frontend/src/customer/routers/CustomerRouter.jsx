import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Cart from "../components/cart/Cart";
import Checkout from "../components/checkout/Checkout";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navigation/Navigation";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import Product from "../components/product/Product";
import ProductDetails from "../components/product/details/ProductDetails";
import Home from "../pages/Home";
const CustomerRouter = () => {
  const PrivateRoute = ({ children }) => {
    return localStorage.getItem("jwt") != null ? children : <Navigate to="/" />;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route path="/:category/:section" element={<Product />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment/:orderId"
            element={
              <PrivateRoute>
                <PaymentSuccess />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerRouter;
