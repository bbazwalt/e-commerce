import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../store/order/action";
import { createPayment, skipPayment } from "../../../store/payment/action";
import AddressCard from "../address/AddressCard";
import CartItem from "../cart/CartItem";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const order = useSelector((state) => state.order.order);
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(createPayment(orderId));
  };

  const handleSkipPayment = () => {
    dispatch(skipPayment(orderId, navigate));
  };

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border">
        <AddressCard item={order?.address} />
      </div>
      <div className="-mt-5">
        <div className="lg:grid grid-cols-3 lg:px-18 relative mt-12">
          <div className="col-span-2">
            {order?.orderItems?.map((item) => (
              <CartItem isSummary={true} item={item} key={item?.id} />
            ))}
          </div>
          <div className="pl-5 top-0 h-[25rem] sticky mt-5 lg:mt-0">
            <div className="">
              <p className="uppercase font-bold opacity-60 pb-4">
                Price Details
              </p>
              <hr />
              <div className="space-y-3 font-semibold mb-10">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>₹{order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Discount</span>
                  <span className="text-green-600">-₹{order?.discount}</span>
                </div>
                <div className="flex justify-between pt-3 text-black">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3 text-black font-bold">
                  <span>Total Amount</span>
                  <span>₹{order?.totalDiscountedPrice}</span>
                </div>
              </div>
              <Button
                className="w-full mt-5"
                variant="contained"
                sx={{ px: "2rem", py: "1rem", bgcolor: "#1976D2" }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
              <div className="mt-4">
                {" "}
                <Button
                  className="w-full mt-15"
                  variant="contained"
                  sx={{ px: "2rem", py: "1rem", bgcolor: "green" }}
                  onClick={handleSkipPayment}
                >
                  Skip Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
