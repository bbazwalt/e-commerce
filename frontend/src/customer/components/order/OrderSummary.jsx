import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  bypassPayment,
  createPayment,
  findOrderById,
} from "../../../redux/order/customer/action";
import CartItem from "../cart/CartItem";
import PriceDetails from "../cart/PriceDetails";
import AddressCard from "./AddressCard";

const OrderSummary = () => {
  const order = useSelector((store) => store.order.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    dispatch(findOrderById(orderId));
  }, [orderId]);

  const handleCheckout = () => {
    dispatch(createPayment(orderId));
  };

  const handleBypassPayment = () => {
    dispatch(bypassPayment(orderId, navigate));
  };

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
