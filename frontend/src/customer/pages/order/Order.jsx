import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { findOrders } from "../../../redux/order/customer/action";
import { CLEAR_ORDER_ERROR } from "../../../redux/order/customer/actionType";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import ErrorSnackBar from "../../../shared/components/snackBar/ErrorSnackBar";
import { scrollToTop } from "../../../utils/utils";
import OrderCard from "../../components/order/OrderCard";

const orderStatus = [
  { label: "Pending", value: "PENDING" },
  { label: "Placed", value: "PLACED" },
  { label: "Confimed", value: "CONFIRMED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Shipped", value: "SHIPPED" },
  { label: "Delivered", value: "DELIVERED" },
];

const Order = () => {
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [newSelectedStatus, setNewSelectedStatus] = useState([]);

  const orders = useSelector((state) => state.order.orders);
  const isLoading = useSelector((store) => store.order.isLoading);
  const error = useSelector((store) => store.order.error);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilter = (status) => {
    const currentIndex = selectedStatus.indexOf(status);
    const newSelectedStatus = [...selectedStatus];
    if (currentIndex === -1) {
      newSelectedStatus.push(status);
    } else {
      newSelectedStatus.splice(currentIndex, 1);
    }
    setSelectedStatus(newSelectedStatus);
    const searchParams = new URLSearchParams();
    if (newSelectedStatus.length > 0) {
      searchParams.set("status", newSelectedStatus.join(","));
    }
    navigate({ search: searchParams.toString() });
    setNewSelectedStatus(newSelectedStatus);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    dispatch(findOrders(newSelectedStatus));
  }, [newSelectedStatus]);

  window.addEventListener("load", () => {
    if (window.location.search) {
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, "", window.location.pathname);
    }
  });

  return (
    <div className="mx-auto mt-10 max-w-[76rem]">
      <Grid container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2.5}>
          <div className="sticky top-5 h-auto bg-white p-5 shadow-lg">
            <h1 className="text-lg font-bold">Filter</h1>
            <div className="mt-6 space-y-4">
              <h1 className="font-semibold">Order Status</h1>
              {orderStatus.map((option) => (
                <div className="flex items-center" key={option.value}>
                  <input
                    onChange={() => handleFilter(option.value)}
                    type="checkbox"
                    id={option.value}
                    className="h-4 w-4 cursor-pointer border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedStatus.includes(option.value)}
                  />
                  <label
                    className="ml-3 cursor-pointer text-sm text-gray-600"
                    htmlFor={option.value}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={9}>
          {isLoading ? (
            <LoadingText />
          ) : orders.length === 0 ? (
            <div className="text-md mt-4 text-center font-semibold">
              No orders found with the selected filters.
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((item) => (
                <OrderCard item={item} />
              ))}
            </div>
          )}
        </Grid>
      </Grid>
      {error && (
        <ErrorSnackBar error={error} dispatchType={CLEAR_ORDER_ERROR} />
      )}
    </div>
  );
};

export default Order;
