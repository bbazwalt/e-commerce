import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../store/cart/action";

const CartItem = ({ item, isSummary }) => {
  const dispatch = useDispatch();
  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item?.quantity + num },
      cartItemId: item?.id,
    };
    dispatch(updateCartItem(data));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item.id));
  };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={item?.product?.imageUrl}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item?.product?.title}</p>
          <p className="opacity-70">
            Color: {item?.product?.color} | Storage: {item?.product?.storage} |
            Memory: {item?.product?.memory}
          </p>
          <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p>

          <div className="flex space-x-5 items-center text-gray-900 pt-6 ">
            <p className="font-semibold">₹{item?.discountedPrice}</p>
            <p className="opacity-50 line-through">₹{item?.price}</p>
            <p className="text-green-600 font-semibold">
              {item?.product?.discountPercent}% off
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex items-center lg-space-x-10 pt-4 ">
        <div className="flex items-center space-x-2 ">
          {!isSummary && (
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={item?.quantity <= 1}
              sx={{ color: "#1976D2" }}
            >
              <RemoveCircleOutline />
            </IconButton>
          )}
          {isSummary && (
            <div className="py-1 px-5 text-xl ml-10 border rounded-sm text-center">
              {item?.quantity}
            </div>
          )}
          {!isSummary && (
            <span className="py-1 px-5 border rounded-sm text-center">
              {item?.quantity}
            </span>
          )}
          {!isSummary && (
            <IconButton
              onClick={() => handleUpdateCartItem(1)}
              sx={{ color: "#1976D2" }}
            >
              <AddCircleOutline />
            </IconButton>
          )}
        </div>

        {!isSummary && (
          <div>
            <Button
              onClick={handleRemoveCartItem}
              sx={{ ml: "0.5rem", color: "red" }}
            >
              remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
