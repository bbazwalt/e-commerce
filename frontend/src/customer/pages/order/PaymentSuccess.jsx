import { Alert, AlertTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getCart } from "../../../redux/cart/action";
import {
  getOrderById,
  updatePayment,
} from "../../../redux/order/customer/action";
import { CLEAR_ORDER_ERROR } from "../../../redux/order/customer/actionType";
import ErrorSnackBar from "../../../shared/components/snackBar/ErrorSnackBar";
import { scrollToTop, toTitleCaseForSpace } from "../../../utils/utils";
import OrderDetails from "./OrderDetails";

const PaymentSuccess = () => {
  const [queryParams, setQueryParams] = useState({});
  const [paymentId, setPaymentId] = useState();

  const order = useSelector((state) => state.order.order);
  const error = useSelector((state) => state.order.error);

  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = {};
    for (const [key, value] of searchParams) {
      params[key] = value;
    }
    setQueryParams(params);
  }, [location]);

  useEffect(() => {
    scrollToTop();
    dispatch(getCart());
    const urlParam = new URLSearchParams(window.location.search);
    setPaymentId(urlParam.get("razorpay_payment_id"));
  }, []);

  useEffect(() => {
    dispatch(getOrderById(orderId, navigate));
    if (paymentId) {
      const data = { orderId, paymentId };
      dispatch(updatePayment(data));
    }
  }, [orderId, paymentId]);

  return (
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
        {paymentId && (
          <div className=" w-full rounded-lg border p-5 shadow-lg">
            <h3 className="mb-4 text-center text-3xl font-semibold">
              Payment Details
            </h3>
            <ul className="list-none">
              {Object.entries(queryParams).map(
                ([key, value]) =>
                  value && (
                    <li key={key} className="flex justify-between py-1">
                      <strong className="font-semibold capitalize">
                        {toTitleCaseForSpace(key)}:
                      </strong>
                      <span>{value}</span>
                    </li>
                  ),
              )}
            </ul>
          </div>
        )}
      </div>
      <OrderDetails order={order} activeStep={0} />
      {error && (
        <ErrorSnackBar error={error} dispatchType={CLEAR_ORDER_ERROR} />
      )}
    </div>
  );
};

export default PaymentSuccess;
