import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../store/auth/action";
import { getCart } from "../../../store/cart/action";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();

  const cart = useSelector((store) => store.cart);

  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(getUser(localStorage.getItem("jwt")));
    navigate("/checkout?step=2");
  };
  useEffect(() => {
    dispatch(getCart());
  }, [user]);

  return (
    <div>
      {cart?.cartItems?.length === 0 ? (
        <div className="text-center">
          <h1 className="text-2xl mt-[15vh] font-bold">Your cart is empty</h1>
        </div>
      ) : (
        <div>
          <div className="lg:grid grid-cols-3  relative mt-12 mx-auto max-w-[76rem]">
            <div className="col-span-2">
              {cart?.cartItems?.map((item) => (
                <CartItem isSummary={false} item={item} key={item?.id} />
              ))}
              {}
            </div>
            <div className="pl-5 sticky top-0 max-h-[20rem] mt-5 lg:mt-0 ">
              <div className="">
                <p className="uppercase font-bold opacity-60 pb-4">
                  Price Details
                </p>
                <hr />
                <div className="space-y-3 font-semibold mb-10">
                  <div className="flex justify-between pt-3 text-black">
                    <span>Price</span>
                    <span>₹{cart?.cart?.totalPrice}</span>
                  </div>
                  <div className="flex justify-between pt-3 text-black">
                    <span>Discount</span>
                    <span className="text-green-600">
                      -₹{cart?.cart?.discount}
                    </span>
                  </div>
                  <div className="flex justify-between pt-3 text-black">
                    <span>Delivery Charges</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between pt-3 text-black font-bold">
                    <span>Total Amount</span>
                    <span>₹{cart?.cart?.totalDiscountedPrice}</span>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  className="w-full mt-5"
                  variant="contained"
                  sx={{ px: "2rem", py: "1rem", bgcolor: "#1976D2" }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
};

export default Cart;
