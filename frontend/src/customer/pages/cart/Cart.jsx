import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart } from "../../../redux/cart/action";
import { currentUser } from "../../../redux/user/action";
import CartItem from "../../components/cart/CartItem";
import PriceDetails from "../../components/cart/PriceDetails";

const Cart = () => {
  const user = useSelector((store) => store.user.user);
  const cart = useSelector((store) => store.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, [user]);

  const handleCheckout = () => {
    dispatch(currentUser());
    navigate("/checkout?step=2");
  };

  return cart?.cartItems?.length === 0 ? (
    <h1 className="mt-[15vh] text-center text-2xl font-bold">
      Your cart is empty.
    </h1>
  ) : (
    <div className="relative mx-auto  mt-12 grid max-w-[76rem] grid-cols-3">
      <div className="col-span-2 space-y-3">
        {cart?.cartItems?.map((item) => (
          <CartItem isSummary={false} item={item} key={item?.id} />
        ))}
      </div>
      <div className="sticky top-0 h-[19.4rem] pl-5 ">
        <PriceDetails item={cart.cart} handleCheckout={handleCheckout} />
      </div>
    </div>
  );
};

export default Cart;
