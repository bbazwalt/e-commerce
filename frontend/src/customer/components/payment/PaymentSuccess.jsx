import { Alert, AlertTitle, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCart } from "../../../store/cart/action";
import { getOrderById } from "../../../store/order/action";
import { updatePayment } from "../../../store/payment/action";
import AddressCard from "../address/AddressCard";
import OrderTracker from "../order/OrderTracker";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const { orderId } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const order = useSelector((state) => state.order.order);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    setPaymentId(urlParam.get("razorpay_payment_id"));
    setPaymentStatus(urlParam.get("razorpay_payment_link_status"));
    dispatch(getCart());
  }, []);

  useEffect(() => {
    if (paymentId) {
      const data = { orderId, paymentId };
      dispatch(getOrderById(orderId));
      dispatch(updatePayment(data));
    }
  }, [orderId, paymentId]);

  return order ? (
    <div className="mx-auto max-w-[76rem]">
      <div className="flex flex-col justify-center items-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ my: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Your order has been placed successfully.
        </Alert>
      </div>
      <OrderTracker activeStep={0} />

      <Grid container className="space-y-5 py-5 pt-20">
        {order?.orderItems?.map((item) => (
          <Grid
            container
            item
            className="shadow-xl rounded-md p-5"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Grid item xs={6}>
              <div className="fex items-center">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={item.product.imageUrl}
                  alt=""
                />
                <div>
                  <p>{item.product.title}</p>
                  <div className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: {item.product.color}</span>
                    <span>Storage: {item.product.storage}</span>
                    <span> Memory: {item.product.memory} </span>
                    <span> Quantity: {item.quantity} </span>
                  </div>
                  <p>Seller: {item.product.brand}</p>
                  <p>₹ {item.price}</p>
                </div>
              </div>
            </Grid>
            <Grid item>
              <AddressCard item={order.address} />
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  ) : (
    navigate("/")
  );
};

export default PaymentSuccess;
