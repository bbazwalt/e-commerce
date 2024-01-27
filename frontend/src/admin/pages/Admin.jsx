import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Logout from "@mui/icons-material/Logout";
import {
  Box,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { signout } from "../../store/auth/action";
import CreateProductForm from "../components/CreateProductForm";
import OrdersTable from "../components/OrdersTable";
import ProductsTable from "../components/ProductsTable";

const menu = [
  { name: "Orders", path: "/admin", icon: <FormatListBulletedIcon /> },
  { name: "Products", path: "/admin/products", icon: <CategoryIcon /> },
  {
    name: "Add Product",
    path: "/admin/products/create",
    icon: <AddIcon />,
  },
];

const Admin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signout());
    navigate("/");
  };

  const drawer = (
    <Box
      sx={{
        mt: 3,
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100% ",
      }}
    >
      <>
        <List>
          {menu.map((item) => (
            <ListItem
              key={item.name}
              disablePadding
              onClick={() => {
                navigate(item.path);
              }}
            >
              <ListItemButton>
                <ListItemIcon sx={{ pl: "1rem" }}>{item.icon}</ListItemIcon>
                <ListItemText sx={{ pl: "0.5rem" }}>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </>

      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ pb: 3, pl: "1rem" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText sx={{ pb: 3, pl: "0.5rem" }} onClick={handleSignout}>
              Sign out
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className=" relative mx-auto max-w-[80vw] flex h-[100vh]  ">
      <CssBaseline />
      <div className="w-[13%] shadow-xl h-full fixed top-0 ">{drawer} </div>
      <div className="w-[85%] h-full ml-[15%] ">
        <Routes>
          <Route
            path="/products/create"
            element={<CreateProductForm />}
          ></Route>
          <Route path="/products" element={<ProductsTable />}></Route>
          <Route path="/" element={<OrdersTable />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
