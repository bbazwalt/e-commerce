import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyItemsText from "../../../shared/components/infoText/EmptyItemsText";
import LoadingText from "../../../shared/components/infoText/LoadingText";
import {
  cancelOrder,
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getOrders,
  pendingOrder,
  placeOrder,
  shipOrder,
} from "../../../store/order/admin/action";

const getOrderStatusColor = (orderStatus) => {
  return orderStatus === "PENDING"
    ? "bg-yellow-600"
    : orderStatus === "PLACED"
      ? "bg-gray-600"
      : orderStatus === "CANCELLED"
        ? "bg-red-600"
        : orderStatus === "CONFIRMED"
          ? "bg-blue-600"
          : orderStatus === "SHIPPED"
            ? "bg-purple-600"
            : "bg-green-500";
};

const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = useState([]);
  const dispatch = useDispatch();
  const orders = useSelector((store) => store.adminOrder.orders);
  const isLoading = useSelector((store) => store.adminOrder.isLoading);

  const handleClick = (event, index) => {
    const newAnchorE1Array = [...anchorEl];
    newAnchorE1Array[index] = event.currentTarget;
    setAnchorEl(newAnchorE1Array);
  };
  const handleClose = (index) => {
    const newAnchorE1Array = [...anchorEl];
    newAnchorE1Array[index] = null;
    setAnchorEl(newAnchorE1Array);
  };

  const handlePendingClick = (orderId, index) => {
    dispatch(pendingOrder(orderId));
    handleClose(index);
  };

  const handlePlacedClick = (orderId, index) => {
    dispatch(placeOrder(orderId));
    handleClose(index);
  };

  const handleConfirmedClick = (orderId, index) => {
    dispatch(confirmOrder(orderId));
    handleClose(index);
  };

  const handleCancelledClick = (orderId, index) => {
    dispatch(cancelOrder(orderId));
    handleClose(index);
  };
  const handleShippedClick = (orderId, index) => {
    dispatch(shipOrder(orderId));
    handleClose(index);
  };

  const handleDeliveredClick = (orderId, index) => {
    dispatch(deliverOrder(orderId));
    handleClose(index);
  };

  const handleDeleteClick = (orderId) => {
    dispatch(deleteOrder(orderId));
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  return isLoading && !orders ? (
    <LoadingText />
  ) : (
    <div className="p-10 pt-0">
      <h1 className="my-2 text-center text-3xl font-normal">All Orders</h1>
      <Card className=" bg-[#1b1b1b]">
        {orders?.length===0 ? (
          <EmptyItemsText />
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Image</TableCell>{" "}
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Total Price</TableCell>
                  <TableCell align="left">Total Discounted Price</TableCell>
                  <TableCell align="left">Total Items</TableCell>
                  <TableCell align="left">Current Status</TableCell>
                  <TableCell align="left">Update Status</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((item, index) => {
                  return (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="left">
                        <AvatarGroup max={2} sx={{ justifyContent: "start" }}>
                          {item.orderItems?.map((orderItem) => (
                            <Avatar
                              key={orderItem?.product?.id}
                              src={orderItem.product?.image}
                            ></Avatar>
                          ))}
                        </AvatarGroup>
                      </TableCell>{" "}
                      <TableCell align="left">{item.id}</TableCell>
                      <TableCell align="left">
                        {item.orderItems.map((orderItem) => (
                          <p>{orderItem.product.title}</p>
                        ))}
                      </TableCell>
                      <TableCell align="left">₹{item.totalPrice}</TableCell>
                      <TableCell align="left">
                        ₹{item.totalDiscountedPrice}
                      </TableCell>
                      <TableCell align="left">{item.totalItems}</TableCell>
                      <TableCell align="left">
                        <span
                          className={`rounded-full px-5 py-2 text-white ${getOrderStatusColor(item.orderStatus)}`}
                        >
                          {item.orderStatus}
                        </span>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          id={`basic-button-${item.id}`}
                          aria-controls={`basic-menu-${item.id}`}
                          aria-haspopup="true"
                          aria-expanded={Boolean(anchorEl[index])}
                          onClick={(event) => handleClick(event, index)}
                        >
                          STATUS
                        </Button>
                        <Menu
                          id={`basic-menu-${item.id}`}
                          anchorEl={anchorEl[index]}
                          open={Boolean(anchorEl[index])}
                          onClose={() => handleClose(index)}
                          MenuListProps={{
                            "aria-labelledby": `basic-button-${item.id}`,
                          }}
                        >
                          <MenuItem
                            onClick={() => handlePendingClick(item.id, index)}
                          >
                            PENDING
                          </MenuItem>
                          <MenuItem
                            onClick={() => handlePlacedClick(item.id, index)}
                          >
                            PLACED
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleConfirmedClick(item.id, index)}
                          >
                            CONFIRMED
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleCancelledClick(item.id, index)}
                          >
                            CANCELLED
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleShippedClick(item.id, index)}
                          >
                            SHIPPED
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleDeliveredClick(item.id, index)}
                          >
                            DELIVERED
                          </MenuItem>
                        </Menu>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          onClick={() => handleDeleteClick(item.id)}
                          variant="outlined"
                          color="error"
                        >
                          DELETE
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>
    </div>
  );
};

export default OrdersTable;
