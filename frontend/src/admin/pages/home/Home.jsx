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
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { menu } from "../../../customer/data/home/admin/adminHomeData";
import { CLEAR_PRODUCT_ERROR } from "../../../redux/product/actionType";
import { signOut } from "../../../redux/user/action";
import { useAuth } from "../../../redux/user/authContext";
import ErrorSnackBar from "../../../shared/components/snackBar/ErrorSnackBar";
import OrdersTable from "../../components/order/OrdersTable";
import AddProductForm from "../../components/product/AddProductForm";
import ProductsTable from "../../components/product/ProductsTable";
import AddCategoryForm from "../../components/product/category/AddCategoryForm";

const Home = () => {
  const error = useSelector((store) => store.product.error);

  const { authSignOut } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(signOut(authSignOut));
    navigate("/admin");
  };

  return (
    <div className="relative mx-auto flex w-[80rem] ">
      <CssBaseline />
      <div className="fixed top-0 h-full  w-[13rem] shadow-xl ">
        <Box
          sx={{
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100% ",
          }}
        >
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
      </div>
      <div className="ml-[12rem]  w-[85%] ">
        <Routes>
          <Route path="/" element={<OrdersTable />}></Route>
          <Route path="/products" element={<ProductsTable />}></Route>
          <Route path="/products/create" element={<AddProductForm />}></Route>
          <Route
            path="/categories/create"
            element={<AddCategoryForm />}
          ></Route>
        </Routes>
      </div>
      {error && (
        <ErrorSnackBar error={error} dispatchType={CLEAR_PRODUCT_ERROR} />
      )}
    </div>
  );
};

export default Home;
