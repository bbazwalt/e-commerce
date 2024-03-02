import { configureStore } from "@reduxjs/toolkit";
import { adminOrderReducer } from "./order/admin/reducer";
import { authReducer } from "./auth/reducer";
import { cartReducer } from "./cart/reducer";
import { orderReducer } from "./order/customer/reducer";
import { productReducer } from "./product/reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
  },
});

export { store };
