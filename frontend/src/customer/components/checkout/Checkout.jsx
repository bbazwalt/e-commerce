import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";

const steps = ["Login", "Delivery Address", "Order Summary", "Payment"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const location = useLocation();

  const querySearch = new URLSearchParams(location.search);

  const step = querySearch.get("step");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className=" mt-12 mx-auto max-w-[76rem]">
      <Box sx={{ width: "100%" }}>
        <Stepper activeStep={step}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="mt-10">
              {step == 2 ? <DeliveryAddressForm /> : <OrderSummary />}
            </div>
          </React.Fragment>
        )}
      </Box>
    </div>
  );
};

export default Checkout;
