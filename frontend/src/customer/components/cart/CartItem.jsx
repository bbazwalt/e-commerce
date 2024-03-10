import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteCartItem, updateCartItem } from "../../../redux/cart/action";

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
    dispatch(deleteCartItem(item.id));
  };

  return (
    <div className="rounded-md border p-5 shadow-lg">
      <div className="flex items-center">
        <div className="h-[9rem] w-[9rem]">
          <img
            className="h-full w-full object-cover object-top"
            src={item?.product?.image}
            alt={item?.product?.title}
          />
        </div>
        <div className="ml-5 space-y-3">
          <p className="font-bold opacity-60">{item?.product?.brand}</p>
          <p className="font-semibold">{item?.product?.title}</p>
          <p>
            Color:
            <span className="text-gray-500">
              {" " + item?.product?.color + " | "}
            </span>
            Storage:
            <span className="text-gray-500">
              {" " + item?.product?.storage + " | "}
            </span>
            Memory:
            <span className="text-gray-500">{" " + item?.product?.memory}</span>
          </p>
          <div className="flex items-center space-x-2 text-gray-900 ">
            <p className="font-semibold">₹{item?.discountedPrice}</p>
            <p className="line-through opacity-50">₹{item?.price}</p>
            <p className="font-semibold text-green-600">
              {item?.product?.discountPercent}% off
            </p>
          </div>
        </div>
      </div>
      <div className="lg-space-x-10 flex items-center pt-4 ">
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
            <div className="ml-10 rounded-sm border px-5 py-1 text-center text-xl">
              {item?.quantity}
            </div>
          )}
          {!isSummary && (
            <span className="rounded-sm border px-5 py-1 text-center">
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
              REMOVE
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartItem;
