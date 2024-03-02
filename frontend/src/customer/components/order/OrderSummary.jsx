import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { bypassPayment, createPayment, getOrderById } from "../../../redux/order/customer/action";
import AddressCard from "./AddressCard";
import CartItem from "../cart/CartItem";
import PriceDetails from "../cart/PriceDetails";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const order = useSelector((store) => store.order.order);
  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();

  const handleCheckout = () => {
    dispatch(createPayment(orderId));
  };

  const handleBypassPayment = () => {
    dispatch(bypassPayment(orderId, navigate));
  };

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);

  return (
    <div>
      <div className="rounded-s-md border p-5 shadow-lg">
        <AddressCard item={order?.address} />
      </div>
      <div className="-mt-5">
        <div className="px-18 relative mt-12 grid grid-cols-3">
          <div className="col-span-2">
            {order?.orderItems?.map((item) => (
              <CartItem isSummary={true} item={item} key={item?.id} />
            ))}
          </div>
          <div className="sticky top-0 mt-0 h-[24.5rem] pl-5">
            <PriceDetails
              item={order}
              handleCheckout={handleCheckout}
              isSummary={true}
              handleBypassPayment={handleBypassPayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
