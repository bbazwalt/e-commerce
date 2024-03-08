import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../redux/order/customer/action";
import { CLEAR_ORDER_ERROR } from "../../../redux/order/customer/actionType";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import ErrorSnackBar from "../../../shared/components/snackBar/ErrorSnackBar";
import { scrollToTop } from "../../../utils/utils";
import CartItem from "../../components/cart/CartItem";
import AddressCard from "../../components/order/AddressCard";
import OrderTracker from "../../components/order/OrderTracker";

const statuses = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];

const OrderDetails = ({ order, activeStep }) => {
  const orderById = useSelector((state) => state.order.order);
  const isLoading = useSelector((store) => store.order.isLoading);
  const error = useSelector((store) => store.order.error);

  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    dispatch(getOrderById(params.orderId));
  }, [params.orderId]);

  return (
    <div className="mx-auto mt-10 max-w-[76rem]">
      {isLoading && !orderById ? (
        <LoadingText />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <OrderTracker
            activeStep={activeStep || statuses.indexOf(orderById?.orderStatus)}
          />
          <div className="mt-10 w-full rounded-s-md border p-5 shadow-lg">
            <AddressCard
              isOrder={true}
              item={(order || orderById)?.address}
              orderItem={orderById}
            />
          </div>
          <div className="flex w-full flex-col space-y-5 py-2 pt-5">
            {(order?.orderItems || orderById?.orderItems)?.map((item) => (
              <CartItem isSummary={true} item={item} order={order} />
            ))}
          </div>
        </div>
      )}
      {error && (
        <ErrorSnackBar error={error} dispatchType={CLEAR_ORDER_ERROR} />
      )}
    </div>
  );
};

export default OrderDetails;
