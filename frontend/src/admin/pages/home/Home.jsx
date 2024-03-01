import ArrowBackIcon from "@mui/icons-material/ArrowBack";
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

import AddIcon from "@mui/icons-material/Add";
import CategoryIcon from "@mui/icons-material/Category";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { signOut } from "../../../store/auth/action";
import { useAuth } from "../../../store/auth/authContext";
import OrdersTable from "../../components/order/OrdersTable";
import AddProductForm from "../../components/product/AddProductForm";
import ProductsTable from "../../components/product/ProductsTable";

const menu = [
  { name: "Orders", path: "/admin", icon: <FormatListBulletedIcon /> },
  { name: "Products", path: "/admin/products", icon: <CategoryIcon /> },
  {
    name: "Add Product",
    path: "/admin/products/create",
    icon: <AddIcon />,
  },
];

const Home = () => {
  const { authSignOut } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signOut(authSignOut));
    navigate("/admin");
  };

  const drawer = (
    <Box
      sx={{
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
        <ListItem disablePadding onClick={() => navigate("/")}>
          <ListItemButton>
            <ListItemIcon sx={{ pl: "1rem" }}>
              <ArrowBackIcon />
            </ListItemIcon>
            <ListItemText sx={{ pl: "0.5rem" }}>
              Switch to Customer Page
            </ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={handleSignout}>
          <ListItemButton>
            <ListItemIcon sx={{ pl: "1rem" }}>
              <Logout />
            </ListItemIcon>
            <ListItemText sx={{ pl: "0.5rem" }}>Sign Out</ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
  return (
    <div className="relative mx-auto flex w-[80rem] ">
      <CssBaseline />
      <div className="fixed top-0 h-full  w-[13rem] shadow-xl ">{drawer} </div>
      <div className="ml-[12rem]  w-[85%] ">
        <Routes>
          <Route path="/products/create" element={<AddProductForm />}></Route>
          <Route path="/products" element={<ProductsTable />}></Route>
          <Route path="/" element={<OrdersTable />}></Route>
        </Routes>
      </div>
    </div>
  );
};

export default Home;
