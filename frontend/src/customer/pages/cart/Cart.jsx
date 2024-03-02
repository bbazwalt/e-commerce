import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentUser } from "../../../redux/auth/action";
import { getCart } from "../../../redux/cart/action";
import PriceDetails from "../../components/cart/PriceDetails";
import CartItem from "../../components/cart/CartItem";

const Cart = () => {
  const navigate = useNavigate();

  const cart = useSelector((store) => store.cart);

  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(currentUser());
    navigate("/checkout?step=2");
  };
  useEffect(() => {
    dispatch(getCart());
  }, [user]);

  return (
    <div>
      {cart?.cartItems?.length === 0 ? (
        <div className="text-center">
          <h1 className="mt-[15vh] text-2xl font-bold">Your cart is empty.</h1>
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default Cart;
