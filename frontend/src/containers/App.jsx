import { Route, Routes } from "react-router-dom";
import AdminRouter from "../admin/routers/AdminRouter";
import CustomerRouter from "../customer/routers/CustomerRouter";

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<CustomerRouter />} />
      <Route path="/admin/*" element={<AdminRouter />} />
    </Routes>
  );
};

export default App;
