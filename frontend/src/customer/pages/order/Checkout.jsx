import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ErrorSnackBar from "../../../shared/components/snackBar/ErrorSnackBar";
import { CLEAR_CART_ERROR } from "../../../store/cart/actionType";
import AddressForm from "../../components/order/AddressForm";
import OrderSummary from "../../components/order/OrderSummary";

const steps = ["Sign In", "Delivery Address", "Order Summary", "Payment"];

const Checkout = () => {
  const location = useLocation();

  const querySearch = new URLSearchParams(location.search);

  const error = useSelector((store) => store.order.error);

  const step = querySearch.get("step");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className=" mx-auto mt-12 max-w-[76rem]">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step - 1}>
          {steps.map((label) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div className="mt-10">
          {step == 2 ? <AddressForm /> : <OrderSummary />}
        </div>
      </Box>
      {error && <ErrorSnackBar error={error} dispatchType={CLEAR_CART_ERROR} />}{" "}
    </div>
  );
};

export default Checkout;
