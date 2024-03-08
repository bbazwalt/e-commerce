import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/reducer";
import { adminOrderReducer } from "./order/admin/reducer";
import { orderReducer } from "./order/customer/reducer";
import { productReducer } from "./product/reducer";
import { userReducer } from "./user/reducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
  },
});

export { store };
