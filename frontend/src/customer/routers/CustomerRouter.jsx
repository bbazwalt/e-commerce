import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../../redux/auth/authContext";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navigation/Navigation";
import Cart from "../pages/cart/Cart";
import Home from "../pages/home/Home";
import Checkout from "../pages/order/Checkout";
import Order from "../pages/order/Order";
import OrderDetails from "../pages/order/OrderDetails";
import PaymentSuccess from "../pages/order/PaymentSuccess";
import Product from "../pages/product/Product";
import ProductDetails from "../pages/product/ProductDetails";
const CustomerRouter = () => {
  const { auth } = useAuth();

  const PrivateRoute = ({ children }) => {
    return auth.token ? children : <Navigate to="/" replace />;
  };

  return (
    <div className="flex min-h-screen flex-col">
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
            path="/order/all"
            element={
              <PrivateRoute>
                <Order />
              </PrivateRoute>
            }
          />
          <Route
            path="/order/:orderId"
            element={
              <PrivateRoute>
                <OrderDetails />
              </PrivateRoute>
            }
          />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default CustomerRouter;
