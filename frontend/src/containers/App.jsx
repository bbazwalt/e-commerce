import { Route, Routes } from "react-router-dom";
import AdminRouter from "../admin/routers/AdminRouter";
import CustomerRouter from "../customer/routers/CustomerRouter";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<CustomerRouter />} />
        <Route path="/admin/*" element={<AdminRouter />} />
      </Routes>
    </div>
  );
};

export default App;
