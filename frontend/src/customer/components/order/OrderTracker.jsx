import { Step, StepLabel, Stepper } from "@mui/material";

const steps = ["Placed", "Confirmed", "Shipped", "Delivered"];

const OrderTracker = ({ activeStep }) => {
  return (
    <div className="w-full">
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default OrderTracker;
