import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliverOrder,
  getOrders,
  shipOrder,
} from "../../store/admin/order/action";

const OrdersTable = () => {
  const [anchorEl, setAnchorEl] = useState([]);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const adminOrder = useSelector((store) => store.adminOrder);

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

  const handleShippedClick = (orderId, index) => {
    dispatch(shipOrder(orderId));
    handleClose(index);
  };

  const handleConfirmedClick = (orderId, index) => {
    dispatch(confirmOrder(orderId));
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
  }, [
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deleted,
  ]);

  return adminOrder?.isLoading ? (
    <div className="text-2xl text-center mt-6">Please wait. Loading...</div>
  ) : (    <div className="p-10 pt-0">
      <Card className="mt-2 bg-[#1b1b1b]">
        <CardHeader title="All Orders" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Total Price</TableCell>
                <TableCell align="left">Total Discounted Price</TableCell>
                <TableCell align="left">Total Items</TableCell>
                <TableCell align="left">Current Status</TableCell>
                <TableCell align="left">Update Status</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders?.map((item, index) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <AvatarGroup max={2} sx={{ justifyContent: "start" }}>
                        {item.orderItems?.map((orderItem) => (
                          <Avatar src={orderItem.product?.imageUrl}></Avatar>
                        ))}
                      </AvatarGroup>
                    </TableCell>
                    <TableCell align="left">
                      {item.orderItems.map((orderItem) => (
                        <p>{orderItem.product.title}</p>
                      ))}
                    </TableCell>
                    <TableCell align="left">{item.id}</TableCell>
                    <TableCell align="left">₹{item.totalPrice}</TableCell>
                    <TableCell align="left">
                      ₹{item.totalDiscountedPrice}
                    </TableCell>
                    <TableCell align="left">{item.totalItems}</TableCell>
                    <TableCell align="left">
                      <span
                        className={`text-white px-5 py-2 rounded-full 
                    ${
                      item.orderStatus === "CONFIRMED"
                        ? "bg-blue-600"
                        : item.orderStatus === "SHIPPED"
                        ? "bg-purple-600"
                        : item.orderStatus === "PLACED"
                        ? "bg-gray-600"
                        : item.orderStatus === "PENDING"
                        ? "bg-yellow-600"
                        : item.orderStatus === "CANCELLED"
                        ? "bg-red-600"
                        : "bg-green-500"
                    }`}
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
                        Status
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
                          onClick={() => handleConfirmedClick(item.id, index)}
                        >
                          CONFIRMED
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
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;
