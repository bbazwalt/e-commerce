import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import { getOrderById } from "../../../redux/order/customer/action";
import CartItem from "../../components/cart/CartItem";
import OrderTracker from "../../components/order/OrderTracker";
import AddressCard from "../../components/order/AddressCard";

const statusArr = ["PLACED", "CONFIRMED", "SHIPPED", "DELIVERED"];

const OrderDetails = ({ order, activeStep }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const isLoading = useSelector((store) => store.order.isLoading);
  const orderById = useSelector((state) => state.order.order);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
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
            activeStep={activeStep || statusArr.indexOf(orderById?.orderStatus)}
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
    </div>
  );
};

export default OrderDetails;
