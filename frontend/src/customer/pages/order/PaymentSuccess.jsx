import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCart } from "../../../store/cart/action";
import OrderDetails from "./OrderDetails";
import { getOrderById, updatePayment } from "../../../store/order/customer/action";

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
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
      <div className="flex flex-col items-center justify-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ my: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Your order has been placed successfully.
        </Alert>
      </div>
      <OrderDetails order={order} activeStep={0} />
    </div>
  ) : (
    navigate("/")
  );
};

export default PaymentSuccess;
