import { configureStore } from "@reduxjs/toolkit";
import { adminOrderReducer } from "./admin/order/reducer";
import { authReducer } from "./auth/reducer";
import { cartReducer } from "./cart/reducer";
import { orderReducer } from "./order/reducer";
import { customerProductReducer } from "./product/reducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: customerProductReducer,
    cart: cartReducer,
    order: orderReducer,
    adminOrder: adminOrderReducer,
  },
});

export { store };
